import { ProductionTokenLaunchConfig } from "../token/launch";

/**
 * NFT-specific configuration extending ProductionTokenLaunchConfig
 */
export interface NFTConfig extends ProductionTokenLaunchConfig {
    // NFT-specific options
    enableFreezeAuthority?: boolean; // Default true for NFTs to prevent transfers
    royaltyBasisPoints?: number; // Future: for royalty configuration
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
