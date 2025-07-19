import { Connection, PublicKey } from "@solana/web3.js";
import { getAssociatedTokenAddress, getMint } from "@solana/spl-token";
import { SignerWallet } from "../../types/custom-wallet-adapter";

/**
 * Gets the token balance for a specific wallet and mint address
 * @param connection - Solana connection instance
 * @param wallet - SignerWallet instance
 * @param mintAddress - Token mint address as string
 * @returns Promise resolving to balance information
 */
export async function getTokenBalance(
    connection: Connection,
    wallet: SignerWallet,
    mintAddress: string
) {
    if (!wallet.publicKey) {
        return {
            success: false,
            error: 'Wallet not connected',
            balance: null
        };
    }

    try {
        const mintPubkey = new PublicKey(mintAddress);
        
        // Get the Associated Token Account address
        const tokenAccountAddress = await getAssociatedTokenAddress(
            mintPubkey,
            wallet.publicKey
        );
        
        // Check if the token account exists first
        const accountInfo = await connection.getAccountInfo(tokenAccountAddress);
        
        if (!accountInfo) {
            // Token account doesn't exist, balance is 0
            // Get mint info to provide correct decimals
            const mintInfo = await getMint(connection, mintPubkey);
            return {
                success: true,
                balance: {
                    value: {
                        amount: "0",
                        decimals: mintInfo.decimals,
                        uiAmount: 0,
                        uiAmountString: "0"
                    }
                }
            };
        }
        
        // Get the actual balance
        const balance = await connection.getTokenAccountBalance(tokenAccountAddress);
        
        return {
            success: true,
            balance
        };
        
    } catch (error: any) {
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
 * @param wallet - SignerWallet instance
 * @param token - Token symbol (e.g., "USDC", "USDT")
 * @param network - Network type for getting mint address
 * @returns Promise resolving to balance information
 */
export async function getTokenBalanceBySymbol(
    connection: Connection,
    wallet: SignerWallet, 
    token: string, 
    network: string
) {
    try {
        const { getMintAddress } = await import("../get-mint-address");
        const mintAddress = getMintAddress(token as any, network as any);
        return await getTokenBalance(connection, wallet, mintAddress.toString());
    } catch (error: any) {
        return {
            success: false,
            error: error.message || 'Failed to fetch token balance',
            balance: null
        };
    }
}

// Legacy function for backward compatibility
export const getBalanceForTokenSafe = getTokenBalanceBySymbol;