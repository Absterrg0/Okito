import { BaseOperationConfig, BaseOperationResult } from '../../okito/core/BaseTokenOperation';

/**
 * Configuration options for SOL wrapping operations
 */
export interface WrapSolConfig extends BaseOperationConfig {
    createAccountIfNeeded?: boolean; // Auto-create wSOL token account if needed
}

/**
 * Result of SOL wrapping operation
 */
export interface WrapSolResult extends BaseOperationResult {
    tokenAccount?: string;
    createdTokenAccount?: boolean;
}

/**
 * Fee estimation for SOL wrapping operations
 */
export interface WrapSolFeeEstimation {
    estimatedFee: number;
    breakdown: {
        transfer: number;
        accountCreation: number;
        sync: number;
        priorityFee: number;
    };
}