import {
    Connection,
    PublicKey,
    Transaction,
    VersionedTransaction,
    TransactionMessage,
} from '@solana/web3.js';
import {
    getMint,
    getAccount,
    getAssociatedTokenAddress,
} from '@solana/spl-token';
import type { SignerWallet } from '../../types/custom-wallet-adapter';
import { TokenLaunchError, TokenLaunchErrorCode, ErrorFactory, ErrorContext } from '../../types/errors';
import { logger, generateOperationId, createTimer, OperationLogger } from '../utils/logger';
import { withRetry, checkConnectionHealth, confirmTransactionWithRetry } from '../utils/connection';
import { OperationConfig, OperationResult } from '../../types/core';

/**
 * Validation result interface
 */
export interface ValidationResult {
    isValid: boolean;
    errors: string[];
    warnings?: string[];
}

/**
 * Fee estimation interface
 */
export interface FeeEstimation {
    estimatedFee: number;
    breakdown: Record<string, number>;
}

/**
 * Abstract base class for all token operations
 * Encapsulates common patterns: validation, transaction building, error handling, confirmation
 */
export abstract class BaseTokenOperation<TConfig extends OperationConfig, TResult extends OperationResult> {
    protected connection: Connection;
    protected wallet: SignerWallet;
    protected config: Required<TConfig>;
    protected startTime: number;
    protected operationId: string;
    protected operationLogger: OperationLogger;
    protected timer: { end: (label?: string) => number };

    constructor(connection: Connection, wallet: SignerWallet, config: TConfig) {
        this.connection = connection;
        this.wallet = wallet;
        this.config = this.mergeWithDefaults(config);
        this.startTime = Date.now();
        this.operationId = generateOperationId();
        this.operationLogger = logger.child(this.operationId, {
            operation: this.getOperationName(),
            walletAddress: wallet.publicKey?.toString().slice(0, 8) + '...',
            network: this.connection.rpcEndpoint
        });
        this.timer = createTimer();
    }

    /**
     * Main execution method - implements the template pattern
     */
    async execute(): Promise<TResult> {
        return await withRetry(async () => {
            try {
                this.operationLogger.info('Starting operation', {
                    config: {
                        maxRetries: this.config.maxRetries,
                        timeoutMs: this.config.timeoutMs,
                        confirmationStrategy: this.config.confirmationStrategy,
                        enableSimulation: this.config.enableSimulation
                    }
                });
                
                // 1. Validate wallet and connection
                await this.validateWalletAndConnection();
                
                // 2. Validate operation-specific parameters
                const validation = await this.validateParameters();
                if (!validation.isValid) {
                    throw ErrorFactory.invalidTokenData('validation', validation.errors.join(', '), this.getErrorContext());
                }
                
                if (validation.warnings?.length) {
                    this.operationLogger.warn('Parameter validation warnings', { warnings: validation.warnings });
                }
                
                // 3. Prepare operation data
                this.operationLogger.debug('Preparing operation data');
                const operationData = await this.prepareOperationData();
                
                // 4. Estimate fees
                this.operationLogger.debug('Estimating transaction fees');
                const feeEstimation = await this.estimateFees(operationData);
                this.operationLogger.info('Fee estimation completed', {
                    estimatedFee: feeEstimation.estimatedFee,
                    breakdown: feeEstimation.breakdown
                });
                
                // 5. Validate balance for fees
                if (this.config.validateBalance) {
                    await this.validateWalletBalance(feeEstimation.estimatedFee);
                }
                
                // 6. Build transaction
                this.operationLogger.debug('Building transaction');
                const { blockhash, lastValidBlockHeight } = await this.connection.getLatestBlockhash();
                const instructions = await this.buildInstructions(operationData);
                
                this.operationLogger.debug('Transaction built', {
                    instructionCount: instructions.length,
                    blockhash: blockhash.slice(0, 8) + '...',
                    lastValidBlockHeight
                });
                
                // 7. Simulate transaction if enabled
                if (this.config.enableSimulation) {
                    await this.simulateTransaction(instructions, blockhash);
                }
                
                // 8. Send transaction
                const txId = await this.sendTransaction(instructions, blockhash);
                
                // 9. Confirm transaction
                await this.confirmTransaction(txId, blockhash, lastValidBlockHeight);
                
                // 10. Build successful result
                const result = await this.buildSuccessResult(txId, feeEstimation, operationData);
                
                const totalTime = this.timer.end();
                this.operationLogger.info('Operation completed successfully', {
                    transactionId: txId,
                    totalTime,
                    success: true
                });
                
                return result;
                
            } catch (error: any) {
                return this.handleError(error);
            }
        }, this.config.maxRetries, this.config.enableLogging);
    }

