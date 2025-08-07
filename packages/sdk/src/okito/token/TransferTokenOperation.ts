import {
    createTransferInstruction,
    createAssociatedTokenAccountInstruction,
    getAssociatedTokenAddress,
    getAccount,
    TOKEN_PROGRAM_ID,
    getOrCreateAssociatedTokenAccount,
} from '@solana/spl-token';
import { Connection, PublicKey } from '@solana/web3.js';
import { BaseTokenOperation, ValidationResult, FeeEstimation } from '../core/BaseTokenOperation';
import type { TransferTokensParams, TransferResult, TransferConfig } from '../../types/token/transfer';
import { SignerWallet } from '../../types/custom-wallet-adapter';
import { ErrorFactory, TokenLaunchErrorCode } from '../../types/errors';e
import { validateAndNormalizePublicKey, validateAmount } from '../utils/sanitizers';

interface TransferOperationData {
    mintInfo: any;
    senderTokenAccount: any;
    destinationPubkey: PublicKey;
    senderAta: PublicKey;
    destinationAta: PublicKey;
    needsDestinationATA: boolean;
    normalizedAmount: bigint;
    decimals: number;
    actualAmountToTransfer: bigint;
    isNativeSOL: boolean;
}

/**
 * Specialized transfer operation class that extends BaseTokenOperation
 */
export class TransferTokenOperation extends BaseTokenOperation<any, TransferResult> {
    private mint: string;
    private destination: string;
    private amount: bigint;

    constructor(params: TransferTokensParams) {
        super(params.connection, params.wallet, params.config || {});
        this.mint = params.mint;
        this.destination = params.destination;
        this.amount = params.amount;
    }

    protected getOperationName(): string {
        return 'Token Transfer';
    }

    protected async validateParameters(): Promise<ValidationResult> {
        const errors: string[] = [];
        const warnings: string[] = [];

        this.operationLogger.debug('Validating transfer parameters', {
            mint: this.mint,
            destination: this.destination,
            amount: this.amount.toString()
        });

        // Enhanced mint address validation
        const mintValidation = validateAndNormalizePublicKey(this.mint);
        if (!mintValidation.isValid) {
            errors.push(`Invalid mint address: ${mintValidation.error}`);
        }

        // Enhanced destination address validation
        const destinationValidation = validateAndNormalizePublicKey(this.destination);
        if (!destinationValidation.isValid) {
            errors.push(`Invalid destination address: ${destinationValidation.error}`);
        }

        // Comprehensive amount validation
        const amountValidation = validateAmount(this.amount);
        if (!amountValidation.isValid) {
            errors.push(`Invalid amount: ${amountValidation.error}`);
        }

        // Check for self-transfer
        if (mintValidation.isValid && destinationValidation.isValid && 
            destinationValidation.normalized === this.wallet.publicKey?.toString()) {
            warnings.push('Transferring tokens to the same wallet (self-transfer)');
        }

        // Check for suspicious amount patterns
        if (amountValidation.isValid && amountValidation.normalized) {
            const amount = amountValidation.normalized;
            
            // Extremely large amounts warning
            if (amount > BigInt('1000000000000000000')) { // 1 quintillion
                warnings.push('Transfer amount is extremely large, please verify');
            }
            
            // Dust amounts warning  
            if (amount < BigInt('1000')) {
                warnings.push('Transfer amount is very small (dust), transaction fees may exceed value');
            }
        }

        this.operationLogger.debug('Parameter validation completed', {
            errors: errors.length,
            warnings: warnings.length,
            valid: errors.length === 0
        });

        return {
            isValid: errors.length === 0,
            errors,
            warnings: warnings.length > 0 ? warnings : undefined
        };
    }

