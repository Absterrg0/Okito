import { Connection, ParsedTransactionWithMeta, ConfirmedSignatureInfo, Commitment } from "@solana/web3.js";
import { SignerWallet } from "../../types/custom-wallet-adapter";
import { TransactionHistoryOptions, TransactionHistoryResult } from "../../types/account/transaction-history";

/**
 * Fetches the transaction history for a given wallet address.
 * Enhanced version with pagination support and better error handling.
 * 
 * @param connection - Solana connection instance
 * @param wallet - SignerWallet instance
 * @param options - Configuration options for fetching transaction history
 * @returns Promise resolving to transaction history result
 */
export async function getTransactionHistory(
    connection: Connection,
    wallet: SignerWallet,
    options: TransactionHistoryOptions = {}
): Promise<TransactionHistoryResult> {
    const { 
        limit = 20, 
        before, 
        until, 
        commitment = 'confirmed' 
    } = options;

    if (!wallet.publicKey) {
        return {
            success: false,
            transactions: null,
            error: "Wallet not connected"
        };
    }

    // Validate limit
    if (limit < 1 || limit > 1000) {
        return {
            success: false,
            transactions: null,
            error: "Limit must be between 1 and 1000"
        };
    }

    try {
        const address = wallet.publicKey;

        if (process.env.NODE_ENV !== 'test') {
            console.log(`Fetching ${limit} transactions for ${address.toString()}`);
        }

        // Fetch recent confirmed signatures for the address
        const signatures = await connection.getSignaturesForAddress(address, {
            limit: limit + 1, // Fetch one extra to check if there are more
            before,
            until
        });

        if (!signatures.length) {
            return {
                success: true,
                transactions: [],
                signatures: [],
                hasMore: false
            };
        }

        // Check if there are more transactions available
        const hasMore = signatures.length > limit;
        const signaturesToFetch = hasMore ? signatures.slice(0, limit) : signatures;

        if (process.env.NODE_ENV !== 'test') {
            console.log(`Found ${signaturesToFetch.length} signatures, fetching parsed transactions...`);
        }

        // Fetch parsed transactions for each signature
        const parsedTxs: (ParsedTransactionWithMeta | null)[] = await connection.getParsedTransactions(
            signaturesToFetch.map(sig => sig.signature),
            { 
                maxSupportedTransactionVersion: 0,
                commitment 
            }
        );

        // Filter out nulls and log any failed fetches
        const transactions = parsedTxs.filter((tx, index): tx is ParsedTransactionWithMeta => {
            if (!tx) {
                if (process.env.NODE_ENV !== 'test') {
                    console.warn(`Failed to fetch transaction: ${signaturesToFetch[index].signature}`);
                }
                return false;
            }
            return true;
        });

        if (process.env.NODE_ENV !== 'test') {
            console.log(`Successfully fetched ${transactions.length}/${signaturesToFetch.length} transactions`);
        }

        return {
            success: true,
            transactions,
            signatures: signaturesToFetch,
            hasMore
        };

    } catch (error: any) {
        if (process.env.NODE_ENV !== 'test') {
            console.error('Transaction history fetch failed:', error);
        }
        
        // Handle specific error types
        if (error.message?.includes('429') || error.message?.includes('rate limit')) {
            return {
                success: false,
                transactions: null,
                error: "Rate limited. Please try again later."
            };
        }

        if (error.message?.includes('timeout')) {
            return {
                success: false,
                transactions: null,
                error: "Request timeout. Network may be slow."
            };
        }

        return {
            success: false,
            transactions: null,
            error: error.message || "Failed to fetch transaction history"
        };
    }
}

/**
 * Convenience function for simple usage (maintains backward compatibility)
 * @param connection - Solana connection instance
 * @param wallet - SignerWallet instance
 * @param limit - Number of transactions to fetch (default: 20)
 * @returns Promise resolving to simplified transaction history result
 */
export async function getSimpleTransactionHistory(
    connection: Connection,
    wallet: SignerWallet,
    limit: number = 20
): Promise<{
    success: boolean;
    transactions: ParsedTransactionWithMeta[] | null;
    error?: string;
}> {
    const result = await getTransactionHistory(connection, wallet, { limit });
    return {
        success: result.success,
        transactions: result.transactions,
        error: result.error
    };
}
