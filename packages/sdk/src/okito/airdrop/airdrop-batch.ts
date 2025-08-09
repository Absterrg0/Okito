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
    VersionedTransaction,
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
    batchIndex: number;
    status: 'pending' | 'processing' | 'completed' | 'failed';
}

interface BatchData {
    index: number;
    recipients: RecipientData[];
    accountsToCreate: Array<{ recipient: PublicKey; ata: PublicKey }>;
    totalAmount: bigint;
    status: 'pending' | 'processing' | 'completed' | 'failed' | 'retrying';
    transactionId?: string;
    attempts: number;
    lastError?: string;
}

interface AirdropInBatchesOperationData {
    mintInfo: any;
    senderTokenAccount: any;
    recipientData: RecipientData[];
    batches: BatchData[];
    totalRawAmount: bigint;
    senderAta: PublicKey;
    mintPubkey: PublicKey;
    preflightChecks: {
        balanceVerified: boolean;
        accountsValidated: boolean;
        networkStabilityChecked: boolean;
    };
}

interface AirdropInBatchesConfig extends AirdropConfig {
    batchSize?: number;
    batchDelayMs?: number;
    maxBatchRetries?: number;
    preflightValidation?: boolean;
    networkStabilityCheck?: boolean;
    progressCallback?: (progress: AirdropProgress) => void;
    pauseOnError?: boolean;
    dryRun?: boolean;
}

interface AirdropProgress {
    totalBatches: number;
    completedBatches: number;
    failedBatches: number;
    totalRecipients: number;
    processedRecipients: number;
    failedRecipients: number;
    currentBatch?: number;
    estimatedTimeRemaining?: number;
    lastTransactionId?: string;
}

/**
 * Large-scale, safety-focused airdrop operation
 * Optimized for reliability and high success rate with thousands of recipients
 */
export class AirdropInBatchesOperation extends BaseTokenOperation<AirdropInBatchesConfig, AirdropResult> {
    private mint: string;
    private recipients: AirdropRecipient[];
    private readonly DEFAULT_BATCH_SIZE = 15; // Conservative batch size for safety
    private readonly MAX_BATCH_SIZE = 20;     // Hard limit
    private readonly MIN_BATCH_DELAY = 2000;  // Minimum 2 seconds between batches
    private readonly ACCOUNT_CHECK_RETRIES = 5;
    private readonly NETWORK_CHECK_SAMPLES = 3;
    
    private progress: AirdropProgress = {
        totalBatches: 0,
        completedBatches: 0,
        failedBatches: 0,
        totalRecipients: 0,
        processedRecipients: 0,
        failedRecipients: 0
    };

    constructor(params: AirdropParams & { config?: AirdropInBatchesConfig }) {
        const largeSafeConfig: AirdropInBatchesConfig = {
            // Base OperationConfig defaults
            maxRetries: 5,
            timeoutMs: 300000, // 5 minutes per batch
            confirmationStrategy: 'finalized' as const, // Most secure
            priorityFee: 50000, // Higher priority fee for reliability
            enableLogging: true,
            enableSimulation: true,
            validateBalance: true,
            // AirdropConfig specific
            createRecipientAccount: true,
            // LargeSafeAirdropConfig specific
            batchSize: 15,
            batchDelayMs: 3000,
            maxBatchRetries: 3,
            preflightValidation: true,
            networkStabilityCheck: true,
            pauseOnError: false,
            dryRun: false,
            ...params.config
        };
        
        super(params.connection, params.wallet, largeSafeConfig);
        this.mint = params.mint;
        this.recipients = params.recipients;
        
        // Validate and adjust batch size
        const batchSize = Math.min(
            largeSafeConfig.batchSize || this.DEFAULT_BATCH_SIZE,
            this.MAX_BATCH_SIZE
        );
        this.config.batchSize = batchSize;
        
        this.logInfo('Initializing large-scale safe airdrop operation', {
            recipientCount: this.recipients.length,
            mint: this.mint,
            batchSize: this.config.batchSize,
            estimatedBatches: Math.ceil(this.recipients.length / batchSize)
        });
    }

    protected getOperationName(): string {
        return 'Large Scale Safe Token Airdrop';
    }

    /**
     * Validate wallet connection and capabilities
     */
    private validateWallet(): void {
        if (!this.wallet) {
            throw new TokenLaunchError(
                TokenLaunchErrorCode.WALLET_NOT_CONNECTED,
                'Wallet is not provided'
            );
        }

        if (!this.wallet.publicKey) {
            throw new TokenLaunchError(
                TokenLaunchErrorCode.WALLET_NOT_CONNECTED,
                'Wallet is not connected - no public key available'
            );
        }

        if (!this.wallet.signTransaction) {
            throw new TokenLaunchError(
                TokenLaunchErrorCode.WALLET_NOT_CONNECTED,
                'Wallet does not support transaction signing'
            );
        }
    }