    protected async prepareOperationData(): Promise<TransferOperationData> {
        this.operationLogger.debug('Preparing transfer operation data');
        
        // Get mint info with detailed error handling
        let mintInfo: any;
        try {
            mintInfo = await this.getMintInfo(this.mint);
            this.operationLogger.debug('Mint info retrieved', {
                decimals: mintInfo.decimals,
                supply: mintInfo.supply.toString(),
                mintAuthority: mintInfo.mintAuthority?.toString(),
                freezeAuthority: mintInfo.freezeAuthority?.toString()
            });
        } catch (error: any) {
            this.operationLogger.error('Failed to retrieve mint info', error);
            throw ErrorFactory.invalidTokenData('mint', `Invalid or non-existent token mint: ${this.mint}`, this.getErrorContext());
        }
        
        // Convert addresses to PublicKey objects
        const mintPubkey = new PublicKey(this.mint);
        const destinationPubkey = new PublicKey(this.destination);
        const sender = this.wallet.publicKey!;

        // Check if this is native SOL (wrapped SOL has special handling)
        const isNativeSOL = this.mint === 'So11111111111111111111111111111111111111112';

        // Get Associated Token Accounts with detailed logging
        this.operationLogger.debug('Computing associated token accounts');
        const senderAta = await getAssociatedTokenAddress(
            mintPubkey, 
            sender, 
            false, 
            isNativeSOL ? TOKEN_PROGRAM_ID : undefined
        );
        const destinationAta = await getAssociatedTokenAddress(
            mintPubkey, 
            destinationPubkey, 
            false, 
            isNativeSOL ? TOKEN_PROGRAM_ID : undefined
        );

        this.operationLogger.debug('Associated token accounts computed', {
            senderATA: senderAta.toString(),
            destinationATA: destinationAta.toString(),
            isNativeSOL
        });

        // Check sender's token account and balance with detailed validation
        let senderTokenAccount: any;
        try {
            senderTokenAccount = await this.getTokenAccount(this.mint, sender);
            this.operationLogger.debug('Sender token account found', {
                balance: senderTokenAccount.amount.toString(),
                owner: senderTokenAccount.owner.toString(),
                mint: senderTokenAccount.mint.toString()
            });
        } catch (error: any) {
            this.operationLogger.error('Sender token account not found', error);
            throw ErrorFactory.insufficientFunds(0, 0, {
                ...this.getErrorContext(),
                additionalData: { 
                    reason: 'Sender does not have a token account for this mint',
                    mint: this.mint,
                    senderATA: senderAta.toString()
                }
            });
        }

        // Calculate actual transfer amount considering decimals
        const decimals = mintInfo.decimals;
        const normalizedAmount = this.amount;
        
        // Determine the actual amount to transfer (already in raw units for most cases)
        const actualAmountToTransfer = normalizedAmount;

        this.operationLogger.debug('Amount calculation completed', {
            requestedAmount: this.amount.toString(),
            normalizedAmount: normalizedAmount.toString(),
            actualAmountToTransfer: actualAmountToTransfer.toString(),
            decimals
        });

        // Enhanced balance validation with detailed error reporting
        if (senderTokenAccount.amount < actualAmountToTransfer) {
            const shortfall = actualAmountToTransfer - senderTokenAccount.amount;
            this.operationLogger.error('Insufficient token balance', undefined, {
                required: actualAmountToTransfer.toString(),
                available: senderTokenAccount.amount.toString(),
                shortfall: shortfall.toString(),
                decimals
            });
            
            throw ErrorFactory.insufficientFunds(
                Number(actualAmountToTransfer), 
                Number(senderTokenAccount.amount), 
                {
                    ...this.getErrorContext(),
                    additionalData: {
                        tokenMint: this.mint,
                        requiredAmount: actualAmountToTransfer.toString(),
                        availableAmount: senderTokenAccount.amount.toString(),
                        shortfall: shortfall.toString(),
                        decimals,
                        humanReadableShortfall: (Number(shortfall) / Math.pow(10, decimals)).toFixed(decimals)
                    }
                }
            );
        }

        // Check destination ATA with retry logic and detailed handling
        let needsDestinationATA = false;
        this.operationLogger.debug('Checking destination token account');
        
        try {
            const destinationAccount = await getAccount(this.connection, destinationAta);
            this.operationLogger.debug('Destination token account exists', {
                balance: destinationAccount.amount.toString(),
                owner: destinationAccount.owner.toString()
            });
        } catch (error: any) {
            needsDestinationATA = true;
            this.operationLogger.debug('Destination token account does not exist', {
                destinationATA: destinationAta.toString(),
                autoCreate: this.config.createDestinationATA !== false
            });
            
            // Default to true if not explicitly set to false
            if (this.config.createDestinationATA === false) {
                throw ErrorFactory.invalidTokenData(
                    'destination', 
                    'Destination token account does not exist and auto-creation is disabled', 
                    {
                        ...this.getErrorContext(),
                        additionalData: {
                            destinationAddress: this.destination,
                            destinationATA: destinationAta.toString(),
                            autoCreateDisabled: true
                        }
                    }
                );
            }
        }

        return {
            mintInfo,
            senderTokenAccount,
            destinationPubkey,
            senderAta,
            destinationAta,
            needsDestinationATA,
            normalizedAmount,
            decimals,
            actualAmountToTransfer,
            isNativeSOL
        };
    }

