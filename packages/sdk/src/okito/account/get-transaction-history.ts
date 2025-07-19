import { Connection, ParsedTransactionWithMeta, ConfirmedSignatureInfo } from "@solana/web3.js";
import { OkitoNetwork } from "../../types/config";
import { SignerWallet } from "../../types/custom-wallet-adapter";
import { TransactionHistoryOptions, TransactionHistoryResult } from "../../types/account/transaction-history";


/**
 * Fetches the transaction history for a given wallet address.
 * Enhanced version with pagination support and better error handling.
 */
export async function getTransactionHistory(
    wallet: SignerWallet,
    network: OkitoNetwork,
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
        const connection = new Connection(network, commitment);
        const address = wallet.publicKey;

        console.log(`Fetching ${limit} transactions for ${address.toString()}`);

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

        console.log(`Found ${signaturesToFetch.length} signatures, fetching parsed transactions...`);

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
                console.warn(`Failed to fetch transaction: ${signaturesToFetch[index].signature}`);
                return false;
            }
            return true;
        });

        console.log(`Successfully fetched ${transactions.length}/${signaturesToFetch.length} transactions`);

        return {
            success: true,
            transactions,
            signatures: signaturesToFetch,
            hasMore
        };

    } catch (error: any) {
        console.error('Transaction history fetch failed:', error);
        
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

// Convenience function for simple usage (maintains backward compatibility)
export async function getSimpleTransactionHistory(
    wallet: SignerWallet,
    network: OkitoNetwork,
    limit: number = 20
): Promise<{
    success: boolean;
    transactions: ParsedTransactionWithMeta[] | null;
    error?: string;
}> {
    const result = await getTransactionHistory(wallet, network, { limit });
    return {
        success: result.success,
        transactions: result.transactions,
        error: result.error
    };
}