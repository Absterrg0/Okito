import {
    Connection,
    PublicKey,
    Transaction,
} from '@solana/web3.js';
import {
    getAssociatedTokenAddress,
    createAssociatedTokenAccountInstruction,
    createTransferInstruction,
    getAccount,
} from '@solana/spl-token';
import type { SignerWallet } from '../../types/custom-wallet-adapter';
import type { 
    TransferTokensParams,
    TransferResult,
    TransferFeeEstimation
} from '../../types/token/transfer';
import { TokenLaunchError, TokenLaunchErrorCode } from '../../types/errors';
import { log } from '../utils/logger';
import { withRetry, checkConnectionHealth, confirmTransactionWithRetry } from '../utils/connection';
import { estimateTransferFee, validateTransferParams } from './helpers';

/**
 * Estimates fees for token transfer with production-ready accuracy
 * @param connection - Solana connection instance
 * @param mint - Token mint address
 * @param destination - Destination wallet address
 * @param priorityFee - Optional priority fee in lamports
 * @returns Promise resolving to fee estimation
 */
export async function estimateTokenTransferFee(
    connection: Connection,
    mint: string,
    destination: string,
    priorityFee: number = 0
): Promise<TransferFeeEstimation> {
    try {
        const mintPubkey = new PublicKey(mint);
        const destPubkey = new PublicKey(destination);
        
        // Check if destination ATA exists
        const destinationAta = await getAssociatedTokenAddress(mintPubkey, destPubkey);
        let needsDestinationATA = false;
        
        try {
            await getAccount(connection, destinationAta);
        } catch {
            needsDestinationATA = true;
        }
        
        return await estimateTransferFee(connection, needsDestinationATA, priorityFee);
    } catch (error) {
        log('error', 'Failed to estimate transfer fees', error);
        return {
            estimatedFee: 0.005 * 1e9,
        };
    }
}

/**
 * Production-ready SPL token transfer function with comprehensive error handling,
 * retry logic, transaction confirmation, and fee estimation.
 *
 * @param params - Transfer parameters including wallet, connection, and config
 * @returns Promise resolving to TransferResult with detailed status
 */