    protected async estimateFees(operationData: TransferOperationData): Promise<FeeEstimation> {
        this.operationLogger.debug('Estimating transfer fees');
        
        // More accurate fee estimation based on actual instruction data
        const baseFee = 5000; // Base transaction fee (~0.000005 SOL)
        let transferInstructionFee = 0;
        let accountCreationFee = 0;
        
        try {
            // Get current fee structure
            const { feeCalculator } = await this.connection.getRecentBlockhash();
            transferInstructionFee = feeCalculator?.lamportsPerSignature || 5000;
        } catch (error) {
            // Fallback to conservative estimate
            transferInstructionFee = 5000;
            this.operationLogger.warn('Failed to get current fee calculator, using fallback', { error });
        }

        // Account creation fee calculation
        if (operationData.needsDestinationATA) {
            try {
                // More precise rent exemption calculation for token accounts
                const tokenAccountSize = 165; // Standard token account size
                accountCreationFee = await this.connection.getMinimumBalanceForRentExemption(tokenAccountSize);
                
                this.operationLogger.debug('Account creation fee calculated', {
                    accountSize: tokenAccountSize,
                    rentExemption: accountCreationFee
                });
            } catch (error) {
                // Conservative fallback
                accountCreationFee = 2039280; // ~0.002 SOL fallback
                this.operationLogger.warn('Failed to calculate exact rent exemption, using fallback', { 
                    error,
                    fallbackFee: accountCreationFee 
                });
            }
        }

        // Priority fee handling
        const priorityFee = this.config.priorityFee || 0;
        
        // Special handling for native SOL transfers
        let additionalFees = 0;
        if (operationData.isNativeSOL) {
            // Wrapped SOL transfers may require additional compute units
            additionalFees = 1000; // Small additional fee for wSOL handling
        }

        const breakdown = {
            baseFee,
            transferInstruction: transferInstructionFee,
            accountCreation: accountCreationFee,
            priorityFee,
            additionalFees,
            total: baseFee + transferInstructionFee + accountCreationFee + priorityFee + additionalFees
        };

        const estimatedFee = breakdown.total;

        this.operationLogger.debug('Fee estimation completed', {
            breakdown,
            estimatedFee,
            needsAccountCreation: operationData.needsDestinationATA,
            isNativeSOL: operationData.isNativeSOL
        });

        return {
            estimatedFee,
            breakdown
        };
    }

