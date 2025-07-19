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
    ProductionTokenLaunchConfig
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
export async function createNewToken(props: {
    wallet: SignerWallet;
    connection: Connection;
    tokenData: TokenLaunchData;
    config?: ProductionTokenLaunchConfig;
    onSuccess?: (mintAddress: string, txId: string) => void;
    onError?: (error: TokenLaunchError) => void;
}): Promise<TokenLaunchResult> {
    const result = await buildToken(props.wallet, props.connection, props.tokenData, props.config);
    
    if (result.success && result.mintAddress && result.transactionId) {
        props.onSuccess?.(result.mintAddress, result.transactionId);
    } else if (!result.success && result.error) {
        const error = new TokenLaunchError(
            TokenLaunchErrorCode.TRANSACTION_FAILED,
            result.error
        );
        props.onError?.(error);
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

/**
 * NFT-specific data interface extending TokenLaunchData with NFT constraints
 */
export interface NFTData {
    name: string;
    symbol: string;
    imageUrl: string; // Required for NFTs
    description?: string;
    externalUrl?: string;
    attributes?: Array<{
        trait_type: string;
        value: string | number;
    }>;
    collection?: {
        name: string;
        family: string;
    };
}

/**
 * NFT-specific configuration extending ProductionTokenLaunchConfig
 */
export interface NFTConfig extends ProductionTokenLaunchConfig {
    // NFT-specific options
    enableFreezeAuthority?: boolean; // Default true for NFTs to prevent transfers
    royaltyBasisPoints?: number; // Future: for royalty configuration
}

/**
 * Validates NFT-specific data requirements
 */
function validateNFTData(nftData: NFTData): { isValid: boolean; errors: string[]; warnings?: string[] } {
    const errors: string[] = [];
    const warnings: string[] = [];

    // Required fields validation
    if (!nftData.name?.trim()) {
        errors.push('NFT name is required');
    } else if (nftData.name.length > 32) {
        errors.push('NFT name must be 32 characters or less');
    }

    if (!nftData.symbol?.trim()) {
        errors.push('NFT symbol is required');
    } else if (nftData.symbol.length > 10) {
        errors.push('NFT symbol must be 10 characters or less');
    }

    if (!nftData.imageUrl?.trim()) {
        errors.push('NFT image URL is required');
    } else if (!isValidUrl(nftData.imageUrl)) {
        errors.push('Invalid NFT image URL format');
    }

    // Optional field validation
    if (nftData.description && nftData.description.length > 1000) {
        warnings.push('NFT description is quite long, consider keeping it under 1000 characters');
    }

    if (nftData.externalUrl && !isValidUrl(nftData.externalUrl)) {
        errors.push('Invalid external URL format');
    }

    // Attributes validation
    if (nftData.attributes) {
        if (nftData.attributes.length > 20) {
            warnings.push('Many attributes detected, consider keeping under 20 for better performance');
        }
        
        nftData.attributes.forEach((attr, index) => {
            if (!attr.trait_type?.trim()) {
                errors.push(`Attribute ${index + 1}: trait_type is required`);
            }
            if (attr.value === undefined || attr.value === null || attr.value === '') {
                errors.push(`Attribute ${index + 1}: value is required`);
            }
        });
    }

    return {
        isValid: errors.length === 0,
        errors,
        warnings: warnings.length > 0 ? warnings : undefined
    };
}

/**
 * Production-ready NFT creation function with comprehensive validation and error handling.
 * 
 * Creates a unique, non-fungible token with supply of 1 and 0 decimals.
 * Leverages the existing buildToken infrastructure with NFT-specific constraints.
 * 
 * @example
 * ```typescript
 * const nftData: NFTData = {
 *   name: "My Awesome NFT",
 *   symbol: "MANFT",
 *   imageUrl: "https://example.com/my-nft.png",
 *   description: "A unique digital collectible",
 *   attributes: [
 *     { trait_type: "Color", value: "Blue" },
 *     { trait_type: "Rarity", value: "Rare" }
 *   ]
 * };
 * 
 * const result = await createNFT(wallet, connection, nftData, {
 *   enableLogging: true,
 *   enableFreezeAuthority: true
 * });
 * ```
 * 
 * @param wallet - Connected wallet instance
 * @param connection - Solana connection instance
 * @param nftData - NFT-specific configuration data
 * @param config - Production configuration options with NFT-specific settings
 * @returns Promise resolving to TokenLaunchResult with NFT details
 */
export async function createNFT(
    wallet: SignerWallet,
    connection: Connection,
    nftData: NFTData,
    config: NFTConfig = {}
): Promise<TokenLaunchResult> {
    const startTime = Date.now();
    
    // NFT-specific default configuration
    const nftConfig = {
        maxRetries: 3,
        timeoutMs: 60000,
        confirmationStrategy: 'confirmed' as const,
        priorityFee: 0,
        enableSimulation: true,
        enableLogging: true, // Enable logging by default for NFTs (important operations)
        enableFreezeAuthority: true, // Default true for NFTs
        ...config
    };

    try {
        if (nftConfig.enableLogging) {
            log('info', 'Starting NFT creation', { 
                name: nftData.name, 
                symbol: nftData.symbol,
                hasAttributes: !!nftData.attributes?.length
            });
        }

        // 1. Validate NFT-specific data requirements
        const nftValidation = validateNFTData(nftData);
        if (!nftValidation.isValid) {
            throw new TokenLaunchError(
                TokenLaunchErrorCode.INVALID_TOKEN_DATA,
                `NFT validation failed: ${nftValidation.errors.join(', ')}`
            );
        }

        if (nftConfig.enableLogging && nftValidation.warnings?.length) {
            log('warn', 'NFT data warnings', nftValidation.warnings);
        }

        // 2. Transform NFT data to TokenLaunchData format with NFT constraints
        const tokenData: TokenLaunchData = {
            name: nftData.name,
            symbol: nftData.symbol,
            imageUrl: nftData.imageUrl,
            initialSupply: 1, // NFTs are unique with supply of 1
            decimals: 0, // NFTs are indivisible
            freezeAuthority: nftConfig.enableFreezeAuthority, // Often enabled for NFTs
            description: nftData.description,
            externalUrl: nftData.externalUrl
        };

        if (nftConfig.enableLogging) {
            log('info', 'NFT constraints applied', { 
                supply: tokenData.initialSupply,
                decimals: tokenData.decimals,
                freezeAuthority: tokenData.freezeAuthority
            });
        }

        // 3. Use existing buildToken function with NFT-optimized configuration
        const result = await buildToken(wallet, connection, tokenData, nftConfig);

        // 4. Enhance result with NFT-specific information
        if (result.success && nftConfig.enableLogging) {
            log('info', 'NFT created successfully', {
                mintAddress: result.mintAddress,
                transactionId: result.transactionId,
                name: nftData.name,
                symbol: nftData.symbol,
                hasAttributes: !!nftData.attributes?.length,
                totalTime: Date.now() - startTime
            });
        }

        return {
            ...result,
            // Add NFT-specific metadata to result if needed
            ...(nftData.attributes && { 
                nftAttributes: nftData.attributes,
                isNFT: true
            })
        };

    } catch (error: any) {
        if (nftConfig.enableLogging) {
            log('error', 'NFT creation failed', {
                error: error.message,
                name: nftData.name,
                symbol: nftData.symbol,
                totalTime: Date.now() - startTime
            });
        }

        // Re-throw TokenLaunchErrors as-is, wrap others
        if (error instanceof TokenLaunchError) {
            throw error;
        }

        throw new TokenLaunchError(
            TokenLaunchErrorCode.TRANSACTION_FAILED,
            `NFT creation failed: ${error.message || 'Unknown error'}`,
            error
        );
    }
}

/**
 * Batch NFT creation function for creating multiple NFTs efficiently
 * 
 * @param wallet - Connected wallet instance
 * @param connection - Solana connection instance
 * @param nftDataArray - Array of NFT configurations
 * @param config - Shared configuration for all NFTs
 * @returns Promise resolving to array of TokenLaunchResults
 */
export async function createNFTBatch(
    wallet: SignerWallet,
    connection: Connection,
    nftDataArray: NFTData[],
    config: NFTConfig = {}
): Promise<TokenLaunchResult[]> {
    const batchConfig = {
        enableLogging: true,
        maxRetries: 2, // Slightly lower for batch to avoid long waits
        ...config
    };

    if (batchConfig.enableLogging) {
        log('info', 'Starting batch NFT creation', { 
            count: nftDataArray.length
        });
    }

    const results: TokenLaunchResult[] = [];
    const errors: { index: number; error: string }[] = [];

    // Process NFTs sequentially to avoid overwhelming the network
    for (let i = 0; i < nftDataArray.length; i++) {
        try {
            if (batchConfig.enableLogging) {
                log('info', `Creating NFT ${i + 1}/${nftDataArray.length}`, {
                    name: nftDataArray[i].name
                });
            }

            const result = await createNFT(wallet, connection, nftDataArray[i], {
                ...batchConfig,
                enableLogging: false // Disable individual logging to reduce noise
            });
            
            results.push(result);

            // Add small delay between NFTs to be respectful to RPC
            if (i < nftDataArray.length - 1) {
                await new Promise(resolve => setTimeout(resolve, 1000));
            }

        } catch (error: any) {
            const errorMsg = error.message || 'Unknown error';
            errors.push({ index: i, error: errorMsg });
            
            // Add failed result to maintain array consistency
            results.push({
                success: false,
                error: errorMsg,
                estimatedFee: 0,
                actualFee: 0,
                confirmationTime: 0
            });

            if (batchConfig.enableLogging) {
                log('error', `Failed to create NFT ${i + 1}`, {
                    name: nftDataArray[i].name,
                    error: errorMsg
                });
            }
        }
    }

    if (batchConfig.enableLogging) {
        const successCount = results.filter(r => r.success).length;
        log('info', 'Batch NFT creation completed', {
            total: nftDataArray.length,
            successful: successCount,
            failed: errors.length
        });

        if (errors.length > 0) {
            log('warn', 'Some NFTs failed to create', errors);
        }
    }

    return results;
}