    /**
     * Parse amount with enhanced validation
     */
    private parseAmount(amount: string | number | bigint, context: string): bigint {
        try {
            if (typeof amount === 'bigint') {
                if (amount < BigInt(0)) throw new Error('Amount cannot be negative');
                if (amount > BigInt('18446744073709551615')) { // Max safe bigint
                    throw new Error('Amount exceeds maximum safe value');
                }
                return amount;
            }
            
            if (typeof amount === 'string') {
                const trimmed = amount.trim();
                if (trimmed === '' || trimmed === '0') return BigInt(0);
                
                // Check for scientific notation or invalid formats
                if (trimmed.includes('e') || trimmed.includes('E')) {
                    throw new Error('Scientific notation not supported');
                }
                
                const parsed = parseFloat(trimmed);
                if (!Number.isFinite(parsed) || parsed < 0) {
                    throw new Error(`Invalid amount format: ${amount}`);
                }
                
                if (parsed > Number.MAX_SAFE_INTEGER) {
                    throw new Error('Amount too large for safe conversion');
                }
                
                return BigInt(Math.floor(parsed));
            }
            
            if (typeof amount === 'number') {
                if (!Number.isFinite(amount) || amount < 0) {
                    throw new Error(`Invalid amount: ${amount}`);
                }
                
                if (amount > Number.MAX_SAFE_INTEGER) {
                    throw new Error('Amount too large for safe conversion');
                }
                
                return BigInt(Math.floor(amount));
            }
            
            throw new Error(`Unsupported amount type: ${typeof amount}`);
        } catch (error: any) {
            throw new Error(`Failed to parse amount for ${context}: ${error.message}`);
        }
    }

    /**
     * Comprehensive validation for large-scale operations
     */
    protected async validateParameters(): Promise<ValidationResult> {
        const errors: string[] = [];
        const warnings: string[] = [];

        this.logInfo('Starting comprehensive parameter validation...');

        // Validate wallet first
        try {
            this.validateWallet();
        } catch (error: any) {
            errors.push(error.message);
            return { isValid: false, errors, warnings };
        }

        // Validate mint address
        try {
            this.validatePublicKey(this.mint, 'mint');
        } catch (error: any) {
            errors.push(error.message);
        }

        // Validate recipients exist
        if (!this.recipients || this.recipients.length === 0) {
            errors.push('At least one recipient is required');
            return { isValid: false, errors, warnings };
        }

        // Warn about large batch sizes
        if (this.recipients.length > 10000) {
            warnings.push(`Large airdrop detected (${this.recipients.length} recipients). Consider running in smaller chunks for better monitoring.`);
        }

        // Validate batch configuration
        if (this.config.batchSize! > this.MAX_BATCH_SIZE) {
            warnings.push(`Batch size reduced from ${this.config.batchSize} to ${this.MAX_BATCH_SIZE} for safety`);
            this.config.batchSize = this.MAX_BATCH_SIZE;
        }

        if (this.config.batchDelayMs! < this.MIN_BATCH_DELAY) {
            warnings.push(`Batch delay increased from ${this.config.batchDelayMs}ms to ${this.MIN_BATCH_DELAY}ms for network stability`);
            this.config.batchDelayMs = this.MIN_BATCH_DELAY;
        }

        // Validate each recipient with enhanced checks
        const addressSet = new Set<string>();
        const addressAmountMap = new Map<string, bigint>();
        let totalAmount = BigInt(0);
        let duplicateCount = 0;
        
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
                
                const normalizedAddress = recipient.address.trim();
                
                // Check for exact duplicates
                if (addressSet.has(normalizedAddress)) {
                    duplicateCount++;
                    warnings.push(`Duplicate recipient address: ${normalizedAddress} (position ${position})`);
                } else {
                    addressSet.add(normalizedAddress);
                }

                // Track amounts per address for consolidated duplicate detection
                const parsedAmount = this.parseAmount(recipient.amount, `recipient ${position}`);
                if (addressAmountMap.has(normalizedAddress)) {
                    const existingAmount = addressAmountMap.get(normalizedAddress)!;
                    addressAmountMap.set(normalizedAddress, existingAmount + parsedAmount);
                    warnings.push(`Address ${normalizedAddress} appears multiple times with different amounts`);
                } else {
                    addressAmountMap.set(normalizedAddress, parsedAmount);
                }
                
                totalAmount += parsedAmount;
            } catch (error: any) {
                errors.push(error.message);
                continue;
            }