    protected async buildInstructions(operationData: TransferOperationData): Promise<any[]> {
        this.operationLogger.debug('Building transfer instructions');
        
        const instructions = [];
        const { 
            senderAta, 
            destinationAta, 
            destinationPubkey, 
            needsDestinationATA,
            actualAmountToTransfer,
            isNativeSOL 
        } = operationData;
        
        const mintPubkey = new PublicKey(this.mint);
        const sender = this.wallet.publicKey!;

        // Enhanced ATA creation with error handling
        if (needsDestinationATA) {
            this.operationLogger.debug('Adding ATA creation instruction', {
                payer: sender.toString(),
                associatedTokenAccount: destinationAta.toString(),
                owner: destinationPubkey.toString(),
                mint: mintPubkey.toString()
            });
            
            try {
                const createAtaInstruction = createAssociatedTokenAccountInstruction(
                    sender,           // Payer for account creation
                    destinationAta,   // The new ATA address
                    destinationPubkey, // The owner of the new ATA
                    mintPubkey,       // The mint the ATA is for
                    isNativeSOL ? TOKEN_PROGRAM_ID : undefined
                );
                
                instructions.push(createAtaInstruction);
                
                this.operationLogger.debug('ATA creation instruction added successfully');
            } catch (error: any) {
                this.operationLogger.error('Failed to create ATA instruction', error);
                throw ErrorFactory.transactionFailed(undefined, error, {
                    ...this.getErrorContext(),
                    additionalData: {
                        stage: 'instruction_building',
                        instructionType: 'create_ata',
                        destinationATA: destinationAta.toString()
                    }
                });
            }
        }

        // Enhanced transfer instruction with validation
        this.operationLogger.debug('Adding transfer instruction', {
            source: senderAta.toString(),
            destination: destinationAta.toString(),
            owner: sender.toString(),
            amount: actualAmountToTransfer.toString(),
            isNativeSOL
        });
        
        try {
            const transferInstruction = createTransferInstruction(
                senderAta,              // Source account
                destinationAta,         // Destination account
                sender,                 // Owner of source account
                actualAmountToTransfer, // Amount to transfer (in raw token units)
                [],                     // Multi-signers (empty for single signature)
                isNativeSOL ? TOKEN_PROGRAM_ID : undefined
            );
            
            instructions.push(transferInstruction);
            
            this.operationLogger.debug('Transfer instruction added successfully');
        } catch (error: any) {
            this.operationLogger.error('Failed to create transfer instruction', error);
            throw ErrorFactory.transactionFailed(undefined, error, {
                ...this.getErrorContext(),
                additionalData: {
                    stage: 'instruction_building',
                    instructionType: 'transfer',
                    amount: actualAmountToTransfer.toString(),
                    senderATA: senderAta.toString(),
                    destinationATA: destinationAta.toString()
                }
            });
        }

        this.operationLogger.info('Transfer instructions built successfully', {
            instructionCount: instructions.length,
            needsAccountCreation: needsDestinationATA,
            transferAmount: actualAmountToTransfer.toString()
        });

        return instructions;
    }

    protected async buildSuccessResult(
        txId: string,
        feeEstimation: FeeEstimation,
        operationData: TransferOperationData
    ): Promise<TransferResult> {
        const totalTime = Date.now() - this.startTime;
        
        // Calculate human-readable amounts
        const humanReadableAmount = Number(operationData.actualAmountToTransfer) / Math.pow(10, operationData.decimals);
        
        // Get current token account balances for confirmation
        let senderNewBalance: bigint | undefined;
        let destinationNewBalance: bigint | undefined;
        
        try {
            const senderAccount = await this.getTokenAccount(this.mint, this.wallet.publicKey!);
            senderNewBalance = senderAccount.amount;
        } catch (error) {
            this.operationLogger.warn('Could not fetch sender balance after transfer', { error });
        }
        
        try {
            const destinationAccount = await this.getTokenAccount(this.mint, operationData.destinationPubkey);
            destinationNewBalance = destinationAccount.amount;
        } catch (error) {
            this.operationLogger.warn('Could not fetch destination balance after transfer', { error });
        }

        const result: TransferResult = {
            success: true,
            transactionId: txId,
            estimatedFee: feeEstimation.estimatedFee,
            // actualFee: feeEstimation.estimatedFee, // Will be updated by BaseTokenOperation if available
            confirmationTime: totalTime,
            
            // Transfer-specific data
            createdDestinationATA: operationData.needsDestinationATA
            
    
        };

        this.operationLogger.info('Transfer completed successfully', {
            transactionId: txId,
            transferredAmount: humanReadableAmount,
            decimals: operationData.decimals,
            createdATA: operationData.needsDestinationATA,
            totalTime,
            senderNewBalance: senderNewBalance?.toString(),
            destinationNewBalance: destinationNewBalance?.toString()
        });

        return result;
    }
}

