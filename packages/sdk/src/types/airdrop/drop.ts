import { BaseOperationConfig, BaseOperationResult } from '../../okito/core/BaseTokenOperation';

/**
 * Configuration options for airdrop operations
 */
export interface AirdropConfig extends BaseOperationConfig {
    createRecipientAccount?: boolean; // Auto-create recipient token account if needed
}

/**
 * Single airdrop recipient data
 */
export interface AirdropRecipient {
    address: string; // Recipient wallet address
    amount: number; // Amount in human-readable format (e.g., 10.5 for tokens with decimals)
}

/**
 * Result of airdrop operation
 */
export interface AirdropResult extends BaseOperationResult {
    recipientsProcessed?: number;
    accountsCreated?: number;
    totalAmountSent?: string;
}

/**
 * Fee estimation for airdrop operations
 */
export interface AirdropFeeEstimation {
    estimatedFee: number;
    breakdown: {
        transfers: number;
        accountCreations: number;
        priorityFee: number;
    };
}


export interface AirdropParams {
    connection: any;
    wallet: any;
    mint: string;
    recipients: AirdropRecipient[];
    config: AirdropConfig;
}