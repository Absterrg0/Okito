import { Connection, PublicKey } from "@solana/web3.js";
import { getAssociatedTokenAddress, getMint } from "@solana/spl-token";
import { getMintAddress } from "../get-mint-address";

/**
 * Gets the token balance for a specific wallet and mint address.
 * @param connection - Solana connection instance.
 * @param target - The wallet address for which the token balance is requested (PublicKey or string).
 * @param mintAddress - Token mint address as a string.
 * @returns Promise resolving to a standardized balance information object.
 */
export async function getTokenBalanceByMint(
    connection: Connection,
    target: PublicKey | string,
    mintAddress: string,
): Promise<{
    balance: {
        amount: string;
        decimals: number;
        uiAmount: number | null; // Note: The RPC can return null for uiAmount
        uiAmountString?: string;
    } | null;
    success: boolean;
    error?: string;
}> {
    try {
        const ownerPubkey = new PublicKey(target);
        const mintPubkey = new PublicKey(mintAddress);

        // Find the Associated Token Account (ATA) address for the owner.
        // allowOwnerOffCurve is a best practice for robustness.
        const tokenAccountAddress = await getAssociatedTokenAddress(
            mintPubkey,
            ownerPubkey,
            true 
        );

        // Check if the ATA exists on-chain.
        const accountInfo = await connection.getAccountInfo(tokenAccountAddress);

        // --- Success Path 1: Account does not exist (balance is 0) ---
        if (!accountInfo) {
            // Fetch mint info to return the correct decimal structure.
            const mintInfo = await getMint(connection, mintPubkey);
            return {
                success: true,
                balance: {
                    amount: "0",
                    decimals: mintInfo.decimals,
                    uiAmount: 0,
                    uiAmountString: "0"
                }
            };
        }

        // --- Success Path 2: Account exists, fetch its balance ---
        const balanceResponse = await connection.getTokenAccountBalance(tokenAccountAddress);

        // The actual balance data is inside the 'value' property of the response.
        return {
            success: true,
            balance: balanceResponse.value
        };

    } catch (error: any) {
        // --- Error Path ---
        console.error("Failed to fetch token balance:", error.message);
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
 * @param target - The address for which token balance is requested
 * @param tokenSymbol - Token symbol (e.g., "USDC", "USDT")
 * @param network - Network type for getting mint address
 * @returns Promise resolving to balance information
 */
export async function getTokenBalanceBySymbol(
    connection: Connection,
    target: PublicKey | string,
    tokenSymbol: string,
    network: 'mainnet-beta' | 'devnet' = 'mainnet-beta'
) { // The return type is inferred but will match getTokenBalanceByMint
    try {
        // Step 1: Find the mint address for the given symbol.
        const mintAddress = getMintAddress(tokenSymbol, network);

        // Step 2: Handle the case where the symbol is not found.
        if (!mintAddress) {
            return {
                success: false,
                error: `Mint address not found for symbol '${tokenSymbol}' on ${network}.`,
                balance: null,
            };
        }

        // Step 3: Call the core function and return its result directly.
        // This correctly propagates the success, balance, and error states.
        const result = await getTokenBalanceByMint(connection, target, mintAddress.toString());
        
        return result;

    } catch (error: any) {
        // Step 4: Catch any unexpected errors (e.g., network issues).
        return {
            success: false,
            error: error.message || 'An unexpected error occurred in getTokenBalanceBySymbol',
            balance: null,
        };
    }
}