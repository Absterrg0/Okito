import {
    Connection,
    PublicKey,
    Transaction,
    VersionedTransaction,
    TransactionMessage,
} from '@solana/web3.js';
import {
    getAssociatedTokenAddress,
    createBurnInstruction,
    getAccount,
    getMint,
} from '@solana/spl-token';
import type { SignerWallet } from '../../types/custom-wallet-adapter';
import type { BurnTokenConfig, BurnTokenResult } from '../../types/token/burn-token';
import { TokenLaunchError, TokenLaunchErrorCode } from '../../types/errors';
import { log } from '../utils/logger';
import { withRetry, checkConnectionHealth, confirmTransactionWithRetry } from '../utils/connection';
import { validateBurnParams } from './helpers';

/**
 * Estimates fees for token burn operations
 * @param connection - Solana connection instance  
 * @param priorityFee - Optional priority fee in lamports
 * @returns Promise resolving to fee estimation
 */
export async function estimateBurnFee(
    connection: Connection,
    priorityFee: number = 0
): Promise<{ estimatedFee: number; breakdown: { burn: number; priorityFee: number } }> {
    try {
        // Base burn instruction fee
        const burnFee = 5000; // ~0.000005 SOL
        
        const breakdown = {
            burn: burnFee,
            priorityFee: priorityFee
        };
        
        const estimatedFee = breakdown.burn + breakdown.priorityFee;
        
        return {
            estimatedFee,
            breakdown
        };
    } catch (error) {
        log('error', 'Failed to estimate burn fees', error);
        return {
            estimatedFee: 0.005 * 1e9,
            breakdown: {
                burn: 5000,
                priorityFee
            }
        };
    }
}

/**
 * Production-ready SPL token burn function with comprehensive error handling,
 * retry logic, transaction confirmation, and fee estimation.
 * 
 * @param wallet - The wallet that owns the tokens to burn
 * @param connection - Solana connection instance
 * @param mint - Token mint address as string
 * @param amount - Amount of tokens to burn (in token units, not raw lamports)
 * @param config - Configuration options for the burn operation
 * @returns Promise resolving to BurnTokenResult with detailed status
 */
export async function burnToken(
    wallet: SignerWallet,
    connection: Connection,
    mint: string,
    amount: number,
    config: BurnTokenConfig = {}
): Promise<BurnTokenResult> {
    const startTime = Date.now();
    
    // Default configuration
    const {
        maxRetries = 3,
        timeoutMs = 60000,
        confirmationStrategy = 'confirmed',
        enableLogging = true,
        enableSimulation = true,
    } = config;

    return await withRetry(async () => {
        try {
            if (enableLogging) {
                log('info', 'Starting token burn', { 
                    mint, 
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

            // 3. Validate burn parameters
            const validation = validateBurnParams(mint, wallet.publicKey.toString(), amount);
            if (!validation.isValid) {
                throw new TokenLaunchError(
                    TokenLaunchErrorCode.INVALID_TOKEN_DATA,
                    validation.errors.join(', ')
                );
            }

            if (enableLogging && validation.warnings?.length) {
                log('warn', 'Burn parameter warnings', validation.warnings);
            }

            // 4. Convert string addresses to PublicKey objects
            const mintPubkey = new PublicKey(mint);
            const owner = wallet.publicKey;

            // 5. Get mint info to fetch actual decimals
            let mintInfo;
            try {
                mintInfo = await getMint(connection, mintPubkey);
            } catch (error) {
                throw new TokenLaunchError(
                    TokenLaunchErrorCode.INVALID_TOKEN_DATA,
                    'Failed to fetch mint information'
                );
            }

            // 6. Get Associated Token Account
            const ownerAta = await getAssociatedTokenAddress(mintPubkey, owner);

            // 7. Check if owner has token account and sufficient balance
            let ownerTokenAccount;
            try {
                ownerTokenAccount = await getAccount(connection, ownerAta);
            } catch (error) {
                throw new TokenLaunchError(
                    TokenLaunchErrorCode.TOKEN_ACCOUNT_NOT_FOUND,
                    'Token account not found for this mint'
                );
            }

            // 8. Convert amount to raw token units using actual mint decimals
            const decimals = mintInfo.decimals;
            const rawAmount = BigInt(Math.floor(amount * Math.pow(10, decimals)));

            if (enableLogging) {
                log('info', 'Token decimals and conversion', { 
                    decimals, 
                    humanAmount: amount, 
                    rawAmount: rawAmount.toString() 
                });
            }

            // 9. Validate sufficient balance
            if (ownerTokenAccount.amount < rawAmount) {
                throw new TokenLaunchError(
                    TokenLaunchErrorCode.INSUFFICIENT_TOKEN_BALANCE,
                    `Insufficient token balance. Required: ${rawAmount}, Available: ${ownerTokenAccount.amount}`
                );
            }

            // 10. Estimate fees
            const feeEstimation = await estimateBurnFee(connection, 0);
            
            if (enableLogging) {
                log('info', 'Fee estimation', feeEstimation);
            }

            // 11. Check wallet balance for fees
            const balance = await connection.getBalance(wallet.publicKey);
            if (balance < feeEstimation.estimatedFee) {
                throw new TokenLaunchError(
                    TokenLaunchErrorCode.INSUFFICIENT_FUNDS,
                    `Insufficient SOL for transaction fees. Required: ${feeEstimation.estimatedFee / 1e9} SOL, Available: ${balance / 1e9} SOL`
                );
            }

            // 12. Build transaction
            const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash();
            
            // Create burn instruction
            const burnInstruction = createBurnInstruction(
                ownerAta,     // Token account to burn from
                mintPubkey,   // Mint address  
                owner,        // Owner of the token account
                rawAmount     // Amount to burn in raw token units
            );

            // 13. Simulate transaction if enabled using VersionedTransaction
            if (enableSimulation) {
                try {
                    // Create versioned transaction for simulation
                    const message = new TransactionMessage({
                        payerKey: wallet.publicKey,
                        recentBlockhash: blockhash,
                        instructions: [burnInstruction],
                    }).compileToV0Message();

                    const versionedTx = new VersionedTransaction(message);
                    
                    const simulation = await connection.simulateTransaction(versionedTx);
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

            // 14. Build legacy transaction for sending (wallet compatibility)
            const transaction = new Transaction();
            transaction.add(burnInstruction);
            transaction.feePayer = wallet.publicKey;
            transaction.recentBlockhash = blockhash;

            // 15. Send transaction
            const sendStartTime = Date.now();
            const txId = await wallet.sendTransaction(transaction, connection);
            
            if (enableLogging) {
                log('info', 'Burn transaction sent', { txId, time: Date.now() - sendStartTime });
            }

            // 16. Confirm transaction
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
                log('info', 'Token burn successful', { 
                    txId,
                    totalTime,
                    amountBurned: rawAmount.toString()
                });
            }

            return {
                success: true,
                transactionId: txId,
                estimatedFee: feeEstimation.estimatedFee,
                confirmationTime: totalTime
            };

        } catch (error: any) {
            if (enableLogging) {
                log('error', 'Token burn failed', error);
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
                error.message || 'Failed to burn tokens',
                error
            );
        }
    }, maxRetries, enableLogging).catch((error: TokenLaunchError) => {
        return {
            success: false,
            error: error.message,
            estimatedFee: 0,
            confirmationTime: Date.now() - startTime
        };
    });
}