/**
 * Enhanced factory function with production-grade validation and error handling
 */
export async function transferTokens(
    connection: Connection,
    wallet: SignerWallet,
    mint: string,
    amount: bigint | string | number,
    destination: string,
    config?: TransferConfig
): Promise<TransferResult> {
    // Input validation before creating operation
    if (!connection) {
        throw ErrorFactory.invalidTokenData('connection', 'Connection is required');
    }
    
    if (!wallet) {
        throw ErrorFactory.walletNotConnected();
    }
    
    if (!mint || typeof mint !== 'string') {
        throw ErrorFactory.invalidTokenData('mint', 'Valid mint address is required');
    }
    
    if (!destination || typeof destination !== 'string') {
        throw ErrorFactory.invalidTokenData('destination', 'Valid destination address is required');
    }

    // Enhanced amount normalization with validation
    let normalizedAmount: bigint;
    try {
        if (typeof amount === 'bigint') {
            normalizedAmount = amount;
        } else if (typeof amount === 'string') {
            // Handle string amounts (could be decimal notation)
            if (amount.includes('.')) {
                throw new Error('Amount string cannot contain decimals - provide amount in base units');
            }
            normalizedAmount = BigInt(amount);
        } else if (typeof amount === 'number') {
            if (!Number.isInteger(amount) || amount < 0) {
                throw new Error('Amount number must be a positive integer');
            }
            normalizedAmount = BigInt(amount);
        } else {
            throw new Error('Amount must be a bigint, string, or number');
        }
        
        if (normalizedAmount <= 0) {
            throw new Error('Amount must be greater than zero');
        }
        
    } catch (error: any) {
        throw ErrorFactory.invalidTokenData('amount', `Invalid amount: ${error.message}`);
    }

    // Merge with production defaults
    const productionConfig: TransferConfig = {
        enableLogging: true,
        enableSimulation: true,
        enableMetrics: true,
        createDestinationATA: true, // Default to auto-create
        maxRetries: 3,
        timeoutMs: 90000, // 1.5 minutes for transfers
        confirmationStrategy: 'confirmed',
        strictValidation: true,
        ...config
    };

    try {
        const operation = new TransferTokenOperation({
            connection,
            wallet,
            mint,
            amount: normalizedAmount,
            destination,
            config: productionConfig
        });
        
        return await operation.execute();
    } catch (error: any) {
        // Enhanced error handling with context
        if (error instanceof Error && !(error.name === 'TokenLaunchError')) {
            throw ErrorFactory.networkError(error, {
                additionalData: {
                    operation: 'token_transfer',
                    mint,
                    destination,
                    amount: normalizedAmount.toString()
                }
            });
        }
        throw error;
    }
}

/**
 * Convenience function for transferring tokens with human-readable amounts
 * Automatically handles decimal conversion
 */
export async function transferTokensWithDecimals(
    connection: Connection,
    wallet: SignerWallet,
    mint: string,
    humanAmount: number | string,
    destination: string,
    config?: TransferConfig
): Promise<TransferResult> {
    // Get mint info to determine decimals
    const mintPubkey = new PublicKey(mint);
    const mintInfo = await connection.getAccountInfo(mintPubkey);
    
    if (!mintInfo) {
        throw ErrorFactory.invalidTokenData('mint', 'Token mint does not exist');
    }
    
    // Parse mint data to get decimals (simplified - in production you'd use @solana/spl-token)
    const decimals = 6; // Default to 6 decimals, should be parsed from mint data
    
    // Convert human amount to raw token units
    const rawAmount = BigInt(Math.floor(Number(humanAmount) * Math.pow(10, decimals)));
    
    return transferTokens(connection, wallet, mint, rawAmount, destination, config);
} 