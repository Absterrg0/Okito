import {
    createTransferInstruction,
    createAssociatedTokenAccountInstruction,
    getAssociatedTokenAddress,
    getAccount,
    TOKEN_PROGRAM_ID,
    ASSOCIATED_TOKEN_PROGRAM_ID,
} from '@solana/spl-token';
import { 
    Connection, 
    PublicKey, 
    TransactionMessage, 
    ComputeBudgetProgram,
    TransactionInstruction,
} from '@solana/web3.js';
import { BaseTokenOperation, ValidationResult, FeeEstimation } from '../core/BaseTokenOperation';
import { SignerWallet } from '../../types/custom-wallet-adapter';
import { TokenLaunchError, TokenLaunchErrorCode } from '../../types/errors';
import { log } from '../utils/logger';
import type { AirdropConfig, AirdropResult, AirdropParams } from '../../types/airdrop-config';
import type { AirdropRecipient } from '../../types/airdrop-config/recipient';

interface RecipientData {
    address: PublicKey;
    rawAmount: bigint;
    humanAmount: number;
    ata: PublicKey;
}

interface AirdropOperationData {
    mintInfo: any;
    senderTokenAccount: any;
    recipientData: RecipientData[];
    accountsToCreate: Array<{ recipient: PublicKey; ata: PublicKey }>;
    totalRawAmount: bigint;
    senderAta: PublicKey;
}

/**
 * Simple airdrop operation for small batches (20-30 recipients)
 * Uses single transaction approach for efficiency
 */
export class AirdropOperation extends BaseTokenOperation<AirdropConfig, AirdropResult> {
    private mint: string;
    private recipients: AirdropRecipient[];
    private readonly MAX_RECIPIENTS_SINGLE_TX = 30; // Hard limit for single transaction
    private readonly ACCOUNT_CHECK_RETRIES = 3;

    constructor(params: AirdropParams) {
        const airdropConfig: AirdropConfig = {
            timeoutMs: 120000, // 2 minutes for small airdrops
            enableLogging: true,
            createRecipientAccount: true,
            priorityFee: 10000,
            maxRetries: 3,
            confirmationStrategy: 'confirmed' as const,
            enableSimulation: true,
            validateBalance: true,
            ...params.config
        };
        super(params.connection, params.wallet, airdropConfig);
        this.mint = params.mint;
        this.recipients = params.recipients;
    }

    protected getOperationName(): string {
        return 'Token Airdrop (Single Transaction)';
    }

    /**
     * Parse amount with proper type safety
     */
    private parseAmount(amount: string | number | bigint, context: string): bigint {
        try {
            if (typeof amount === 'bigint') {
                if (amount < BigInt(0)) throw new Error('Amount cannot be negative');
                return amount;
            }
            
            if (typeof amount === 'string') {
                const trimmed = amount.trim();
                if (trimmed === '' || trimmed === '0') return BigInt(0);
                
                const parsed = parseFloat(trimmed);
                if (!Number.isFinite(parsed) || parsed < 0) {
                    throw new Error(`Invalid amount format: ${amount}`);
                }
                return BigInt(Math.floor(parsed));
            }
            
            if (typeof amount === 'number') {
                if (!Number.isFinite(amount) || amount < 0) {
                    throw new Error(`Invalid amount: ${amount}`);
                }
                return BigInt(Math.floor(amount));
            }
            
            throw new Error(`Unsupported amount type: ${typeof amount}`);
        } catch (error: any) {
            throw new Error(`Failed to parse amount for ${context}: ${error.message}`);
        }
    }

