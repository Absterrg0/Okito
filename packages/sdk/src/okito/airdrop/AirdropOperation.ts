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
import type { AirdropConfig, AirdropResult, AirdropParams } from '../../types/airdrop-config';
import type { AirdropRecipient } from '../../types/airdrop-config/recipient';

interface RecipientData {
    address: PublicKey;
    rawAmount: bigint;
    humanAmount: number;
    ata: PublicKey;
}

interface BatchResult {
    transactionId: string;
    recipientsInBatch: number;
    accountsCreatedInBatch: number;
}

interface AirdropOperationData {
    mintInfo: any;
    senderTokenAccount: any;
    recipientData: RecipientData[];
    accountsToCreate: Array<{ recipient: PublicKey; ata: PublicKey }>;
    totalRawAmount: bigint;
    senderAta: PublicKey;
    batches: TransactionInstruction[][];
    batchMetadata: Array<{
        recipientCount: number;
        accountCreationCount: number;
        startIndex: number;
        endIndex: number;
    }>;
}

/**
 * Enhanced airdrop operation with production-ready improvements
 */
export class AirdropOperation extends BaseTokenOperation<AirdropConfig, AirdropResult> {
    private mint: string;
    private recipients: AirdropRecipient[];
    private readonly MAX_INSTRUCTIONS_PER_TX = 18; // Conservative limit for reliability
    private readonly ACCOUNT_CHECK_RETRIES = 3;
    private readonly BATCH_DELAY_MS = 100; // Delay between batches to avoid rate limits

