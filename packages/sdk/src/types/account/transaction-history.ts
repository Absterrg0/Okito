import { ConfirmedSignatureInfo, ParsedTransactionWithMeta } from "@solana/web3.js";

export interface TransactionHistoryOptions {
    limit?: number;
    before?: string; // signature to paginate from
    until?: string; // signature to paginate to
    commitment?: 'confirmed' | 'finalized';
}

export interface TransactionHistoryResult {
    success: boolean;
    transactions?: ParsedTransactionWithMeta[] ;
    signatures?: ConfirmedSignatureInfo[]; // Include raw signatures for pagination
    hasMore?: boolean; // Indicates if there are more transactions
    error?: string;
}
