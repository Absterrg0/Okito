import {
    Keypair,
    SystemProgram,
    Transaction,
    PublicKey,
    TransactionMessage,
    VersionedTransaction,

} from '@solana/web3.js';
import type { Connection } from '@solana/web3.js';
import {
    TOKEN_2022_PROGRAM_ID,
    createInitializeMint2Instruction,
    getAssociatedTokenAddressSync,
    createAssociatedTokenAccountInstruction,
    createMintToInstruction,
    getMintLen,
    ExtensionType,
    createInitializeMetadataPointerInstruction,
    TYPE_SIZE,
    LENGTH_SIZE,
} from '@solana/spl-token';
import {
    createInitializeInstruction,
    TokenMetadata,
    createUpdateFieldInstruction,
    pack,
} from '@solana/spl-token-metadata';
import type { 
    TokenLaunchData, 
    TokenLaunchResult, 
    FeeEstimation,
    ProductionTokenLaunchConfig,
    TokenResult
} from '../../types/token/launch';
import { TokenLaunchError, TokenLaunchErrorCode } from '../../types/errors';
import type { SignerWallet } from '../../types/custom-wallet-adapter';
import { sanitizeText } from '../utils/sanitizers';
import { validateProductionTokenData } from './helpers';
import { withRetry, checkConnectionHealth, confirmTransactionWithRetry } from '../utils/connection';
import { log } from '../utils/logger';
import { estimateTokenCreationFee } from './helpers';
import { isValidMintAddress, isValidUrl } from '../utils/sanitizers';




/**
 * Launches a new token on Solana blockchain using TOKEN_2022_PROGRAM_ID with production-ready features
 * @param wallet - Connected wallet instance
 * @param connection - Solana connection instance
 * @param tokenData - Token configuration data
 * @param config - Production configuration options
 * @returns Promise resolving to TokenLaunchResult
 */