    /**
     * Validation optimized for single transaction airdrops
     */
    protected async validateParameters(): Promise<ValidationResult> {
        const errors: string[] = [];
        const warnings: string[] = [];

        // Validate mint address
        try {
            this.validatePublicKey(this.mint, 'mint');
        } catch (error: any) {
            errors.push(error.message);
        }

        // Validate recipients
        if (!this.recipients || this.recipients.length === 0) {
            errors.push('At least one recipient is required');
            return { isValid: false, errors, warnings };
        }

        // Enforce single transaction limit
        if (this.recipients.length > this.MAX_RECIPIENTS_SINGLE_TX) {
            errors.push(`Too many recipients for single transaction airdrop (${this.recipients.length}). Maximum allowed: ${this.MAX_RECIPIENTS_SINGLE_TX}. Use airdropTokensBatch() for larger distributions.`);
        }

        // Validate each recipient and check for duplicates
        const addressSet = new Set<string>();
        let totalAmount = BigInt(0);
        
        for (let i = 0; i < this.recipients.length; i++) {
            const recipient = this.recipients[i];
            const position = i + 1;

            // Validate address
            if (!recipient.address?.trim()) {
                errors.push(`Recipient ${position}: address is required`);
                continue;
            }

            try {
                this.validatePublicKey(recipient.address.trim(), `recipient ${position} address`);
                
                // Check for duplicates
                const normalizedAddress = recipient.address.trim();
                if (addressSet.has(normalizedAddress)) {
                    warnings.push(`Duplicate recipient address: ${normalizedAddress} (position ${position})`);
                } else {
                    addressSet.add(normalizedAddress);
                }
            } catch (error: any) {
                errors.push(error.message);
                continue;
            }

            // Validate amount
            try {
                const parsedAmount = this.parseAmount(recipient.amount, `recipient ${position}`);
                this.validateAmount(parsedAmount, `recipient ${position} amount`);
                totalAmount += parsedAmount;
            } catch (error: any) {
                errors.push(`Recipient ${position}: ${error.message}`);
            }
        }

        return {
            isValid: errors.length === 0,
            errors,
            warnings: warnings.length > 0 ? warnings : undefined
        };
    }

    /**
     * Check if account exists with retry logic
     */
    private async checkAccountExists(ata: PublicKey): Promise<boolean> {
        for (let i = 0; i < this.ACCOUNT_CHECK_RETRIES; i++) {
            try {
                await getAccount(this.connection, ata);
                return true;
            } catch (error: any) {
                if (error.name === 'TokenAccountNotFoundError' || 
                    error.message?.includes('could not find account')) {
                    return false;
                }
                
                // For other errors, retry with exponential backoff
                if (i < this.ACCOUNT_CHECK_RETRIES - 1) {
                    const delay = Math.min(1000 * Math.pow(2, i), 5000);
                    await new Promise(resolve => setTimeout(resolve, delay));
                    continue;
                }
                
                this.logWarn(`Failed to check account existence for ${ata.toString()}, assuming it doesn't exist: ${error.message}`);
                return false;
            }
        }
        return false;
    }

    /**
     * Simplified preparation for single transaction
     */
    protected async prepareOperationData(): Promise<AirdropOperationData> {
        try {
            // Get mint information
            const mintInfo = await this.getMintInfo(this.mint);
            const mintPubkey = new PublicKey(this.mint);
            const sender = this.wallet.publicKey!;
            const senderAta = await getAssociatedTokenAddress(mintPubkey, sender);

            // Check sender's token account and balance
            const senderTokenAccount = await this.getTokenAccount(this.mint, sender);

            // Process recipients
            const decimals = mintInfo.decimals;
            let totalRawAmount = BigInt(0);
            const recipientData: RecipientData[] = [];
            const accountsToCreate: Array<{ recipient: PublicKey; ata: PublicKey }> = [];

            this.logInfo('Processing recipients and checking accounts...');

            // Process all recipients concurrently (safe for small numbers)
            const recipientPromises = this.recipients.map(async (recipient, index) => {
                const rawAmount = this.parseAmount(recipient.amount, `recipient ${index + 1}`);
                const address = new PublicKey(recipient.address.trim());
                const ata = await getAssociatedTokenAddress(mintPubkey, address);
                
                const accountExists = await this.checkAccountExists(ata);
                
                return {
                    recipientInfo: {
                        address,
                        rawAmount,
                        humanAmount: Number(recipient.amount),
                        ata
                    },
                    needsAccountCreation: !accountExists
                };
            });

            const results = await Promise.all(recipientPromises);
            
            for (const result of results) {
                recipientData.push(result.recipientInfo);
                totalRawAmount += result.recipientInfo.rawAmount;
                
                if (result.needsAccountCreation) {
                    if (!this.config.createRecipientAccount) {
                        throw new TokenLaunchError(
                            TokenLaunchErrorCode.TOKEN_ACCOUNT_NOT_FOUND,
                            `Recipient ${result.recipientInfo.address.toString()} does not have a token account and auto-creation is disabled`
                        );
                    }
                    accountsToCreate.push({
                        recipient: result.recipientInfo.address,
                        ata: result.recipientInfo.ata
                    });
                }
            }

            // Validate sender has sufficient balance
            if (senderTokenAccount.amount < totalRawAmount) {
                const requiredHuman = Number(totalRawAmount) / Math.pow(10, decimals);
                const availableHuman = Number(senderTokenAccount.amount) / Math.pow(10, decimals);
                throw new TokenLaunchError(
                    TokenLaunchErrorCode.INSUFFICIENT_FUNDS,
                    `Insufficient token balance. Required: ${requiredHuman}, Available: ${availableHuman}`
                );
            }

            this.logInfo('Airdrop preparation complete', {
                totalRecipients: this.recipients.length,
                accountsToCreate: accountsToCreate.length,
                totalAmount: totalRawAmount.toString(),
                decimals
            });

            return {
                mintInfo,
                senderTokenAccount,
                recipientData,
                accountsToCreate,
                totalRawAmount,
                senderAta
            };
        } catch (error: any) {
            this.logError('Failed to prepare airdrop operation', error);
            throw error;
        }
    }

