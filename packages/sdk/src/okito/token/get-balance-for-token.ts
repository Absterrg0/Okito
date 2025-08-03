import { Connection, PublicKey } from "@solana/web3.js";
import { getAssociatedTokenAddress, getMint } from "@solana/spl-token";

import { getMintAddress } from "../get-mint-address";
/**
 * Gets the token balance for a specific wallet and mint address
 * @param connection - Solana connection instance
 * @param for - The address for which token balance is requested
 * @param mintAddress - Token mint address as string
 * @returns Promise resolving to balance information
 */
export async function getTokenBalanceByMint(
    connection: Connection,
    target: PublicKey | string,
    mintAddress: string,
) {
    try {
        const ownerPubkey = new PublicKey(target);
        const mintPubkey = new PublicKey(mintAddress);
        
        // Get the Associated Token Account (ATA) address for the owner
        const tokenAccountAddress = await getAssociatedTokenAddress(
            mintPubkey,
            ownerPubkey
        );
        
        // Check if the ATA exists
        const accountInfo = await connection.getAccountInfo(tokenAccountAddress);
        
        if (!accountInfo) {
            // If ATA doesn't exist, balance is 0.
            // Fetch mint info to return the correct decimal structure.
            const mintInfo = await getMint(connection, mintPubkey);
            return {
            
                balance: {
                        amount: "0",
                        decimals: mintInfo.decimals,
                        uiAmount: 0,
                        uiAmountString: "0"
                    
                }
            };
        }
        
        // If ATA exists, fetch the actual balance
        const balance = await connection.getTokenAccountBalance(tokenAccountAddress);
        
        return {
            balance
        };
        
    } catch (error: any) {
        console.error("Failed to fetch token balance:", error);
        return {
            success: false,
            error: error.message || 'Failed to fetch token balance',
            balance: null
        };
    }
}

/**
 * Gets token balance using token symbol and network (convenience function)
 * @param connection - Solana connection instance  
 * @param for - The address for which token balance is requested
 * @param token - Token symbol (e.g., "USDC", "USDT")
 * @param network - Network type for getting mint address
 * @returns Promise resolving to balance information
 */
export async function getTokenBalanceBySymbol(
    connection: Connection,
    target: PublicKey | string,
    tokenSymbol: string,
    network: 'mainnet-beta' | 'devnet' = 'mainnet-beta'
): Promise<{
    balance: {
        amount: string;
        decimals: number;
        uiAmount: number;
        uiAmountString: string;
    } | null;
    success: boolean;
    error?: string;
}> {
    try {
        const mintAddress = getMintAddress(tokenSymbol, network);
        if(!mintAddress){
            return {
                balance: null,
                success: false,
                error: "Mint address not found for this token symbol"
            }
        }
        const balance = await getTokenBalanceByMint(connection, target, mintAddress.toString());
        return {
            balance: balance.balance as {
                amount: string;
                decimals: number;
                uiAmount: number;
                uiAmountString: string;
            },
            success: true,
            error: undefined
        }
    } catch (error: any) {
        return {
            balance: null,
            success: false,
            error: error.message || 'Failed to fetch token balance'
        }
    }
}