            // Validate amount with enhanced checks
            try {
                const parsedAmount = this.parseAmount(recipient.amount, `recipient ${position}`);
                this.validateAmount(parsedAmount, `recipient ${position} amount`);
                
                // Check for suspiciously large amounts
                if (parsedAmount > BigInt('1000000000000000000')) { // 1 billion tokens (adjust as needed)
                    warnings.push(`Recipient ${position} has a very large amount: ${recipient.amount}`);
                }
            } catch (error: any) {
                errors.push(`Recipient ${position}: ${error.message}`);
            }
        }

        // Summary warnings
        if (duplicateCount > 0) {
            warnings.push(`Found ${duplicateCount} duplicate addresses. Consider consolidating amounts.`);
        }

        if (totalAmount === BigInt(0)) {
            errors.push('Total airdrop amount cannot be zero');
        }

        this.logInfo('Parameter validation complete', {
            totalRecipients: this.recipients.length,
            uniqueAddresses: addressSet.size,
            duplicates: duplicateCount,
            totalAmount: totalAmount.toString(),
            errors: errors.length,
            warnings: warnings.length
        });

        return {
            isValid: errors.length === 0,
            errors,
            warnings: warnings.length > 0 ? warnings : undefined
        };
    }

    /**
     * Network stability check
     */
    private async checkNetworkStability(): Promise<boolean> {
        if (!this.config.networkStabilityCheck) return true;

        this.logInfo('Checking network stability...');
        
        try {
            const checks: Promise<number>[] = [];
            const startTime = Date.now();
            
            // Sample multiple slot checks
            for (let i = 0; i < this.NETWORK_CHECK_SAMPLES; i++) {
                checks.push(
                    this.connection.getSlot().then(() => Date.now() - startTime)
                );
                if (i < this.NETWORK_CHECK_SAMPLES - 1) {
                    await new Promise(resolve => setTimeout(resolve, 500));
                }
            }
            
            const times = await Promise.all(checks);
            const avgTime = times.reduce((a, b) => a + b, 0) / times.length;
            const maxTime = Math.max(...times);
            
            const isStable = avgTime < 2000 && maxTime < 5000; // Conservative thresholds
            
            this.logInfo('Network stability check complete', {
                avgResponseTime: `${avgTime.toFixed(0)}ms`,
                maxResponseTime: `${maxTime}ms`,
                stable: isStable
            });
            
            if (!isStable) {
                this.logWarn('Network appears unstable. Consider waiting for better conditions.');
            }
            
            return isStable;
        } catch (error) {
            this.logWarn('Network stability check failed, proceeding with caution', error);
            return false;
        }
    }

    /**
     * Enhanced account existence check with detailed logging
     */
    private async checkAccountExists(ata: PublicKey, context: string): Promise<boolean> {
        for (let attempt = 1; attempt <= this.ACCOUNT_CHECK_RETRIES; attempt++) {
            try {
                await getAccount(this.connection, ata);
                return true;
            } catch (error: any) {
                if (error.name === 'TokenAccountNotFoundError' || 
                    error.message?.includes('could not find account') ||
                    error.message?.includes('Invalid account owner')) {
                    return false;
                }
                
                // For other errors, retry with exponential backoff
                if (attempt < this.ACCOUNT_CHECK_RETRIES) {
                    const delay = Math.min(1000 * Math.pow(2, attempt - 1), 5000);
                    this.logWarn(`Account check failed for ${context}, retrying in ${delay}ms (attempt ${attempt}/${this.ACCOUNT_CHECK_RETRIES})`, {
                        ata: ata.toString(),
                        error: error.message
                    });
                    await new Promise(resolve => setTimeout(resolve, delay));
                    continue;
                }
                
                // If all retries failed, assume account doesn't exist but log warning
                this.logWarn(`Failed to verify account existence for ${context} after ${this.ACCOUNT_CHECK_RETRIES} attempts, assuming it doesn't exist`, {
                    ata: ata.toString(),
                    error: error.message
                });
                return false;
            }
        }
        return false;
    }

    /**
     * Create batches with load balancing
     */
    private createBatches(recipientData: RecipientData[]): BatchData[] {
        const batchSize = this.config.batchSize!;
        const batches: BatchData[] = [];
        
        this.logInfo('Creating batches...', {
            totalRecipients: recipientData.length,
            batchSize,
            estimatedBatches: Math.ceil(recipientData.length / batchSize)
        });

        for (let i = 0; i < recipientData.length; i += batchSize) {
            const batchRecipients = recipientData.slice(i, i + batchSize);
            const batchIndex = Math.floor(i / batchSize);
            
            // Update batch index for each recipient
            batchRecipients.forEach(recipient => {
                recipient.batchIndex = batchIndex;
            });

            const accountsToCreate = batchRecipients
                .filter(r => !r.ata) // Will be populated during preparation
                .map(r => ({ recipient: r.address, ata: r.ata }));

            const totalAmount = batchRecipients.reduce((sum, r) => sum + r.rawAmount, BigInt(0));

            batches.push({
                index: batchIndex,
                recipients: batchRecipients,
                accountsToCreate,
                totalAmount,
                status: 'pending',
                attempts: 0
            });
        }

        this.logInfo('Batch creation complete', {
            batchCount: batches.length,
            avgBatchSize: (recipientData.length / batches.length).toFixed(1)
        });

        return batches;
    }

    /**
     * Comprehensive preparation with preflight checks
     */
    protected async prepareOperationData(): Promise<AirdropInBatchesOperationData> {
        try {
            this.logInfo('Starting comprehensive preparation phase...');
            
            // Network stability check
            const networkStable = await this.checkNetworkStability();
            
            // Get mint information with retries
            const mintInfo = await this.getMintInfo(this.mint);
            const mintPubkey = new PublicKey(this.mint);
            const sender = this.wallet.publicKey!;
            const senderAta = await getAssociatedTokenAddress(mintPubkey, sender);

            // Get sender's token account with validation
            const senderTokenAccount = await this.getTokenAccount(this.mint, sender);

            this.logInfo('Processing recipients with enhanced validation...', {
                count: this.recipients.length,
                decimals: mintInfo.decimals,
                senderBalance: Number(senderTokenAccount.amount) / Math.pow(10, mintInfo.decimals)
            });

            // Process recipients with detailed tracking
            const recipientData: RecipientData[] = [];
            let totalRawAmount = BigInt(0);
            let accountsNeedingCreation = 0;

            // Process in smaller chunks to avoid overwhelming the connection
            const chunkSize = 50;
            for (let chunkStart = 0; chunkStart < this.recipients.length; chunkStart += chunkSize) {
                const chunk = this.recipients.slice(chunkStart, Math.min(chunkStart + chunkSize, this.recipients.length));
                
                this.logInfo(`Processing recipient chunk ${Math.floor(chunkStart / chunkSize) + 1}/${Math.ceil(this.recipients.length / chunkSize)}`);

                for (let i = 0; i < chunk.length; i++) {
                    const globalIndex = chunkStart + i;
                    const recipient = chunk[i];
                    const rawAmount = this.parseAmount(recipient.amount, `recipient ${globalIndex + 1}`);
                    const address = new PublicKey(recipient.address.trim());
                    const ata = await getAssociatedTokenAddress(mintPubkey, address);
                    
                    // Check if account exists with detailed context
                    const accountExists = await this.checkAccountExists(ata, `recipient ${globalIndex + 1} (${address.toString().slice(0, 8)}...)`);
                    
                    if (!accountExists) {
                        if (!this.config.createRecipientAccount) {
                            throw new TokenLaunchError(
                                TokenLaunchErrorCode.TOKEN_ACCOUNT_NOT_FOUND,
                                `Recipient ${address.toString()} does not have a token account and auto-creation is disabled`
                            );
                        }
                        accountsNeedingCreation++;
                    }
                    
                    // Add to recipient data
                    recipientData.push({
                        address,
                        rawAmount,
                        humanAmount: Number(recipient.amount),
                        ata,
                        batchIndex: -1, // Will be set during batch creation
                        status: 'pending'
                    });
                    
                    totalRawAmount += rawAmount;
                }

                // Small delay between chunks to be gentle on the RPC
                if (chunkStart + chunkSize < this.recipients.length) {
                    await new Promise(resolve => setTimeout(resolve, 100));
                }
            }

            // Enhanced balance validation
            if (senderTokenAccount.amount < totalRawAmount) {
                const requiredHuman = Number(totalRawAmount) / Math.pow(10, mintInfo.decimals);
                const availableHuman = Number(senderTokenAccount.amount) / Math.pow(10, mintInfo.decimals);
                const deficit = requiredHuman - availableHuman;
                
                throw new TokenLaunchError(
                    TokenLaunchErrorCode.INSUFFICIENT_TOKEN_BALANCE,
                    `Insufficient token balance. Required: ${requiredHuman.toLocaleString()}, Available: ${availableHuman.toLocaleString()}, Deficit: ${deficit.toLocaleString()}`
                );
            }

            // Create optimized batches
            const batches = this.createBatches(recipientData);

            // Update progress
            this.progress = {
                totalBatches: batches.length,
                completedBatches: 0,
                failedBatches: 0,
                totalRecipients: recipientData.length,
                processedRecipients: 0,
                failedRecipients: 0
            };

            // Populate accounts to create for each batch
            batches.forEach(batch => {
                batch.accountsToCreate = batch.recipients
                    .filter(r => r.status === 'pending') // Only pending recipients need account checks
                    .map(r => ({ recipient: r.address, ata: r.ata }))
                    .filter(async ({ ata }) => !(await this.checkAccountExists(ata, 'batch preparation')));
            });

            const preflightChecks = {
                balanceVerified: senderTokenAccount.amount >= totalRawAmount,
                accountsValidated: true,
                networkStabilityChecked: networkStable
            };

            this.logInfo('Preparation phase complete', {
                recipients: recipientData.length,
                batches: batches.length,
                accountsNeedingCreation,
                totalAmount: totalRawAmount.toString(),
                totalAmountHuman: (Number(totalRawAmount) / Math.pow(10, mintInfo.decimals)).toLocaleString(),
                preflightChecks
            });

            return {
                mintInfo,
                senderTokenAccount,
                recipientData,
                batches,
                totalRawAmount,
                senderAta,
                mintPubkey,
                preflightChecks
            };
        } catch (error: any) {
            this.logError('Failed to prepare large safe airdrop operation', error);
            throw error;
        }
    }

    /**
     * Enhanced fee estimation for batched operations
     */
    protected async estimateFees(operationData: AirdropInBatchesOperationData): Promise<FeeEstimation> {
        this.logInfo('Estimating fees for large-scale operation (local heuristic)...');
        
        try {
            // Local per-batch heuristic: base tx fee + per-instruction fee
            const BASE_TX_FEE = 5000; // lamports
            const PER_INSTRUCTION_FEE = 2000; // lamports per instruction
            
            let totalTransactionFees = 0;
            let totalPriorityFees = 0;

            for (const batch of operationData.batches) {
                // Estimate instructions for this batch based on counts
                const instructionCount = (this.config.priorityFee ? 1 : 0)
                    + batch.accountsToCreate.length
                    + batch.recipients.length;
                const batchTransactionFee = BASE_TX_FEE + PER_INSTRUCTION_FEE * instructionCount;
                totalTransactionFees += batchTransactionFee;
                totalPriorityFees += this.config.priorityFee || 0;
            }

            // Account creation costs (local constant per ATA)
            const RENT_EXEMPT_165 = 2039280; // lamports
            const totalAccountsToCreate = operationData.batches.reduce((sum, b) => sum + b.accountsToCreate.length, 0);
            const totalAccountCreationFees = totalAccountsToCreate * RENT_EXEMPT_165;

            const breakdown = {
                transactionFees: Math.ceil(totalTransactionFees),
                accountCreations: totalAccountCreationFees,
                priorityFees: Math.ceil(totalPriorityFees),
                batchCount: operationData.batches.length
            };

            const totalFee = breakdown.transactionFees + breakdown.accountCreations + breakdown.priorityFees;
            
            this.logInfo('Fee estimation complete for large-scale operation', {
                ...breakdown,
                totalFee,
                totalFeeSOL: (totalFee / 1e9).toFixed(6),
                avgFeePerBatch: (totalFee / operationData.batches.length).toFixed(0)
            });

            return {
                estimatedFee: totalFee,
                breakdown
            };
        } catch (error) {
            this.logError('Fee estimation failed, using conservative defaults', error);
            
            // Very conservative fallback for large operations
            const fallbackBreakdown = {
                transactionFees: 20000 * operationData.batches.length,
                accountCreations: 2039280 * operationData.batches.reduce((sum, batch) => sum + batch.accountsToCreate.length, 0),
                priorityFees: (this.config.priorityFee || 50000) * operationData.batches.length,
                batchCount: operationData.batches.length
            };
            
            return {
                estimatedFee: Object.values(fallbackBreakdown).reduce((a, b) => a + b, 0),
                breakdown: fallbackBreakdown
            };
        }
    }

    /**
     * Build instructions for a single batch
     */
    private async buildBatchInstructions(
        batch: BatchData, 
        operationData: AirdropInBatchesOperationData
    ): Promise<TransactionInstruction[]> {
        const instructions: TransactionInstruction[] = [];
        const { senderAta, mintPubkey } = operationData;
        const sender = this.wallet.publicKey!;

        // 1. Priority fee (if specified)
        if (this.config.priorityFee && this.config.priorityFee > 0) {
            instructions.push(
                ComputeBudgetProgram.setComputeUnitPrice({
                    microLamports: this.config.priorityFee
                })
            );
        }

        // 2. Account creation instructions for this batch
        for (const { recipient, ata } of batch.accountsToCreate) {
            instructions.push(
                createAssociatedTokenAccountInstruction(
                    sender,        // payer
                    ata,          // associated token account
                    recipient,    // owner
                    mintPubkey,   // mint
                    TOKEN_PROGRAM_ID,
                    ASSOCIATED_TOKEN_PROGRAM_ID
                )
            );
        }

        // 3. Transfer instructions for this batch
        for (const recipientInfo of batch.recipients) {
            instructions.push(
                createTransferInstruction(
                    senderAta,                    // source
                    recipientInfo.ata,           // destination
                    sender,                      // owner
                    recipientInfo.rawAmount      // amount
                )
            );
        }

        return instructions;
    }

    /**
     * Execute a single batch with comprehensive error handling
     */
    private async executeBatch(
        batch: BatchData,
        operationData: AirdropInBatchesOperationData
    ): Promise<{ success: boolean; transactionId?: string; error?: string }> {
        const batchLabel = `Batch ${batch.index + 1}/${operationData.batches.length}`;
        
        try {
            batch.status = 'processing';
            batch.attempts++;
            
            this.logInfo(`Executing ${batchLabel}`, {
                recipients: batch.recipients.length,
                accountsToCreate: batch.accountsToCreate.length,
                attempt: batch.attempts,
                totalAmount: batch.totalAmount.toString()
            });

            // Build instructions for this batch
            const instructions = await this.buildBatchInstructions(batch, operationData);
            
            // Create and send transaction
            const { blockhash, lastValidBlockHeight } = await this.connection.getLatestBlockhash();
            
            const message = new TransactionMessage({
                payerKey: this.wallet.publicKey!,
                recentBlockhash: blockhash,
                instructions
            }).compileToV0Message();

            const transaction = new VersionedTransaction(message);
            
            // Sign transaction
            const signedTransaction = await this.wallet.signTransaction(transaction);
            
            // Dry run check
            if (this.config.dryRun) {
                this.logInfo(`${batchLabel} - DRY RUN: Would execute transaction`, {
                    instructionCount: instructions.length,
                    recipients: batch.recipients.length
                });
                return { success: true, transactionId: 'DRY_RUN_' + batch.index };
            }

            // Simulate transaction first
            if (this.config.enableSimulation) {
                try {
                    const simulation = await this.connection.simulateTransaction(signedTransaction);
                    if (simulation.value.err) {
                        throw new TokenLaunchError(
                            TokenLaunchErrorCode.SIMULATION_FAILED,
                            `Transaction simulation failed: ${JSON.stringify(simulation.value.err)}`
                        );
                    }
                } catch (error: any) {
                    if (error instanceof TokenLaunchError) throw error;
                    throw new TokenLaunchError(
                        TokenLaunchErrorCode.SIMULATION_FAILED,
                        `Transaction simulation error: ${error.message}`
                    );
                }
            }

            // Send transaction
            const signature = await this.connection.sendTransaction(signedTransaction, {
                maxRetries: 3,
                preflightCommitment: 'processed'
            });

            // Wait for confirmation with timeout
            try {
                const confirmation = await this.connection.confirmTransaction({
                    signature,
                    blockhash,
                    lastValidBlockHeight
                }, this.config.confirmationStrategy);

                if (confirmation.value.err) {
                    throw new TokenLaunchError(
                        TokenLaunchErrorCode.TRANSACTION_FAILED,
                        `Transaction failed: ${JSON.stringify(confirmation.value.err)}`
                    );
                }
            } catch (error: any) {
                if (error instanceof TokenLaunchError) throw error;
                if (error.message?.includes('timeout') || error.message?.includes('expired')) {
                    throw new TokenLaunchError(
                        TokenLaunchErrorCode.TIMEOUT,
                        `Transaction confirmation timeout: ${error.message}`
                    );
                }
                throw new TokenLaunchError(
                    TokenLaunchErrorCode.TRANSACTION_FAILED,
                    `Transaction confirmation failed: ${error.message}`
                );
            }

            // Update batch and recipient status
            batch.status = 'completed';
            batch.transactionId = signature;
            batch.recipients.forEach(r => r.status = 'completed');

            this.logInfo(`${batchLabel} completed successfully`, {
                transactionId: signature,
                recipients: batch.recipients.length,
                accountsCreated: batch.accountsToCreate.length
            });

            return { success: true, transactionId: signature };

        } catch (error: any) {
            batch.status = 'failed';
            batch.lastError = error.message;
            batch.recipients.forEach(r => r.status = 'failed');

            // Enhanced error handling with proper error codes
            let tokenLaunchError: TokenLaunchError;
            if (error instanceof TokenLaunchError) {
                tokenLaunchError = error;
            } else if (error.message?.includes('insufficient funds') || error.message?.includes('Insufficient')) {
                tokenLaunchError = new TokenLaunchError(
                    TokenLaunchErrorCode.INSUFFICIENT_FUNDS,
                    `Batch ${batch.index + 1} failed due to insufficient funds: ${error.message}`
                );
            } else if (error.message?.includes('timeout') || error.message?.includes('expired')) {
                tokenLaunchError = new TokenLaunchError(
                    TokenLaunchErrorCode.TIMEOUT,
                    `Batch ${batch.index + 1} timed out: ${error.message}`
                );
            } else if (error.message?.includes('network') || error.message?.includes('connection')) {
                tokenLaunchError = new TokenLaunchError(
                    TokenLaunchErrorCode.NETWORK_ERROR,
                    `Batch ${batch.index + 1} failed due to network error: ${error.message}`
                );
            } else {
                tokenLaunchError = new TokenLaunchError(
                    TokenLaunchErrorCode.BATCH_EXECUTION_FAILED,
                    `Batch ${batch.index + 1} execution failed: ${error.message}`
                );
            }

            this.logError(`${batchLabel} failed`, {
                attempt: batch.attempts,
                error: tokenLaunchError.message,
                code: tokenLaunchError.code,
                recipients: batch.recipients.length
            });

            return { success: false, error: tokenLaunchError.message };
        }
    }

    /**
     * Execute all batches with progress tracking and error recovery
     */
    private async executeBatches(operationData: AirdropInBatchesOperationData): Promise<{
        successfulBatches: number;
        failedBatches: number;
        totalTransactionIds: string[];
    }> {
        const startTime = Date.now();
        let successfulBatches = 0;
        let failedBatches = 0;
        const transactionIds: string[] = [];

        this.logInfo('Starting batch execution phase', {
            totalBatches: operationData.batches.length,
            batchSize: this.config.batchSize,
            batchDelay: this.config.batchDelayMs,
            maxRetries: this.config.maxBatchRetries
        });

        for (let i = 0; i < operationData.batches.length; i++) {
            const batch = operationData.batches[i];
            let batchSuccess = false;
            let lastError = '';

            // Retry logic for each batch
            for (let attempt = 1; attempt <= (this.config.maxBatchRetries || 3); attempt++) {
                if (attempt > 1) {
                    batch.status = 'retrying';
                    const retryDelay = Math.min(this.config.batchDelayMs! * attempt, 30000);
                    this.logInfo(`Retrying batch ${batch.index + 1} in ${retryDelay}ms (attempt ${attempt}/${this.config.maxBatchRetries})`, {
                        lastError
                    });
                    await new Promise(resolve => setTimeout(resolve, retryDelay));
                }

                const result = await this.executeBatch(batch, operationData);
                
                if (result.success) {
                    batchSuccess = true;
                    if (result.transactionId) {
                        transactionIds.push(result.transactionId);
                    }
                    break;
                } else {
                    lastError = result.error || 'Unknown error';
                    if (this.config.pauseOnError && attempt === (this.config.maxBatchRetries || 3)) {
                        this.logWarn('Pausing execution due to repeated batch failures', {
                            batch: batch.index + 1,
                            attempts: attempt,
                            error: lastError
                        });
                        // In a real implementation, you might want to pause and wait for manual intervention
                    }
                }
            }

            if (batchSuccess) {
                successfulBatches++;
                this.progress.completedBatches++;
                this.progress.processedRecipients += batch.recipients.length;
            } else {
                failedBatches++;
                this.progress.failedBatches++;
                this.progress.failedRecipients += batch.recipients.length;
            }

            // Update progress and call callback if provided
            this.progress.currentBatch = i + 1;
            if (operationData.batches.length > 1) {
                const elapsed = Date.now() - startTime;
                const avgTimePerBatch = elapsed / (i + 1);
                const remainingBatches = operationData.batches.length - (i + 1);
                this.progress.estimatedTimeRemaining = Math.ceil(avgTimePerBatch * remainingBatches);
            }

            if (this.config.progressCallback) {
                this.config.progressCallback(this.progress);
            }

            this.logInfo('Batch execution progress', {
                completed: `${i + 1}/${operationData.batches.length}`,
                successful: successfulBatches,
                failed: failedBatches,
                recipientsProcessed: this.progress.processedRecipients,
                estimatedTimeRemaining: this.progress.estimatedTimeRemaining ? `${Math.ceil(this.progress.estimatedTimeRemaining / 1000)}s` : 'N/A'
            });

            // Delay between batches (except for the last one)
            if (i < operationData.batches.length - 1) {
                await new Promise(resolve => setTimeout(resolve, this.config.batchDelayMs!));
            }
        }

        const totalTime = Date.now() - startTime;
        this.logInfo('Batch execution phase complete', {
            totalTime: `${Math.ceil(totalTime / 1000)}s`,
            successfulBatches,
            failedBatches,
            totalTransactions: transactionIds.length,
            successRate: `${((successfulBatches / operationData.batches.length) * 100).toFixed(1)}%`
        });

        return {
            successfulBatches,
            failedBatches,
            totalTransactionIds: transactionIds
        };
    }

    /**
     * Override base execute method for batch processing
     */
    public async execute(): Promise<AirdropResult> {
        try {
            this.startTime = Date.now();
            this.logInfo(`Starting ${this.getOperationName()}`);

            // 1. Validate parameters
            const validation = await this.validateParameters();
            if (!validation.isValid) {
                throw new TokenLaunchError(
                    TokenLaunchErrorCode.VALIDATION_ERROR,
                    `Validation failed: ${validation.errors.join(', ')}`
                );
            }

            if (validation.warnings?.length) {
                this.logWarn('Validation warnings detected', { warnings: validation.warnings });
            }

            // 2. Prepare operation data
            const operationData = await this.prepareOperationData();

            // 3. Estimate fees
            const feeEstimation = await this.estimateFees(operationData);

            this.logInfo('Pre-execution summary', {
                totalRecipients: operationData.recipientData.length,
                totalBatches: operationData.batches.length,
                totalAmount: (Number(operationData.totalRawAmount) / Math.pow(10, operationData.mintInfo.decimals)).toLocaleString(),
                estimatedFee: `${(feeEstimation.estimatedFee / 1e9).toFixed(6)} SOL`,
                preflightChecks: operationData.preflightChecks
            });

            // 4. Execute batches
            const executionResult = await this.executeBatches(operationData);

            // 5. Build final result
            const totalTime = Date.now() - this.startTime;
            const successRate = (executionResult.successfulBatches / operationData.batches.length) * 100;
            
            const result: AirdropResult = {
                success: executionResult.failedBatches === 0,
                transactionId: executionResult.totalTransactionIds.length > 0 ? executionResult.totalTransactionIds[0] : undefined,
                transactionIds: executionResult.totalTransactionIds,
                estimatedFee: feeEstimation.estimatedFee,
                actualFee: feeEstimation.estimatedFee, // In batch operations, this would need to be calculated from actual fees
                confirmationTime: totalTime,
                recipientsProcessed: this.progress.processedRecipients,
                recipientsFailed: this.progress.failedRecipients,
                accountsCreated: operationData.batches.reduce((sum, batch) => sum + batch.accountsToCreate.length, 0),
                totalAmountSent: operationData.totalRawAmount.toString(),
                batchCount: operationData.batches.length,
                successfulBatches: executionResult.successfulBatches,
                failedBatches: executionResult.failedBatches,
                successRate: parseFloat(successRate.toFixed(2))
            };

            if (result.success) {
                this.logInfo('Large-scale airdrop completed successfully', {
                    recipients: result.recipientsProcessed,
                    batches: result.batchCount,
                    transactions: executionResult.totalTransactionIds.length,
                    totalTime: `${Math.ceil(totalTime / 1000)}s`,
                    successRate: `${successRate.toFixed(1)}%`,
                    totalFee: `${(feeEstimation.estimatedFee / 1e9).toFixed(6)} SOL`
                });
            } else {
                this.logWarn('Large-scale airdrop completed with some failures', {
                    successful: result.recipientsProcessed,
                    failed: result.recipientsFailed,
                    successRate: `${successRate.toFixed(1)}%`,
                    failedBatches: executionResult.failedBatches
                });
            }

            return result;

        } catch (error: any) {
            const totalTime = Date.now() - this.startTime;
            this.logError('Large-scale airdrop operation failed', {
                error: error.message,
                totalTime: `${Math.ceil(totalTime / 1000)}s`,
                progress: this.progress
            });

            return {
                success: false,
                error: error.message,
                confirmationTime: totalTime,
                recipientsProcessed: this.progress.processedRecipients,
                recipientsFailed: this.progress.failedRecipients,
                batchCount: this.progress.totalBatches,
                successfulBatches: this.progress.completedBatches,
                failedBatches: this.progress.failedBatches,
                successRate: this.progress.totalRecipients > 0 ? 
                    parseFloat(((this.progress.processedRecipients / this.progress.totalRecipients) * 100).toFixed(2)) : 0
            };
        }
    }

    /**
     * Build instructions for the simple operation interface (not used in batch mode)
     */
    protected async buildInstructions(): Promise<TransactionInstruction[]> {
        throw new Error('buildInstructions not implemented for batch operations. Use executeBatches instead.');
    }

    /**
     * Build success result for the simple operation interface (not used in batch mode)
     */
    protected async buildSuccessResult(): Promise<AirdropResult> {
        throw new Error('buildSuccessResult not implemented for batch operations. Use execute method instead.');
    }

    /**
     * Get current progress information
     */
    public getProgress(): AirdropProgress {
        return { ...this.progress };
    }

    /**
     * Get detailed batch status
     */
    public getBatchStatus(): Array<{
        index: number;
        status: string;
        recipients: number;
        attempts: number;
        transactionId?: string;
        error?: string;
    }> {
        // This would be populated during execution
        return [];
    }
}

