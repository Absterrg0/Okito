import { Connection, PublicKey, ParsedTransactionWithMeta} from "@solana/web3.js";
import { TransactionHistoryOptions, TransactionHistoryResult } from "../../types/account/transaction-history";

/**
 * Fetches the transaction history for any given Solana address.
 * Enhanced version with pagination support, better error handling, and batching.
 *
 * @param connection - Solana connection instance.
 * @param address - The public key of the address (as a PublicKey object or base-58 string).
 * @param options - Configuration options for fetching transaction history.
 * @returns A promise resolving to the transaction history result.
 */
export async function getTransactions(
    connection: Connection,
    address: PublicKey | string,
    options: TransactionHistoryOptions = {}
): Promise<TransactionHistoryResult> {
    const { 
        limit = 20, 
        before, 
        until, 
        commitment = 'confirmed' 
    } = options;

    // Validate limit
    if (limit < 1 || limit > 500) {
        return {
            success: false,
            error: "Limit must be between 1 and 500"
            };
    }

    try {
        const pubkey = new PublicKey(address);

        if (process.env.NODE_ENV !== 'test') {
            console.log(`Fetching ${limit} transactions for ${pubkey.toString()}`);
        }

        // Fetch recent confirmed signatures for the address
        const signatures = await connection.getSignaturesForAddress(pubkey, {
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
        
        // --- START OF BATCHING LOGIC ---
        const BATCH_SIZE = 100;
        const signatureStrings = signaturesToFetch.map(sig => sig.signature);
        const batches: string[][] = [];

        for (let i = 0; i < signatureStrings.length; i += BATCH_SIZE) {
            batches.push(signatureStrings.slice(i, i + BATCH_SIZE));
        }

        const allParsedTxs: (ParsedTransactionWithMeta | null)[] = [];
        
        for (const batch of batches) {
            const parsedBatch = await connection.getParsedTransactions(
                batch,
                { 
                    maxSupportedTransactionVersion: 0,
                    commitment 
                }
            );
            allParsedTxs.push(...parsedBatch);
        }
        // --- END OF BATCHING LOGIC ---

        const transactions = allParsedTxs.filter((tx, index): tx is ParsedTransactionWithMeta => {
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
        
        let errorMessage = error.message || "Failed to fetch transaction history";
        
        if (errorMessage.includes('Invalid public key')) {
            errorMessage = "Invalid address provided.";
        } else if (errorMessage.includes('429') || errorMessage.includes('rate limit')) {
            errorMessage = "Rate limited. Please try again later.";
        } else if (errorMessage.includes('timeout')) {
            errorMessage = "Request timeout. Network may be slow. Try reducing the limit.";
        }

        return {
            success: false,
            error: errorMessage
        };
    }
}