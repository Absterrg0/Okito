import { OperationConfig, OperationResult } from '../core';

/**
 * Single airdrop recipient data
 */
export interface AirdropRecipient {
    address: string; // Recipient wallet address
    amount: bigint | string | number; // Amount in human-readable format (e.g., 10.5 for tokens with decimals)
}

/**
 * Configuration for airdrop operations
 */
export interface AirdropConfig extends OperationConfig {
    createRecipientAccount?: boolean; 
}

/**
 * Result of airdrop operations
 */
export interface AirdropResult extends OperationResult {
    transactionIds?: string[];
    recipientsFailed?: number;
    batchCount?: number;
    successfulBatches?: number;
    failedBatches?: number;
    recipientsProcessed?: number;
    accountsCreated?: number;
    totalAmountSent?: string;
    successRate?: number;
}

/**
 * Fee estimation for airdrop operations
 */
export interface AirdropFeeEstimation {
    estimatedFee: number;
    breakdown: {
        transactionFees: number;
        accountCreations: number;
        priorityFees: number;
        batchCount?: number;
    };
}