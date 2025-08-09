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
    TokenData, 
    TokenResult, 
    FeeEstimation,
} from '../../types/token/launch';
import { TokenLaunchError, TokenLaunchErrorCode } from '../../types/errors';
import type { SignerWallet } from '../../types/custom-wallet-adapter';
import { sanitizeText } from '../utils/sanitizers';
import { validateProductionTokenData } from './helpers';
import { withRetry, checkConnectionHealth, confirmTransactionWithRetry } from '../utils/connection';
import { logger, generateOperationId, createTimer, OperationLogger } from '../utils/logger';
import { ErrorFactory } from '../../types/errors';
import { estimateTokenCreationFee } from './helpers';
import { isValidMintAddress, isValidUrl } from '../utils/sanitizers';
import { OperationConfig, OperationResult } from '../../types/core';




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
    tokenData: TokenData,
    config: OperationConfig = {}
): Promise<TokenResult> {
    const operationId = generateOperationId();
    const timer = createTimer();
    const startTime = Date.now();
    
    // Default configuration with production settings
    const {
        maxRetries = 3,
        timeoutMs = 120000, // Increased to 2 minutes for complex operations
        confirmationStrategy = 'confirmed',
        priorityFee = 0,
        enableSimulation = true,
        enableLogging = true, // Default to true for production monitoring
    } = config;

    // Configure logger for this operation
    const operationLogger = logger.child(operationId, {
        operation: 'token_creation',
        tokenName: tokenData.name,
        tokenSymbol: tokenData.symbol,
        walletAddress: wallet.publicKey?.toString().slice(0, 8) + '...'
    });

    return await withRetry(async () => {
        try {
            operationLogger.info('Starting token creation', { 
                name: tokenData.name, 
                symbol: tokenData.symbol,
                decimals: tokenData.decimals,
                initialSupply: tokenData.initialSupply?.toString()
            });

            // 1. Performance tracking setup
            const stageTimers = {
                validation: createTimer(),
                preparation: createTimer(),
                simulation: createTimer(),
                transaction: createTimer(),
                confirmation: createTimer()
            };

            // 2. Validate wallet connection
            stageTimers.validation = createTimer();
            operationLogger.debug('Validating wallet connection');
            
            if (!wallet.publicKey) {
                throw ErrorFactory.walletNotConnected({
                    operationId,
                    additionalData: { stage: 'wallet_validation' }
                });
            }

            // 3. Check connection health with detailed monitoring
            operationLogger.debug('Checking network connection health');
            const connectionHealthStart = Date.now();
            const isHealthy = await checkConnectionHealth(connection);
            const connectionHealthTime = Date.now() - connectionHealthStart;
            
            operationLogger.debug('Connection health check completed', {
                healthy: isHealthy,
                responseTime: connectionHealthTime
            });

            if (!isHealthy) {
                throw ErrorFactory.networkError(
                    new Error('Network connection is unhealthy'), 
                    { 
                        operationId,
                        additionalData: { 
                            stage: 'connection_health',
                            responseTime: connectionHealthTime
                        }
                    }
                );
            }

            // 4. Enhanced validation with detailed error reporting
            operationLogger.debug('Validating token data');
            const validation = validateProductionTokenData(tokenData);
            if (!validation.isValid) {
                operationLogger.error('Token data validation failed', undefined, {
                    errors: validation.errors,
                    warnings: validation.warnings
                });
                throw ErrorFactory.invalidTokenData('validation', validation.errors.join(', '), {
                    operationId,
                    additionalData: { 
                        errors: validation.errors,
                        warnings: validation.warnings
                    }
                });
            }

            if (validation.warnings?.length) {
                operationLogger.warn('Token data validation warnings', { warnings: validation.warnings });
            }

            const validationTime = stageTimers.validation.end();

            // 5. Prepare and sanitize data
            stageTimers.preparation = createTimer();
            operationLogger.debug('Preparing and sanitizing token data');
            
            const sanitizedTokenData = {
                ...tokenData,
                name: sanitizeText(tokenData.name, { maxLength: 32 }),
                symbol: sanitizeText(tokenData.symbol, { maxLength: 10 }).toUpperCase(),
                description: tokenData.description ? sanitizeText(tokenData.description, { maxLength: 500 }) : undefined
            };

            operationLogger.info('Token data sanitized', {
                originalName: tokenData.name,
                sanitizedName: sanitizedTokenData.name,
                originalSymbol: tokenData.symbol,
                sanitizedSymbol: sanitizedTokenData.symbol
            });

            // 6. Enhanced fee estimation with fallback strategies
            operationLogger.debug('Estimating transaction fees');
            let feeEstimation: FeeEstimation;
            const feeEstimationStart = Date.now();
            
            try {
                feeEstimation = await estimateTokenCreationFee(connection, sanitizedTokenData, priorityFee);
                operationLogger.info('Fee estimation successful', {
                    estimatedFee: feeEstimation.estimatedFee,
                    breakdown: feeEstimation.breakdown,
                    estimationTime: Date.now() - feeEstimationStart
                });
            } catch (error: any) {
                operationLogger.warn('Fee estimation failed, using conservative fallback', {
                    error: error.message,
                    estimationTime: Date.now() - feeEstimationStart
                });
                
                // Conservative fallback with higher estimates for safety
                feeEstimation = {
                    estimatedFee: 0.015 * 1e9, // Increased from 0.01 to 0.015 SOL
                    breakdown: { 
                        accountCreation: 0.01 * 1e9, 
                        metadata: 0.003 * 1e9, 
                        mintTokens: 0.002 * 1e9, 
                        priorityFee: priorityFee || 0 
                    }
                };
            }

            // 7. Enhanced balance validation with detailed feedback
            operationLogger.debug('Checking wallet balance');
            const balanceCheckStart = Date.now();
            const balance = await connection.getBalance(wallet.publicKey);
            const balanceCheckTime = Date.now() - balanceCheckStart;
            
            operationLogger.debug('Balance check completed', {
                balance: balance / 1e9,
                required: feeEstimation.estimatedFee / 1e9,
                sufficient: balance >= feeEstimation.estimatedFee,
                checkTime: balanceCheckTime
            });

            if (balance < feeEstimation.estimatedFee) {
                throw ErrorFactory.insufficientFunds(feeEstimation.estimatedFee, balance, {
                    operationId,
                    additionalData: {
                        stage: 'balance_check',
                        requiredSOL: feeEstimation.estimatedFee / 1e9,
                        availableSOL: balance / 1e9,
                        shortfallSOL: (feeEstimation.estimatedFee - balance) / 1e9
                    }
                });
            }

            const preparationTime = stageTimers.preparation.end();

            // 8. Generate secure mint keypair
            operationLogger.debug('Generating mint keypair');
            const mintKeyPair = Keypair.generate();
            
            operationLogger.info('Mint address generated', {
                mintAddress: mintKeyPair.publicKey.toString()
            });

            // 9. Prepare comprehensive metadata with validation
            operationLogger.debug('Preparing token metadata');
            const metadata: TokenMetadata = {
                updateAuthority: wallet.publicKey,
                mint: mintKeyPair.publicKey,
                name: sanitizedTokenData.name,
                symbol: sanitizedTokenData.symbol,
                uri: sanitizedTokenData.imageUrl || '',
                additionalMetadata: []
            };

            // 10. Calculate precise space requirements and rent exemption
            operationLogger.debug('Calculating account space and rent requirements');
            const spaceCalculationStart = Date.now();
            
            const mintLen = getMintLen([ExtensionType.MetadataPointer]);
            const metadataLen = TYPE_SIZE + LENGTH_SIZE + pack(metadata).length;
            const totalSpace = mintLen + metadataLen;
            const lamports = await connection.getMinimumBalanceForRentExemption(totalSpace);
            
            const spaceCalculationTime = Date.now() - spaceCalculationStart;
            
            operationLogger.debug('Space calculation completed', {
                mintLen,
                metadataLen,
                totalSpace,
                lamports,
                calculationTime: spaceCalculationTime
            });

            // 11. Generate associated token account address
            operationLogger.debug('Computing associated token account address');
            const associatedToken = getAssociatedTokenAddressSync(
                mintKeyPair.publicKey,
                wallet.publicKey,
                false,
                TOKEN_2022_PROGRAM_ID
            );
            
            operationLogger.debug('Associated token account computed', {
                associatedTokenAccount: associatedToken.toString()
            });

            // 12. Build comprehensive transaction with detailed logging
            operationLogger.debug('Building transaction');
            const transactionBuildStart = Date.now();
            
            const freezeAuthority = sanitizedTokenData.freezeAuthority ? wallet.publicKey : null;
            
            // Get fresh blockhash with retry logic
            let blockhash: string;
            let lastValidBlockHeight: number;
            try {
                const blockhashResult = await connection.getLatestBlockhash('confirmed');
                blockhash = blockhashResult.blockhash;
                lastValidBlockHeight = blockhashResult.lastValidBlockHeight;
                
                operationLogger.debug('Blockhash obtained', {
                    blockhash: blockhash.slice(0, 8) + '...',
                    lastValidBlockHeight
                });
            } catch (error: any) {
                operationLogger.error('Failed to get latest blockhash', error);
                throw ErrorFactory.networkError(error, {
                    operationId,
                    additionalData: { stage: 'blockhash_fetch' }
                });
            }

            // Calculate safe initial supply amount with overflow protection
            const initialSupplyAmount = (() => {
                try {
                    const supply = BigInt(sanitizedTokenData.initialSupply);
                    const decimalsMultiplier = BigInt(Math.pow(10, sanitizedTokenData.decimals));
                    const result = supply * decimalsMultiplier;
                    
                    // Check for reasonable bounds (less than u64 max)
                    if (result > BigInt('18446744073709551615')) {
                        throw new Error('Initial supply too large');
                    }
                    
                    return result;
                } catch (error) {
                    operationLogger.error('Initial supply calculation error', error);
                    throw ErrorFactory.invalidTokenData('initialSupply', 'Initial supply amount is too large or invalid', {
                        operationId,
                        additionalData: { 
                            requestedSupply: sanitizedTokenData.initialSupply,
                            decimals: sanitizedTokenData.decimals
                        }
                    });
                }
            })();

            operationLogger.debug('Initial supply calculated', {
                requestedSupply: sanitizedTokenData.initialSupply.toString(),
                decimals: sanitizedTokenData.decimals,
                finalAmount: initialSupplyAmount.toString()
            });
            
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
                // Mint initial supply with calculated amount
                createMintToInstruction(
                    mintKeyPair.publicKey,
                    associatedToken,
                    wallet.publicKey,
                    initialSupplyAmount,
                    [],
                    TOKEN_2022_PROGRAM_ID
                )
            );

            transaction.feePayer = wallet.publicKey;
            transaction.recentBlockhash = blockhash;
            transaction.partialSign(mintKeyPair);
            
            const transactionBuildTime = Date.now() - transactionBuildStart;
            operationLogger.debug('Transaction built successfully', {
                instructionCount: transaction.instructions.length,
                buildTime: transactionBuildTime,
                freezeAuthority: freezeAuthority?.toString() || 'none'
            });

            // 13. Enhanced transaction simulation with detailed analysis
            if (enableSimulation) {
                stageTimers.simulation = createTimer();
                operationLogger.debug('Starting transaction simulation');
                
                try {
                    const messageV0 = new TransactionMessage({
                        payerKey: wallet.publicKey,
                        recentBlockhash: blockhash,
                        instructions: transaction.instructions,
                    }).compileToV0Message();
                    
                    const versionedTx = new VersionedTransaction(messageV0);
                    versionedTx.sign([mintKeyPair]);
                    
                    const simulationStart = Date.now();
                    const simulation = await connection.simulateTransaction(versionedTx, {
                        replaceRecentBlockhash: true,
                        commitment: 'processed'
                    });
                    const simulationTime = Date.now() - simulationStart;
                    
                    if (simulation.value.err) {
                        operationLogger.error('Transaction simulation failed', simulation.value.err, {
                            simulationTime,
                            accounts: simulation.value.accounts,
                            logs: simulation.value.logs?.slice(0, 5) // First 5 logs
                        });
                        
                        throw new TokenLaunchError(
                            TokenLaunchErrorCode.SIMULATION_FAILED,
                            'Transaction simulation failed',
                            simulation.value.err,
                            {
                                operationId,
                                additionalData: {
                                    stage: 'simulation',
                                    simulationTime,
                                    logs: simulation.value.logs
                                }
                            }
                        );
                    }
                    
                    const simulationTimeTotal = stageTimers.simulation.end();
                    operationLogger.info('Transaction simulation successful', {
                        computeUnitsConsumed: simulation.value.unitsConsumed,
                        simulationTime: simulationTimeTotal,
                        accounts: simulation.value.accounts?.length || 0,
                        logs: simulation.value.logs?.length || 0
                    });
                    
                } catch (simError: any) {
                    if (simError instanceof TokenLaunchError) {
                        throw simError;
                    }
                    
                    const simulationTimeTotal = stageTimers.simulation.end();
                    operationLogger.warn('Transaction simulation failed, proceeding anyway', {
                        error: simError.message,
                        simulationTime: simulationTimeTotal,
                        code: simError.code
                    });
                }
            }

            // 14. Enhanced transaction sending with monitoring
            stageTimers.transaction = createTimer();
            operationLogger.info('Sending transaction to network');
            
            let txId: string;
            try {
                const sendStartTime = Date.now();
                txId = await wallet.sendTransaction(transaction, connection);
                const sendTime = Date.now() - sendStartTime;
                
                operationLogger.info('Transaction sent successfully', { 
                    transactionId: txId,
                    sendTime,
                    instructionCount: transaction.instructions.length
                });
            } catch (sendError: any) {
                const sendTime = stageTimers.transaction.end();
                operationLogger.error('Failed to send transaction', sendError, { sendTime });
                
                throw ErrorFactory.transactionFailed(undefined, sendError, {
                    operationId,
                    additionalData: {
                        stage: 'transaction_send',
                        sendTime,
                        instructionCount: transaction.instructions.length
                    }
                });
            }

            // 15. Enhanced transaction confirmation with monitoring
            stageTimers.confirmation = createTimer();
            operationLogger.info('Confirming transaction', {
                transactionId: txId,
                strategy: confirmationStrategy,
                timeout: timeoutMs
            });
            
            try {
                await confirmTransactionWithRetry(
                    connection,
                    txId,
                    blockhash,
                    lastValidBlockHeight,
                    confirmationStrategy,
                    timeoutMs
                );
                
                const confirmationTime = stageTimers.confirmation.end();
                operationLogger.info('Transaction confirmed successfully', {
                    transactionId: txId,
                    confirmationTime,
                    strategy: confirmationStrategy
                });
            } catch (confirmError: any) {
                const confirmationTime = stageTimers.confirmation.end();
                operationLogger.error('Transaction confirmation failed', confirmError, {
                    transactionId: txId,
                    confirmationTime,
                    strategy: confirmationStrategy
                });
                throw confirmError;
            }

            // 16. Calculate precise actual fees
            operationLogger.debug('Calculating actual transaction fees');
            let actualFee = feeEstimation.estimatedFee;
            const feeCalculationStart = Date.now();
            
            try {
                const messageV0 = new TransactionMessage({
                    payerKey: wallet.publicKey,
                    recentBlockhash: blockhash,
                    instructions: transaction.instructions,
                }).compileToV0Message();
                
                const feeResult = await connection.getFeeForMessage(messageV0, 'confirmed');
                actualFee = feeResult.value ?? feeEstimation.estimatedFee;
                
                operationLogger.debug('Actual fee calculated', {
                    estimatedFee: feeEstimation.estimatedFee,
                    actualFee,
                    calculationTime: Date.now() - feeCalculationStart
                });
            } catch (feeError: any) {
                operationLogger.warn('Failed to fetch actual fee, using estimated fee', {
                    error: feeError.message,
                    calculationTime: Date.now() - feeCalculationStart
                });
                actualFee = feeEstimation.estimatedFee;
            }

            // 17. Build comprehensive result with metrics
            const totalTime = timer.end();
            const transactionTime = stageTimers.transaction.end();
            
            const result: TokenResult = {
                success: true,
                mintAddress: mintKeyPair.publicKey.toString(),
                transactionId: txId,
                estimatedFee: feeEstimation.estimatedFee,
                actualFee,
                confirmationTime: totalTime,
                
                // Enhanced result data (will be added to interface later)
                // operationId,
                // metrics: enableMetrics ? {
                //     validationTime,
                //     preparationTime,
                //     simulationTime: enableSimulation ? stageTimers.simulation.end() : undefined,
                //     sendTime: transactionTime,
                //     confirmationTime: stageTimers.confirmation.end(),
                //     totalTime,
                //     retryCount: 0, // Will be updated by withRetry if needed
                //     networkLatency: connectionHealthTime + balanceCheckTime
                // } : undefined,
                
                // Network and transaction info
                // networkInfo: {
                //     blockhash: blockhash.slice(0, 8) + '...',
                //     blockHeight: lastValidBlockHeight
                // }
            };

            operationLogger.info('Token creation completed successfully', {
                mintAddress: mintKeyPair.publicKey.toString(),
                transactionId: txId,
                totalTime,
                actualFee: actualFee / 1e9,
                success: true
            });

            return result;

        } catch (error: any) {
            const totalTime = timer.end();
            
            operationLogger.error('Token creation failed', error, {
                totalTime,
                stage: 'unknown'
            });

            // Enhanced error handling with detailed context
            let tokenError: TokenLaunchError;
            
            if (error instanceof TokenLaunchError) {
                tokenError = error;
            } else if (error.message?.includes('insufficient funds')) {
                tokenError = ErrorFactory.insufficientFunds(0, 0, {
                    operationId,
                    additionalData: { stage: 'execution', totalTime }
                });
            } else if (error.message?.includes('429') || error.message?.includes('rate limit')) {
                tokenError = ErrorFactory.rateLimited(undefined, {
                    operationId,
                    additionalData: { stage: 'execution', totalTime }
                });
            } else {
                tokenError = ErrorFactory.networkError(error, {
                    operationId,
                    additionalData: { 
                        stage: 'execution', 
                        totalTime,
                        originalMessage: error.message
                    }
                });
            }

            operationLogger.error('Error classified and will be thrown', undefined, {
                code: tokenError.code,
                severity: tokenError.severity,
                isRetryable: tokenError.isRetryable,
                totalTime
            });

            throw tokenError;
        }
    }, maxRetries, enableLogging, {
        baseDelay: 2000,
        maxDelay: 10000,
        jitter: true
    }).catch((error: TokenLaunchError) => {
        const totalTime = Date.now() - startTime;
        
        return {
            success: false,
            error: error.message,
            estimatedFee: 0,
            actualFee: 0,
            confirmationTime: totalTime
            // Enhanced error details will be added to interface later
            // operationId,
            // errorDetails: {
            //     code: error.code,
            //     severity: error.severity,
            //     category: error.category,
            //     isRetryable: error.isRetryable,
            //     recoverySuggestions: error.recoverySuggestions
            // }
        } as TokenResult;
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
    tokenData: TokenData,
    config?: OperationConfig,
): Promise<TokenResult> {
    return await buildToken(wallet, connection, tokenData, config);
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
    config: OperationConfig = {}
): Promise<TokenResult> {
    const {
        maxRetries = 3,
        timeoutMs = 30000,
        confirmationStrategy = 'confirmed',
        enableLogging = true,
        logLevel = 'info'
    } = config;

    const operationId = generateOperationId();
    const operationLogger = logger.child(operationId, {
        operation: 'update_token_image',
        mint: mintAddress,
    });

    return await withRetry(async () => {
        try {
            // Validate wallet connection
            if (!wallet.publicKey) {
                throw ErrorFactory.walletNotConnected({ operationId });
            }

            // Validate mint address
            if (!isValidMintAddress(mintAddress)) {
                throw ErrorFactory.invalidTokenData('mint', 'Invalid mint address format', { operationId });
            }

            // Validate image URL
            if (!isValidUrl(newImageUrl)) {
                throw ErrorFactory.invalidTokenData('uri', 'Invalid image URL', { operationId });
            }

            const mintPublicKey = new PublicKey(mintAddress);
            const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash('confirmed');

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
                operationLogger.info('Token image updated', { txId });
            }

            return {
                success: true,
                mintAddress: mintAddress,
                transactionId: txId
            };

        } catch (error: any) {
            if (enableLogging) {
                operationLogger.error('updateTokenImage failed', error);
            }

            if (error instanceof TokenLaunchError) {
                throw error;
            }

            throw ErrorFactory.networkError(error, { operationId, additionalData: { stage: 'update_token_image' } });
        }
    }, maxRetries, enableLogging).catch((error: TokenLaunchError) => {
        return {
            success: false,
            error: error.message
        };
    });
}











