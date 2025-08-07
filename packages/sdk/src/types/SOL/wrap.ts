import { OperationConfig, OperationResult } from '../core';

/**
 * Configuration options for SOL wrapping operations
 */
export interface WrapSolConfig extends OperationConfig {
    createAccountIfNeeded?: boolean; // Auto-create wSOL token account if needed
}

/**
 * Result of SOL wrapping operation
 */
export interface WrapSolResult extends OperationResult {
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


export interface WrapSolParams {
    connection: any;
    wallet: any;
    amountSol: number;
    config: WrapSolConfig;
}