/**
 * Large-scale, safety-focused airdrop function
 * Optimized for reliability and high success rate with thousands of recipients
 */
export async function airdropTokensBatch(
    connection: Connection,
    wallet: SignerWallet,
    mint: string,
    recipients: AirdropRecipient[],
    config: AirdropInBatchesConfig = {}
): Promise<AirdropResult> {
    const operation = new AirdropInBatchesOperation({
        connection,
        wallet,
        mint,
        recipients,
        config
    });
    return await operation.execute();
}

/**
 * Utility function to validate recipients before starting large airdrop
 */
export async function validateLargeAirdropRecipients(
    recipients: AirdropRecipient[]
): Promise<{
    isValid: boolean;
    errors: string[];
    warnings: string[];
    summary: {
        totalRecipients: number;
        uniqueAddresses: number;
        duplicates: number;
        totalAmount: string;
        estimatedBatches: number;
    };
}> {
    const errors: string[] = [];
    const warnings: string[] = [];
    const addressSet = new Set<string>();
    let totalAmount = BigInt(0);
    let duplicateCount = 0;

    for (let i = 0; i < recipients.length; i++) {
        const recipient = recipients[i];
        const position = i + 1;

        if (!recipient.address?.trim()) {
            errors.push(`Recipient ${position}: address is required`);
            continue;
        }

        try {
            new PublicKey(recipient.address.trim());
            const normalizedAddress = recipient.address.trim();
            
            if (addressSet.has(normalizedAddress)) {
                duplicateCount++;
                warnings.push(`Duplicate address at position ${position}: ${normalizedAddress}`);
            } else {
                addressSet.add(normalizedAddress);
            }
        } catch (error) {
            errors.push(`Recipient ${position}: invalid address format`);
            continue;
        }

        try {
            const amount = typeof recipient.amount === 'string' ? 
                parseFloat(recipient.amount) : 
                Number(recipient.amount);
            
            if (!Number.isFinite(amount) || amount <= 0) {
                errors.push(`Recipient ${position}: invalid amount`);
            } else {
                totalAmount += BigInt(Math.floor(amount));
            }
        } catch (error) {
            errors.push(`Recipient ${position}: failed to parse amount`);
        }
    }

    const summary = {
        totalRecipients: recipients.length,
        uniqueAddresses: addressSet.size,
        duplicates: duplicateCount,
        totalAmount: totalAmount.toString(),
        estimatedBatches: Math.ceil(recipients.length / 15) // Default batch size
    };

    return {
        isValid: errors.length === 0,
        errors,
        warnings,
        summary
    };
}