    // Abstract methods that subclasses must implement
    protected abstract getOperationName(): string;
    protected abstract validateParameters(): Promise<ValidationResult>;
    protected abstract prepareOperationData(): Promise<any>;
    protected abstract estimateFees(operationData: any): Promise<FeeEstimation>;
    protected abstract buildInstructions(operationData: any): Promise<any[]>;
    protected abstract buildSuccessResult(txId: string, feeEstimation: FeeEstimation, operationData: any): Promise<TResult>;

    // Common implementation methods
    protected mergeWithDefaults(config: TConfig): Required<TConfig> {
        const defaults = {
            maxRetries: 3,
            timeoutMs: 60000,
            confirmationStrategy: 'confirmed' as const,
            priorityFee: 0,
            enableLogging: false,
            enableSimulation: true,
            validateBalance: true,
        };
        return { ...defaults, ...config } as Required<TConfig>;
    }

    protected async validateWalletAndConnection(): Promise<void> {
        this.operationLogger.debug('Validating wallet and connection');
        
        // Validate wallet connection
        if (!this.wallet.publicKey) {
            throw ErrorFactory.walletNotConnected(this.getErrorContext());
        }

        // Check connection health
        const isHealthy = await checkConnectionHealth(this.connection);
        if (!isHealthy) {
            throw ErrorFactory.networkError(new Error('Network connection is unhealthy'), this.getErrorContext());
        }
        
        this.operationLogger.debug('Wallet and connection validation passed');
    }

    protected async validateWalletBalance(requiredAmount: number): Promise<void> {
        this.operationLogger.debug('Validating wallet balance', { requiredAmount });
        
        const balance = await this.connection.getBalance(this.wallet.publicKey!);
        
        this.operationLogger.debug('Balance check completed', {
            required: requiredAmount,
            available: balance,
            sufficient: balance >= requiredAmount
        });
        
        if (balance < requiredAmount) {
            throw ErrorFactory.insufficientFunds(requiredAmount, balance, this.getErrorContext());
        }
    }

    protected async simulateTransaction(instructions: any[], blockhash: string): Promise<void> {
        this.operationLogger.debug('Starting transaction simulation');
        
        try {
            const message = new TransactionMessage({
                payerKey: this.wallet.publicKey!,
                recentBlockhash: blockhash,
                instructions: instructions,
            }).compileToV0Message();

            const versionedTx = new VersionedTransaction(message);
            
            const simulation = await this.connection.simulateTransaction(versionedTx);
            if (simulation.value.err) {
                throw new TokenLaunchError(
                    TokenLaunchErrorCode.SIMULATION_FAILED,
                    'Transaction simulation failed',
                    simulation.value.err,
                    this.getErrorContext()
                );
            }
            
            this.operationLogger.debug('Transaction simulation successful', {
                computeUnitsConsumed: simulation.value.unitsConsumed,
                logs: simulation.value.logs?.slice(0, 3) // First 3 logs for brevity
            });
        } catch (simError: any) {
            this.operationLogger.warn('Transaction simulation failed, proceeding anyway', {
                error: simError.message,
                code: simError.code
            });
            
            if (simError instanceof TokenLaunchError) {
                throw simError;
            }
        }
    }

    protected async sendTransaction(instructions: any[], blockhash: string): Promise<string> {
        this.operationLogger.debug('Preparing to send transaction');
        
        const transaction = new Transaction();
        transaction.add(...instructions);
        transaction.feePayer = this.wallet.publicKey!;
        transaction.recentBlockhash = blockhash;

        const sendTimer = createTimer();
        this.operationLogger.debug('Sending transaction to network');
        
        try {
            const txId = await this.wallet.sendTransaction(transaction, this.connection);
            const sendTime = sendTimer.end();
            
            this.operationLogger.info('Transaction sent successfully', { 
                transactionId: txId,
                sendTime,
                instructionCount: instructions.length
            });
            
            return txId;
        } catch (error: any) {
            const sendTime = sendTimer.end();
            this.operationLogger.error('Failed to send transaction', error, { sendTime });
            throw error;
        }
    }