export async function transferTokens(params: TransferTokensParams): Promise<TransferResult> {
    const {
        connection,
        wallet,
        mint,
        destination,
        amount,
        config = {},
    } = params;

    const startTime = Date.now();
    
    // Default configuration
    const {
        maxRetries = 3,
        timeoutMs = 60000,
        confirmationStrategy = 'confirmed',
        priorityFee = 0,
        enableLogging = false,
        enableSimulation = true,
        createDestinationATA = true
    } = config;

    return await withRetry(async () => {
        try {
            if (enableLogging) {
                log('info', 'Starting token transfer', { 
                    mint, 
                    destination, 
                    amount: amount.toString() 
                });
            }

            // 1. Validate wallet connection
            if (!wallet.publicKey) {
                throw new TokenLaunchError(
                    TokenLaunchErrorCode.WALLET_NOT_CONNECTED,
                    'Wallet not connected or public key not available'
                );
            }

            // 2. Check connection health
            const isHealthy = await checkConnectionHealth(connection);
            if (!isHealthy) {
                throw new TokenLaunchError(
                    TokenLaunchErrorCode.NETWORK_ERROR,
                    'Network connection is unhealthy'
                );
            }

            // 3. Validate transfer parameters
            const validation = validateTransferParams(mint, destination, amount);
            if (!validation.isValid) {
                throw new TokenLaunchError(
                    TokenLaunchErrorCode.INVALID_TOKEN_DATA,
                    validation.errors.join(', ')
                );
            }

            if (enableLogging && validation.warnings?.length) {
                log('warn', 'Transfer parameter warnings', validation.warnings);
            }

            // 4. Convert string addresses to PublicKey objects
            const mintPubkey = new PublicKey(mint);
            const destinationPubkey = new PublicKey(destination);
            const sender = wallet.publicKey;

            // 5. Get Associated Token Accounts
            const senderAta = await getAssociatedTokenAddress(mintPubkey, sender);
            const destinationAta = await getAssociatedTokenAddress(mintPubkey, destinationPubkey);

            // 6. Check if sender has token account and sufficient balance
            let senderTokenAccount;
            try {
                senderTokenAccount = await getAccount(connection, senderAta);
            } catch (error) {
                throw new TokenLaunchError(
                    TokenLaunchErrorCode.TOKEN_ACCOUNT_NOT_FOUND,
                    'Sender does not have a token account for this mint'
                );
            }

            // 7. Validate sufficient balance
            if (senderTokenAccount.amount < amount) {
                throw new TokenLaunchError(
                    TokenLaunchErrorCode.INSUFFICIENT_TOKEN_BALANCE,
                    `Insufficient token balance. Required: ${amount}, Available: ${senderTokenAccount.amount}`
                );
            }

            // 8. Check if destination ATA exists
            let destinationAccountExists = true;
            let createdDestinationATA = false;
            
            try {
                await getAccount(connection, destinationAta);
            } catch (error) {
                destinationAccountExists = false;
                if (!createDestinationATA) {
                    throw new TokenLaunchError(
                        TokenLaunchErrorCode.TOKEN_ACCOUNT_NOT_FOUND,
                        'Destination token account does not exist and auto-creation is disabled'
                    );
                }
            }

            // 9. Estimate fees
            const feeEstimation = await estimateTransferFee(connection, !destinationAccountExists, priorityFee);
            
            if (enableLogging) {
                log('info', 'Fee estimation', feeEstimation);
            }

            // 10. Check wallet balance for fees
            const balance = await connection.getBalance(wallet.publicKey);
            if (balance < feeEstimation.estimatedFee) {
                throw new TokenLaunchError(
                    TokenLaunchErrorCode.INSUFFICIENT_FUNDS,
                    `Insufficient SOL for transaction fees. Required: ${feeEstimation.estimatedFee / 1e9} SOL, Available: ${balance / 1e9} SOL`
                );
            }

            // 11. Build transaction
            const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash();
            const transaction = new Transaction();

            // Add ATA creation instruction if needed
            if (!destinationAccountExists) {
                transaction.add(
                    createAssociatedTokenAccountInstruction(
                        sender,           // Payer for account creation
                        destinationAta,   // The new ATA address
                        destinationPubkey, // The owner of the new ATA
                        mintPubkey        // The mint the ATA is for
                    )
                );
                createdDestinationATA = true;
            }

            // Add transfer instruction
            transaction.add(
                createTransferInstruction(
                    senderAta,      // Source account
                    destinationAta, // Destination account
                    sender,         // Owner of source account
                    amount          // Amount to transfer
                )
            );

            transaction.feePayer = wallet.publicKey;
            transaction.recentBlockhash = blockhash;

            // 12. Simulate transaction if enabled
            if (enableSimulation) {
                try {
                    const simulation = await connection.simulateTransaction(transaction);
                    if (simulation.value.err) {
                        throw new TokenLaunchError(
                            TokenLaunchErrorCode.TRANSACTION_FAILED,
                            'Transaction simulation failed',
                            simulation.value.err
                        );
                    }
                    if (enableLogging) {
                        log('info', 'Transaction simulation successful');
                    }
                } catch (simError: any) {
                    if (enableLogging) {
                        log('warn', 'Transaction simulation failed, proceeding anyway', simError.message);
                    }
                }
            }

                         // 13. Send transaction
             const sendStartTime = Date.now();
             const txId = await wallet.sendTransaction(transaction, connection);
            
            if (enableLogging) {
                log('info', 'Transfer transaction sent', { txId, time: Date.now() - sendStartTime });
            }

            // 14. Confirm transaction
            await confirmTransactionWithRetry(
                connection,
                txId,
                blockhash,
                lastValidBlockHeight,
                confirmationStrategy,
                timeoutMs
            );

            const totalTime = Date.now() - startTime;
            
            if (enableLogging) {
                log('info', 'Token transfer successful', { 
                    txId,
                    totalTime,
                    createdDestinationATA
                });
            }

            return {
                success: true,
                transactionId: txId,
                estimatedFee: feeEstimation.estimatedFee,
                confirmationTime: totalTime,
                createdDestinationATA
            };

        } catch (error: any) {
            if (enableLogging) {
                log('error', 'Token transfer failed', error);
            }

            // Handle specific error types
            if (error instanceof TokenLaunchError) {
                throw error;
            }

            // Map common Solana errors
            if (error.message?.includes('insufficient funds')) {
                throw new TokenLaunchError(
                    TokenLaunchErrorCode.INSUFFICIENT_FUNDS,
                    'Insufficient funds for transaction'
                );
            }

            if (error.message?.includes('429') || error.message?.includes('rate limit')) {
                throw new TokenLaunchError(
                    TokenLaunchErrorCode.RATE_LIMITED,
                    'Rate limited by RPC endpoint'
                );
            }

            // Default to network error
            throw new TokenLaunchError(
                TokenLaunchErrorCode.NETWORK_ERROR,
                error.message || 'Failed to transfer tokens',
                error
            );
        }
    }, maxRetries, enableLogging).catch((error: TokenLaunchError) => {
        return {
            success: false,
            error: error.message,
            estimatedFee: 0,
            actualFee: 0,
            confirmationTime: Date.now() - startTime,
            createdDestinationATA: false
        };
    });
}

/**
 * Legacy transfer function for backward compatibility
 * @deprecated Use transferTokens with TransferTokensParams instead
 */
export async function legacyTransferTokens(
    connection: Connection,
    wallet: SignerWallet,
    mint: PublicKey,
    destination: PublicKey,
    amount: bigint,
    sendOptions?: any
): Promise<string> {
    const result = await transferTokens({
        connection,
        wallet,
        mint: mint.toString(),
        destination: destination.toString(),
        amount,
        sendOptions,
        config: {
            enableLogging: false,
            maxRetries: 1
        }
    });

    if (!result.success) {
        throw new Error(result.error || 'Transfer failed');
    }

    return result.transactionId!;
}