export async function buildToken(
    wallet: SignerWallet,
    connection: Connection,
    tokenData: TokenLaunchData,
    config: ProductionTokenLaunchConfig = {}
): Promise<TokenLaunchResult> {
    const startTime = Date.now();
    
    // Default configuration
    const {
        maxRetries = 3,
        timeoutMs = 60000,
        confirmationStrategy = 'confirmed',
        priorityFee = 0,
        enableSimulation = true,
        enableLogging = false
    } = config;
        return await withRetry(async () => {
        try {
            if (enableLogging) {
                log('info', 'Starting token creation', { 
                    name: tokenData.name, 
                    symbol: tokenData.symbol 
                });
            }

            // 1. Validate wallet connection
            if (!wallet.publicKey) {
                throw new TokenLaunchError(
                    TokenLaunchErrorCode.WALLET_NOT_CONNECTED,
                    'Wallet not connected'
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

            // 3. Enhanced validation with sanitization
            const validation = validateProductionTokenData(tokenData);
            if (!validation.isValid) {
                throw new TokenLaunchError(
                    TokenLaunchErrorCode.INVALID_TOKEN_DATA,
                    validation.errors.join(', ')
                );
            }

            if (enableLogging && validation.warnings?.length) {
                log('warn', 'Token data warnings', validation.warnings);
            }

            // 4. Sanitize inputs
            const sanitizedTokenData = {
                ...tokenData,
                name: sanitizeText(tokenData.name, 32),
                symbol: sanitizeText(tokenData.symbol, 10).toUpperCase(),
                description: tokenData.description ? sanitizeText(tokenData.description, 500) : undefined
            };

            // 5. Estimate fees first
            let feeEstimation: FeeEstimation;
            try {
                feeEstimation = await estimateTokenCreationFee(connection, sanitizedTokenData, priorityFee);
                if (enableLogging) {
                    log('info', 'Fee estimation', feeEstimation);
                }
            } catch (error) {
                if (enableLogging) {
                    log('warn', 'Failed to estimate fees, proceeding with conservative estimate');
                }
                feeEstimation = {
                    estimatedFee: 0.01 * 1e9,
                    breakdown: { accountCreation: 0.008 * 1e9, metadata: 0, mintTokens: 0.001 * 1e9, priorityFee }
                };
            }

            // 6. Check wallet balance
            const balance = await connection.getBalance(wallet.publicKey);
            if (balance < feeEstimation.estimatedFee) {
                throw new TokenLaunchError(
                    TokenLaunchErrorCode.INSUFFICIENT_FUNDS,
                    `Insufficient balance. Required: ${feeEstimation.estimatedFee / 1e9} SOL, Available: ${balance / 1e9} SOL`
                );
            }

            // 7. Generate mint keypair
            const mintKeyPair = Keypair.generate();

            // 8. Prepare metadata
            const metadata: TokenMetadata = {
                updateAuthority: wallet.publicKey,
                mint: mintKeyPair.publicKey,
                name: sanitizedTokenData.name,
                symbol: sanitizedTokenData.symbol,
                uri: sanitizedTokenData.imageUrl,
                additionalMetadata: []
            };

            // 9. Calculate space and lamports
            const mintLen = getMintLen([ExtensionType.MetadataPointer]);
            const metadataLen = TYPE_SIZE + LENGTH_SIZE + pack(metadata).length;
            const lamports = await connection.getMinimumBalanceForRentExemption(mintLen + metadataLen);

            // 10. Calculate associated token account address
            const associatedToken = getAssociatedTokenAddressSync(
                mintKeyPair.publicKey,
                wallet.publicKey,
                false,
                TOKEN_2022_PROGRAM_ID
            );

            // 11. Build transaction
            const freezeAuthority = sanitizedTokenData.freezeAuthority ? wallet.publicKey : null;
            const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash();
            
            const transaction = new Transaction().add(
                // Create mint account
                SystemProgram.createAccount({
                    fromPubkey: wallet.publicKey,
                    newAccountPubkey: mintKeyPair.publicKey,
                    lamports,
                    space: mintLen,
                    programId: TOKEN_2022_PROGRAM_ID
                }),
                // Initialize metadata pointer
                createInitializeMetadataPointerInstruction(
                    mintKeyPair.publicKey,
                    wallet.publicKey,
                    mintKeyPair.publicKey,
                    TOKEN_2022_PROGRAM_ID
                ),
                // Initialize mint
                createInitializeMint2Instruction(
                    mintKeyPair.publicKey,
                    sanitizedTokenData.decimals,
                    wallet.publicKey,
                    freezeAuthority,
                    TOKEN_2022_PROGRAM_ID
                ),
                // Initialize metadata
                createInitializeInstruction({
                    programId: TOKEN_2022_PROGRAM_ID,
                    mint: mintKeyPair.publicKey,
                    metadata: mintKeyPair.publicKey,
                    name: metadata.name,
                    symbol: metadata.symbol,
                    uri: metadata.uri,
                    mintAuthority: wallet.publicKey,
                    updateAuthority: wallet.publicKey,
                }),
                // Create associated token account
                createAssociatedTokenAccountInstruction(
                    wallet.publicKey,
                    associatedToken,
                    wallet.publicKey,
                    mintKeyPair.publicKey,
                    TOKEN_2022_PROGRAM_ID
                ),
                // Mint initial supply
                createMintToInstruction(
                    mintKeyPair.publicKey,
                    associatedToken,
                    wallet.publicKey,
                    Number(sanitizedTokenData.initialSupply) * Math.pow(10, sanitizedTokenData.decimals),
                    [],
                    TOKEN_2022_PROGRAM_ID
                )
            );

            transaction.feePayer = wallet.publicKey;
            transaction.recentBlockhash = blockhash;
            transaction.partialSign(mintKeyPair);

            // 12. Simulate transaction if enabled
            if (enableSimulation) {
                try {
                    // Convert to versioned transaction for simulation
                        
                    const messageV0 = new TransactionMessage({
                        payerKey: wallet.publicKey,
                        recentBlockhash: blockhash,
                        instructions: transaction.instructions,
                    }).compileToV0Message();
                    const versionedTx = new VersionedTransaction(messageV0);
                    versionedTx.sign([mintKeyPair]);
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

            // 13. Send transaction
            const sendStartTime = Date.now();
            const txId = await wallet.sendTransaction(transaction, connection);
            
            if (enableLogging) {
                log('info', 'Transaction sent', { txId, time: Date.now() - sendStartTime });
            }

            // 14. Confirm transaction with retry logic
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
                log('info', 'Token creation successful', { 
                    mintAddress: mintKeyPair.publicKey.toString(),
                    txId,
                    totalTime 
                });
            }

            // 15. Calculate actual fees (approximate)
            const actualFee = feeEstimation.estimatedFee; // Could be improved with actual fee calculation

            return {
                success: true,
                mintAddress: mintKeyPair.publicKey.toString(),
                transactionId: txId,
                estimatedFee: feeEstimation.estimatedFee,
                actualFee,
                confirmationTime: totalTime
            };

        } catch (error: any) {
            if (enableLogging) {
                log('error', 'Token creation failed', error);
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
                error.message || 'Failed to create token',
                error
            );
        }
    }, maxRetries, enableLogging).catch((error: TokenLaunchError) => {
        return {
            success: false,
            error: error.message,
            estimatedFee: 0,
            actualFee: 0,
            confirmationTime: Date.now() - startTime
        };
    });
}

/**
 * Launches a token with callbacks and production configuration
 * @param props - TokenLaunchProps containing wallet, connection, tokenData, config, and callbacks
 * @returns Promise resolving to TokenLaunchResult
 */
export async function createNewToken(
    wallet: SignerWallet,
    connection: Connection,
    tokenData: TokenLaunchData,
    config?: ProductionTokenLaunchConfig,
    onSuccess?: (mintAddress: string, txId: string) => void,
    onError?: (error: TokenLaunchError) => void,
): Promise<TokenResult> {
    const result = await buildToken(wallet, connection, tokenData, config);
    
    if (result.success && result.mintAddress && result.transactionId) {
        onSuccess?.(result.mintAddress, result.transactionId);
    } else if (!result.success && result.error) {
        const error = new TokenLaunchError(
            TokenLaunchErrorCode.TRANSACTION_FAILED,
            result.error
        );
        onError?.(error);
    }
    
    return result;
}

/**
 * Updates token image URL with enhanced validation and error handling
 * @param wallet - Connected wallet instance with update authority
 * @param connection - Solana connection instance  
 * @param mintAddress - The mint address of the token to update
 * @param newImageUrl - The new image URL
 * @param config - Optional production configuration
 * @returns Promise resolving to TokenLaunchResult
 */
export async function updateTokenImage(
    wallet: SignerWallet,
    connection: Connection,
    mintAddress: string,
    newImageUrl: string,
    config: ProductionTokenLaunchConfig = {}
): Promise<TokenLaunchResult> {
    const {
        maxRetries = 3,
        timeoutMs = 30000,
        confirmationStrategy = 'confirmed',
        enableLogging = false
    } = config;

    return await withRetry(async () => {
        try {
            // Validate wallet connection
            if (!wallet.publicKey) {
                throw new TokenLaunchError(
                    TokenLaunchErrorCode.WALLET_NOT_CONNECTED,
                    'Wallet not connected'
                );
            }

            // Validate mint address
            if (!isValidMintAddress(mintAddress)) {
                throw new TokenLaunchError(
                    TokenLaunchErrorCode.INVALID_MINT_ADDRESS,
                    'Invalid mint address format'
                );
            }

            // Validate image URL
            if (!isValidUrl(newImageUrl)) {
                throw new TokenLaunchError(
                    TokenLaunchErrorCode.INVALID_URL,
                    'Invalid image URL format'
                );
            }

            const mintPublicKey = new PublicKey(mintAddress);
            const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash();

            const transaction = new Transaction().add(
                createUpdateFieldInstruction({
                    programId: TOKEN_2022_PROGRAM_ID,
                    metadata: mintPublicKey,
                    updateAuthority: wallet.publicKey,
                    field: 'uri',
                    value: newImageUrl,
                })
            );

            transaction.feePayer = wallet.publicKey;
            transaction.recentBlockhash = blockhash;

            const txId = await wallet.sendTransaction(transaction, connection);

            // Confirm transaction
            await confirmTransactionWithRetry(
                connection,
                txId,
                blockhash,
                lastValidBlockHeight,
                confirmationStrategy,
                timeoutMs
            );

            if (enableLogging) {
                log('info', 'Token image updated successfully', { mintAddress, txId });
            }

            return {
                success: true,
                mintAddress: mintAddress,
                transactionId: txId
            };

        } catch (error: any) {
            if (enableLogging) {
                log('error', 'Failed to update token image', error);
            }

            if (error instanceof TokenLaunchError) {
                throw error;
            }

            throw new TokenLaunchError(
                TokenLaunchErrorCode.NETWORK_ERROR,
                error.message || 'Failed to update token image',
                error
            );
        }
    }, maxRetries, enableLogging).catch((error: TokenLaunchError) => {
        return {
            success: false,
            error: error.message
        };
    });
}