    protected async confirmTransaction(txId: string, blockhash: string, lastValidBlockHeight: number): Promise<void> {
        await confirmTransactionWithRetry(
            this.connection,
            txId,
            blockhash,
            lastValidBlockHeight,
            this.config.confirmationStrategy,
            this.config.timeoutMs
        );
    }

    protected handleError(error: any): TResult {
        const totalTime = this.timer.end();
        
        this.operationLogger.error('Operation failed', error, {
            totalTime,
            operationStage: 'unknown'
        });

        // Convert to TokenLaunchError if not already one
        let tokenError: TokenLaunchError;
        
        if (error instanceof TokenLaunchError) {
            tokenError = error;
        } else if (error.message?.includes('insufficient funds')) {
            tokenError = ErrorFactory.insufficientFunds(0, 0, this.getErrorContext());
        } else if (error.message?.includes('429') || error.message?.includes('rate limit')) {
            tokenError = ErrorFactory.rateLimited(undefined, this.getErrorContext());
        } else {
            tokenError = ErrorFactory.networkError(error, this.getErrorContext());
        }

        this.operationLogger.error('Error classified', undefined, {
            code: tokenError.code,
            severity: tokenError.severity,
            category: tokenError.category,
            isRetryable: tokenError.isRetryable
        });

        return {
            success: false,
            error: tokenError.message,
            estimatedFee: 0,
            actualFee: 0,
            confirmationTime: totalTime
        } as TResult;
    }

    /**
     * Create error context for current operation
     */
    protected getErrorContext(): ErrorContext {
        return {
            operationId: this.operationId,
            timestamp: Date.now(),
            networkType: this.connection.rpcEndpoint,
            walletType: this.wallet.publicKey?.toString(),
            additionalData: {
                operationName: this.getOperationName(),
                startTime: this.startTime
            }
        };
    }

    // Utility methods for common operations
    protected async getMintInfo(mintAddress: string) {
        try {
            const mintPubkey = new PublicKey(mintAddress);
            return await getMint(this.connection, mintPubkey);
        } catch (error) {
            throw new TokenLaunchError(
                TokenLaunchErrorCode.INVALID_TOKEN_DATA,
                'Failed to fetch mint information'
            );
        }
    }

    protected async getTokenAccount(mintAddress: string, owner: PublicKey) {
        const mintPubkey = new PublicKey(mintAddress);
        const ata = await getAssociatedTokenAddress(mintPubkey, owner);
        
        try {
            return await getAccount(this.connection, ata);
        } catch (error) {
            throw new TokenLaunchError(
                TokenLaunchErrorCode.TOKEN_ACCOUNT_NOT_FOUND,
                `Token account not found for mint ${mintAddress}`
            );
        }
    }

    protected validatePublicKey(address: string, fieldName: string): PublicKey {
        try {
            return new PublicKey(address);
        } catch {
            throw new Error(`Invalid ${fieldName} address format`);
        }
    }


/**
 * Validates a bigint amount to ensure it is positive and within the valid range for an SPL token (u64).
 * @param amount The amount to validate.
 * @param fieldName The name of the amount field, used for error messages.
 */
protected validateAmount(amount: bigint, fieldName: string): void {
    // Check if the amount is positive.
    if (amount <= BigInt(0)) {
        throw new Error(`${fieldName} must be greater than zero`);
    }

    // Check if the amount exceeds the maximum possible value for a token account.
    if (amount > BigInt(2 ** 64 - 1)) {
        throw new Error(`${fieldName} exceeds the maximum possible token amount (2^64 - 1)`);
    }
}

    protected convertToRawAmount(amount: bigint, decimals: number): bigint {
        return amount * BigInt(10 ** decimals);
    }

    // Legacy logging methods (deprecated, kept for backward compatibility)
    protected logInfo(message: string, data?: any): void {
        if (this.config.enableLogging) {
            this.operationLogger.info(message, data);
        }
    }

    protected logWarn(message: string, data?: any): void {
        if (this.config.enableLogging) {
            this.operationLogger.warn(message, data);
        }
    }

    protected logError(message: string, error?: any): void {
        if (this.config.enableLogging) {
            this.operationLogger.error(message, error);
        }
    }
} 