    /**
     * Estimate fees for single transaction
     */
    protected async estimateFees(operationData: AirdropOperationData): Promise<FeeEstimation> {
        try {
            // Build sample instructions to get accurate fee
            const instructions = await this.buildInstructions(operationData);
            const { blockhash } = await this.connection.getLatestBlockhash();
            
            const message = new TransactionMessage({
                payerKey: this.wallet.publicKey!,
                recentBlockhash: blockhash,
                instructions
            }).compileToV0Message();

            const feeResponse = await this.connection.getFeeForMessage(message);
            const transactionFee = feeResponse.value || 5000;

            // Account creation rent costs
            let accountCreationFees = 0;
            if (operationData.accountsToCreate.length > 0) {
                const rentExemption = await this.connection.getMinimumBalanceForRentExemption(165);
                accountCreationFees = rentExemption * operationData.accountsToCreate.length;
            }

            const breakdown = {
                transactionFee,
                accountCreations: accountCreationFees,
                priorityFee: this.config.priorityFee || 0
            };

            return {
                estimatedFee: Object.values(breakdown).reduce((a, b) => a + b, 0),
                breakdown
            };
        } catch (error) {
            this.logError('Fee estimation failed, using defaults', error);
            // Conservative fallback
            const fallbackTransactionFee = 10000;
            const fallbackAccountCreationFee = 2039280 * operationData.accountsToCreate.length;
            
            return {
                estimatedFee: fallbackTransactionFee + fallbackAccountCreationFee,
                breakdown: {
                    transactionFee: fallbackTransactionFee,
                    accountCreations: fallbackAccountCreationFee,
                    priorityFee: 0
                }
            };
        }
    }

    /**
     * Build all instructions for single transaction
     */
    protected async buildInstructions(operationData: AirdropOperationData): Promise<TransactionInstruction[]> {
        const instructions: TransactionInstruction[] = [];
        const { recipientData, accountsToCreate, senderAta } = operationData;
        const mintPubkey = new PublicKey(this.mint);
        const sender = this.wallet.publicKey!;

        // Add priority fee instruction
        if (this.config.priorityFee && this.config.priorityFee > 0) {
            instructions.push(
                ComputeBudgetProgram.setComputeUnitPrice({
                    microLamports: this.config.priorityFee
                })
            );
        }

        // Add account creation instructions
        for (const { recipient, ata } of accountsToCreate) {
            instructions.push(
                createAssociatedTokenAccountInstruction(
                    sender,
                    ata,
                    recipient,
                    mintPubkey,
                    TOKEN_PROGRAM_ID,
                    ASSOCIATED_TOKEN_PROGRAM_ID
                )
            );
        }

        // Add transfer instructions
        for (const recipientInfo of recipientData) {
            instructions.push(
                createTransferInstruction(
                    senderAta,
                    recipientInfo.ata,
                    sender,
                    recipientInfo.rawAmount
                )
            );
        }

        return instructions;
    }

    /**
     * Build success result
     */
    protected async buildSuccessResult(
        txId: string,
        feeEstimation: FeeEstimation,
        operationData: AirdropOperationData
    ): Promise<AirdropResult> {
        return {
            success: true,
            transactionId: txId,
            estimatedFee: feeEstimation.estimatedFee,
            actualFee: feeEstimation.estimatedFee,
            confirmationTime: Date.now() - this.startTime,
            recipientsProcessed: this.recipients.length,
            accountsCreated: operationData.accountsToCreate.length,
            totalAmountSent: operationData.totalRawAmount.toString()
        };
    }
}

/**
 * Simple airdrop function for small batches (up to 30 recipients)
 */
export async function airdropTokens(
    connection: Connection,
    wallet: SignerWallet,
    mint: string,
    recipients: AirdropRecipient[],
    config: AirdropConfig = {}
): Promise<AirdropResult> {
    
    const operation = new AirdropOperation({
        connection,
        wallet,
        mint,
        recipients,
        config
    });
    return await operation.execute();
}

