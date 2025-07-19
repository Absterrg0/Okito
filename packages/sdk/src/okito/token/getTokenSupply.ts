import { Connection, PublicKey } from "@solana/web3.js";
import { getMint } from "@solana/spl-token";

/**
 * Gets the total supply of a token
 * @param connection - Solana connection instance
 * @param mintAddress - Token mint address as string
 * @returns Promise resolving to token supply information
 */
export async function getTokenSupply(
    connection: Connection,
    mintAddress: string
) {
    try {
        const mintPubkey = new PublicKey(mintAddress);
        const mintInfo = await getMint(connection, mintPubkey);
        
        return {
            success: true,
            supply: {
                amount: mintInfo.supply.toString(),
                decimals: mintInfo.decimals,
                uiAmount: Number(mintInfo.supply) / Math.pow(10, mintInfo.decimals),
                uiAmountString: (Number(mintInfo.supply) / Math.pow(10, mintInfo.decimals)).toString()
            }
        };
    } catch (error: any) {
        return {
            success: false,
            error: error.message || 'Failed to fetch token supply',
            supply: null
        };
    }
}

/**
 * Gets token supply using token symbol and network (convenience function)
 * @param connection - Solana connection instance
 * @param token - Token symbol (e.g., "USDC", "USDT")
 * @param network - Network type for getting mint address
 * @returns Promise resolving to token supply information
 */
export async function getTokenSupplyBySymbol(
    connection: Connection,
    token: string,
    network: string
) {
    try {
        const { getMintAddress } = await import("../get-mint-address");
        const mintAddress = getMintAddress(token as any, network as any);
        return await getTokenSupply(connection, mintAddress.toString());
    } catch (error: any) {
        return {
            success: false,
            error: error.message || 'Failed to fetch token supply',
            supply: null
        };
    }
}

// Legacy function for backward compatibility
export default getTokenSupply;