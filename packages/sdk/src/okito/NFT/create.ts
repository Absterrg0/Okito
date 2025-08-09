import { Connection } from "@solana/web3.js";
import { NFTData, NFTConfig } from "../../types/NFT/create";
import { TokenData, TokenResult } from "../../types/token/launch";
import { TokenLaunchError, TokenLaunchErrorCode } from "../../types/errors";
import { SignerWallet } from "../../types/custom-wallet-adapter";
import { log } from "../utils/logger";
import { buildToken } from "../token/launch-token";
import { validateNFTData } from "./helpers";


/**
 * Production-ready NFT creation function with comprehensive validation and error handling.
 * 
 * Creates a unique, non-fungible token with supply of 1 and 0 decimals.
 * Leverages the existing buildToken infrastructure with NFT-specific constraints.
 * 
 * @param wallet - Connected wallet instance
 * @param connection - Solana connection instance
 * @param nftData - NFT-specific configuration data
 * @param config - Production configuration options with NFT-specific settings
 * @returns Promise resolving to TokenLaunchResult with NFT details
 */
export async function createNFT(
    connection: Connection,
    wallet: SignerWallet,
    data: NFTData,
    config: NFTConfig = {}
): Promise<TokenResult> {
    const startTime = Date.now();
    
    // NFT-specific default configuration
    const nftConfig = {
        maxRetries: 3,
        timeoutMs: 60000,
        confirmationStrategy: 'confirmed' as const,
        priorityFee: 0,
        enableSimulation: true,
        enableLogging: true, // Enable logging by default for NFTs (important operations)
        validateBalance:false,
        enableFreezeAuthority: true, // Default true for NFTs
        ...config
    };

    try {
        if (nftConfig.enableLogging) {
            log('info', 'Starting NFT creation', { 
                name: data.name, 
                symbol: data.symbol,
                hasAttributes: !!data.attributes?.length
            });
        }

        // 1. Validate NFT-specific data requirements
        const nftValidation = validateNFTData(data);
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
        const tokenData: TokenData = {
            name: data.name,
            symbol: data.symbol,
            imageUrl: data.imageUrl,
            initialSupply: 1, // NFTs are unique with supply of 1
            decimals: 0, // NFTs are indivisible
            freezeAuthority: nftConfig.enableFreezeAuthority, // Often enabled for NFTs
            description: data.description,
            externalUrl: data.externalUrl
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
                name: data.name,
                symbol: data.symbol,
                hasAttributes: !!data.attributes?.length,
                totalTime: Date.now() - startTime
            });
        }

        return {
            ...result,
        };

    } catch (error: any) {
        if (nftConfig.enableLogging) {
            log('error', 'NFT creation failed', {
                error: error.message,
                name: data.name,
                symbol: data.symbol,
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
 * @deprecated Use createNFT instead
 */
async function createNFTBatch(
    wallet: SignerWallet,
    connection: Connection,
    nftDataArray: NFTData[],
    config: NFTConfig = {}
): Promise<TokenResult[]> {
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

    const results: TokenResult[] = [];
    const errors: { index: number; error: string }[] = [];

    // Process NFTs sequentially to avoid overwhelming the network
    for (let i = 0; i < nftDataArray.length; i++) {
        try {
            if (batchConfig.enableLogging) {
                log('info', `Creating NFT ${i + 1}/${nftDataArray.length}`, {
                    name: nftDataArray[i].name
                });
            }

            const result = await createNFT( connection,wallet, nftDataArray[i], {
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