    constructor(params: AirdropParams) {
        const airdropConfig: AirdropConfig = {
            timeoutMs: 300000, // 5 minutes for large airdrops
            enableLogging: true,
            createRecipientAccount: true,
            priorityFee: 10000, // Default priority fee
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
        return 'Token Airdrop';
    }

    /**
     * Parse amount with proper type safety and decimal handling
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
                
                // Handle decimal strings by converting to integer (assuming base units)
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
     * Enhanced validation with better limits and duplicate detection
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

        // Check reasonable limits
        if (this.recipients.length > 1000) {
            errors.push('Maximum 1000 recipients per airdrop operation');
        } else if (this.recipients.length > 100) {
            warnings.push(`Large recipient count (${this.recipients.length}). Operation will be batched across multiple transactions.`);
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

        // Check for reasonable total amount (prevent obvious mistakes)
        if (totalAmount > BigInt(Number.MAX_SAFE_INTEGER)) {
            warnings.push('Very large total amount detected. Please verify this is correct.');
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
                
                // If all retries failed, assume account doesn't exist
                this.logWarn(`Failed to check account existence for ${ata.toString()}, assuming it doesn't exist: ${error.message}`);
                return false;
            }
        }
        return false;
    }

    /**
     * Enhanced preparation with batching logic
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

            // Process recipients and calculate amounts
            const decimals = mintInfo.decimals;
            let totalRawAmount = BigInt(0);
            const recipientData: RecipientData[] = [];
            const accountsToCreate: Array<{ recipient: PublicKey; ata: PublicKey }> = [];

            this.logInfo('Processing recipients and checking accounts...');

            // Process recipients concurrently but with rate limiting
            const batchSize = 20;
            for (let i = 0; i < this.recipients.length; i += batchSize) {
                const batch = this.recipients.slice(i, i + batchSize);
                const batchPromises = batch.map(async (recipient, batchIndex) => {
                    const actualIndex = i + batchIndex;
                    const rawAmount = this.parseAmount(recipient.amount, `recipient ${actualIndex + 1}`);
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

                const batchResults = await Promise.all(batchPromises);
                
                for (const result of batchResults) {
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

                // Small delay between batches to avoid rate limiting
                if (i + batchSize < this.recipients.length) {
                    await new Promise(resolve => setTimeout(resolve, 50));
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

            // Create batched instructions
            const { batches, batchMetadata } = await this.createBatches(recipientData, accountsToCreate, senderAta, mintPubkey, sender);

            this.logInfo('Airdrop preparation complete', {
                totalRecipients: this.recipients.length,
                accountsToCreate: accountsToCreate.length,
                totalAmount: totalRawAmount.toString(),
                decimals,
                batchCount: batches.length
            });

            return {
                mintInfo,
                senderTokenAccount,
                recipientData,
                accountsToCreate,
                totalRawAmount,
                senderAta,
                batches,
                batchMetadata
            };
        } catch (error: any) {
            this.logError('Failed to prepare airdrop operation', error);
            throw error;
        }
    }

    /**
     * Create optimized batches for transaction processing
     */
    private async createBatches(
        recipientData: RecipientData[],
        accountsToCreate: Array<{ recipient: PublicKey; ata: PublicKey }>,
        senderAta: PublicKey,
        mintPubkey: PublicKey,
        sender: PublicKey
    ) {
        const batches: TransactionInstruction[][] = [];
        const batchMetadata: Array<{
            recipientCount: number;
            accountCreationCount: number;
            startIndex: number;
            endIndex: number;
        }> = [];

        let currentBatch: TransactionInstruction[] = [];
        let instructionCount = 0;
        let recipientCount = 0;
        let accountCreationCount = 0;
        let recipientIndex = 0;
        let accountCreationIndex = 0;

        // Helper to finish current batch
        const finishBatch = () => {
            if (currentBatch.length > 0) {
                batches.push([...currentBatch]);
                batchMetadata.push({
                    recipientCount,
                    accountCreationCount,
                    startIndex: recipientIndex - recipientCount,
                    endIndex: recipientIndex - 1
                });
                currentBatch = [];
                instructionCount = 0;
                recipientCount = 0;
                accountCreationCount = 0;
            }
        };

        // Add compute budget instruction to each batch
        const addComputeBudgetInstruction = () => {
            if (this.config.priorityFee && this.config.priorityFee > 0) {
                currentBatch.push(
                    ComputeBudgetProgram.setComputeUnitPrice({
                        microLamports: this.config.priorityFee
                    })
                );
                instructionCount++;
            }
        };

        // Process account creations first
        for (const { recipient, ata } of accountsToCreate) {
            // Check if we need to start a new batch
            if (instructionCount >= this.MAX_INSTRUCTIONS_PER_TX) {
                finishBatch();
            }

            // Add compute budget instruction to first batch or new batches
            if (currentBatch.length === 0) {
                addComputeBudgetInstruction();
            }

            currentBatch.push(
                createAssociatedTokenAccountInstruction(
                    sender,
                    ata,
                    recipient,
                    mintPubkey,
                    TOKEN_PROGRAM_ID,
                    ASSOCIATED_TOKEN_PROGRAM_ID
                )
            );
            instructionCount++;
            accountCreationCount++;
            accountCreationIndex++;
        }

        // Process transfers
        for (const recipientInfo of recipientData) {
            // Check if we need to start a new batch
            if (instructionCount >= this.MAX_INSTRUCTIONS_PER_TX) {
                finishBatch();
            }

            // Add compute budget instruction to first batch or new batches
            if (currentBatch.length === 0) {
                addComputeBudgetInstruction();
            }

            currentBatch.push(
                createTransferInstruction(
                    senderAta,
                    recipientInfo.ata,
                    sender,
                    recipientInfo.rawAmount
                )
            );
            instructionCount++;
            recipientCount++;
            recipientIndex++;
        }

        // Finish the last batch
        finishBatch();

        return { batches, batchMetadata };
    }

    /**
     * Enhanced fee estimation with accurate calculations
     */
    protected async estimateFees(operationData: AirdropOperationData): Promise<FeeEstimation> {
        try {
            const { batches } = operationData;
            
            // Get latest blockhash for fee calculation
            const { blockhash } = await this.connection.getLatestBlockhash();
            
            let totalTransactionFees = 0;
            
            // Calculate fees for each batch
            for (const batch of batches) {
                try {
                    const message = new TransactionMessage({
                        payerKey: this.wallet.publicKey!,
                        recentBlockhash: blockhash,
                        instructions: batch
                    }).compileToV0Message();

                    const feeResponse = await this.connection.getFeeForMessage(message);
                    totalTransactionFees += feeResponse.value || 5000; // Fallback fee
                } catch (error) {
                    // Fallback calculation if fee estimation fails
                    totalTransactionFees += 5000 * batch.length;
                }
            }

            // Account creation rent costs
            let accountCreationFees = 0;
            if (operationData.accountsToCreate.length > 0) {
                const rentExemption = await this.connection.getMinimumBalanceForRentExemption(165);
                accountCreationFees = rentExemption * operationData.accountsToCreate.length;
            }

            const breakdown = {
                transactionFees: totalTransactionFees,
                accountCreations: accountCreationFees,
                priorityFees: (this.config.priorityFee || 0) * batches.length
            };

            return {
                estimatedFee: Object.values(breakdown).reduce((a, b) => a + b, 0),
                breakdown
            };
        } catch (error) {
            this.logError('Fee estimation failed, using defaults', error);
            // Conservative fallback estimates
            const fallbackTransactionFee = 10000 * operationData.batches.length;
            const fallbackAccountCreationFee = 2039280 * operationData.accountsToCreate.length;
            
            return {
                estimatedFee: fallbackTransactionFee + fallbackAccountCreationFee,
                breakdown: {
                    transactionFees: fallbackTransactionFee,
                    accountCreations: fallbackAccountCreationFee,
                    priorityFees: 0
                }
            };
        }
    }

    /**
     * Override buildInstructions to return the first batch only (base class expects single transaction)
     */
    protected async buildInstructions(operationData: AirdropOperationData): Promise<TransactionInstruction[]> {
        // Return first batch for base class transaction handling
        return operationData.batches[0] || [];
    }

    /**
     * Override execute method to handle multiple batches
     */
    async execute(): Promise<AirdropResult> {
        try {
            this.logInfo('Starting airdrop operation');
            
            // 1. Validate wallet and connection
            await this.validateWalletAndConnection();
            
            // 2. Validate operation-specific parameters
            const validation = await this.validateParameters();
            if (!validation.isValid) {
                throw new TokenLaunchError(
                    TokenLaunchErrorCode.INVALID_TOKEN_DATA,
                    validation.errors.join(', ')
                );
            }
            
            if (this.config.enableLogging && validation.warnings?.length) {
                this.logWarn('Parameter warnings', validation.warnings);
            }
            
            // 3. Prepare operation data
            const operationData = await this.prepareOperationData();
            
            // 4. Estimate fees
            const feeEstimation = await this.estimateFees(operationData);
            this.logInfo('Fee estimation', feeEstimation);
            
            // 5. Validate balance for fees
            if (this.config.validateBalance) {
                await this.validateWalletBalance(feeEstimation.estimatedFee);
            }

            // 6. Execute batches
            const batchResults: BatchResult[] = [];
            let totalRecipientsProcessed = 0;
            let totalAccountsCreated = 0;
            
            for (let i = 0; i < operationData.batches.length; i++) {
                const batch = operationData.batches[i];
                const metadata = operationData.batchMetadata[i];
                
                this.logInfo(`Processing batch ${i + 1}/${operationData.batches.length}`, {
                    instructionCount: batch.length,
                    recipientCount: metadata.recipientCount,
                    accountCreationCount: metadata.accountCreationCount
                });

                try {
                    // Get fresh blockhash for each batch
                    const { blockhash, lastValidBlockHeight } = await this.connection.getLatestBlockhash();
                    
                    // Simulate batch if enabled
                    if (this.config.enableSimulation) {
                        await this.simulateTransaction(batch, blockhash);
                    }
                    
                    // Send batch transaction
                    const txId = await this.sendTransaction(batch, blockhash);
                    
                    // Confirm batch transaction
                    await this.confirmTransaction(txId, blockhash, lastValidBlockHeight);
                    
                    batchResults.push({
                        transactionId: txId,
                        recipientsInBatch: metadata.recipientCount,
                        accountsCreatedInBatch: metadata.accountCreationCount
                    });
                    
                    totalRecipientsProcessed += metadata.recipientCount;
                    totalAccountsCreated += metadata.accountCreationCount;
                    
                    this.logInfo(`Batch ${i + 1} completed successfully`, { txId });
                    
                    // Add delay between batches to avoid rate limits
                    if (i < operationData.batches.length - 1) {
                        await new Promise(resolve => setTimeout(resolve, this.BATCH_DELAY_MS));
                    }
                    
                } catch (error: any) {
                    this.logError(`Batch ${i + 1} failed`, error);
                    throw new TokenLaunchError(
                        TokenLaunchErrorCode.TRANSACTION_FAILED,
                        `Batch ${i + 1} failed: ${error.message}`,
                        error
                    );
                }
            }

            // Build final result
            const result: AirdropResult = {
                success: true,
                transactionId: batchResults.map(b => b.transactionId).join(','),
                estimatedFee: feeEstimation.estimatedFee,
                actualFee: feeEstimation.estimatedFee, // In practice, you'd calculate actual fees
                confirmationTime: Date.now() - this.startTime,
                recipientsProcessed: totalRecipientsProcessed,
                accountsCreated: totalAccountsCreated,
                totalAmountSent: operationData.totalRawAmount.toString()
            };

            this.logInfo('Airdrop completed successfully', {
                totalBatches: batchResults.length,
                totalRecipients: totalRecipientsProcessed,
                totalTime: Date.now() - this.startTime
            });

            return result;
            
        } catch (error: any) {
            return this.handleError(error);
        }
    }

    /**
     * Build success result (used by base class but overridden in execute)
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
 * Factory function to maintain the original API
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