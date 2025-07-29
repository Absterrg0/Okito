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
import { TokenLaunchError, TokenLaunchErrorCode } from '../../types/errors';
import { log } from '../utils/logger';
import { withRetry, checkConnectionHealth, confirmTransactionWithRetry } from '../utils/connection';

/**
 * Base configuration interface for all token operations
 */
export interface BaseOperationConfig {
    maxRetries?: number;
    timeoutMs?: number;
    confirmationStrategy?: 'processed' | 'confirmed' | 'finalized';
    priorityFee?: number;
    enableLogging?: boolean;
    enableSimulation?: boolean;
    validateBalance?: boolean;
}

/**
 * Base result interface for all token operations
 */
export interface OperationResult {
    success: boolean;
    transactionId?: string;
    error?: string;
    estimatedFee?: number;
    actualFee?: number;
    confirmationTime?: number;
}

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
export abstract class BaseTokenOperation<TConfig extends BaseOperationConfig, TResult extends OperationResult> {
    protected connection: Connection;
    protected wallet: SignerWallet;
    protected config: Required<TConfig>;
    protected startTime: number;

    constructor(connection: Connection, wallet: SignerWallet, config: TConfig) {
        this.connection = connection;
        this.wallet = wallet;
        this.config = this.mergeWithDefaults(config);
        this.startTime = Date.now();
    }

    /**
     * Main execution method - implements the template pattern
     */
    async execute(): Promise<TResult> {
        return await withRetry(async () => {
            try {
                this.logInfo('Starting operation', this.getOperationName());
                
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
                
                // 6. Build transaction
                const { blockhash, lastValidBlockHeight } = await this.connection.getLatestBlockhash();
                const instructions = await this.buildInstructions(operationData);
                
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
                
                this.logInfo('Operation completed successfully', {
                    txId,
                    totalTime: Date.now() - this.startTime
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
        // Validate wallet connection
        if (!this.wallet.publicKey) {
            throw new TokenLaunchError(
                TokenLaunchErrorCode.WALLET_NOT_CONNECTED,
                'Wallet not connected or public key not available'
            );
        }

        // Check connection health
        const isHealthy = await checkConnectionHealth(this.connection);
        if (!isHealthy) {
            throw new TokenLaunchError(
                TokenLaunchErrorCode.NETWORK_ERROR,
                'Network connection is unhealthy'
            );
        }
    }

    protected async validateWalletBalance(requiredAmount: number): Promise<void> {
        const balance = await this.connection.getBalance(this.wallet.publicKey!);
        if (balance < requiredAmount) {
            throw new TokenLaunchError(
                TokenLaunchErrorCode.INSUFFICIENT_FUNDS,
                `Insufficient SOL for transaction fees. Required: ${requiredAmount / 1e9} SOL, Available: ${balance / 1e9} SOL`
            );
        }
    }

    protected async simulateTransaction(instructions: any[], blockhash: string): Promise<void> {
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
                    TokenLaunchErrorCode.TRANSACTION_FAILED,
                    'Transaction simulation failed',
                    simulation.value.err
                );
            }
            this.logInfo('Transaction simulation successful');
        } catch (simError: any) {
            this.logWarn('Transaction simulation failed, proceeding anyway', simError.message);
        }
    }

    protected async sendTransaction(instructions: any[], blockhash: string): Promise<string> {
        const transaction = new Transaction();
        transaction.add(...instructions);
        transaction.feePayer = this.wallet.publicKey!;
        transaction.recentBlockhash = blockhash;

        const sendStartTime = Date.now();
        const txId = await this.wallet.sendTransaction(transaction, this.connection);
        
        this.logInfo('Transaction sent', { txId, time: Date.now() - sendStartTime });
        return txId;
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
        this.logError('Operation failed', error);

        // Handle specific error types
        if (error instanceof TokenLaunchError) {
            // Already a TokenLaunchError, just pass through
        } else if (error.message?.includes('insufficient funds')) {
            error = new TokenLaunchError(
                TokenLaunchErrorCode.INSUFFICIENT_FUNDS,
                'Insufficient funds for transaction'
            );
        } else if (error.message?.includes('429') || error.message?.includes('rate limit')) {
            error = new TokenLaunchError(
                TokenLaunchErrorCode.RATE_LIMITED,
                'Rate limited by RPC endpoint'
            );
        } else {
            error = new TokenLaunchError(
                TokenLaunchErrorCode.NETWORK_ERROR,
                error.message || `Failed to execute ${this.getOperationName()}`,
                error
            );
        }

        return {
            success: false,
            error: error.message,
            estimatedFee: 0,
            actualFee: 0,
            confirmationTime: Date.now() - this.startTime
        } as TResult;
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

    protected validateAmount(amount: number, fieldName: string): void {
        if (amount <= 0) {
            throw new Error(`${fieldName} must be greater than zero`);
        }
        if (amount > Number.MAX_SAFE_INTEGER) {
            throw new Error(`${fieldName} is too large`);
        }
    }

    protected convertToRawAmount(amount: number, decimals: number): bigint {
        return BigInt(Math.floor(amount * Math.pow(10, decimals)));
    }

    // Logging utilities
    protected logInfo(message: string, data?: any): void {
        if (this.config.enableLogging) {
            log('info', `${this.getOperationName()}: ${message}`, data);
        }
    }

    protected logWarn(message: string, data?: any): void {
        if (this.config.enableLogging) {
            log('warn', `${this.getOperationName()}: ${message}`, data);
        }
    }

    protected logError(message: string, error?: any): void {
        if (this.config.enableLogging) {
            log('error', `${this.getOperationName()}: ${message}`, error);
        }
    }
} 