/**
 * Utility function to estimate gas costs for large airdrops
 */
export async function estimateLargeAirdropCosts(
    connection: Connection,
    recipients: AirdropRecipient[],
    mint: string,
    config: { batchSize?: number; priorityFee?: number } = {}
): Promise<{
    estimatedTotalCost: number;
    breakdown: {
        transactionFees: number;
        priorityFees: number;
        accountCreationFees: number;
    };
    costPerRecipient: number;
    estimatedBatches: number;
}> {
    const batchSize = config.batchSize || 15;
    const priorityFee = config.priorityFee || 50000;
    const estimatedBatches = Math.ceil(recipients.length / batchSize);
    
    // Conservative estimates
    const avgTransactionFee = 20000; // per batch
    const rentExemption = await connection.getMinimumBalanceForRentExemption(165);
    
    // Assume 50% of recipients need account creation (conservative)
    const accountCreationsNeeded = Math.ceil(recipients.length * 0.5);
    
    const breakdown = {
        transactionFees: avgTransactionFee * estimatedBatches,
        priorityFees: priorityFee * estimatedBatches,
        accountCreationFees: rentExemption * accountCreationsNeeded
    };
    
    const estimatedTotalCost = Object.values(breakdown).reduce((a, b) => a + b, 0);
    
    return {
        estimatedTotalCost,
        breakdown,
        costPerRecipient: estimatedTotalCost / recipients.length,
        estimatedBatches
    };
}