import { Connection } from "@solana/web3.js";
import type { SignerWallet } from "../custom-wallet-adapter";
import type { TokenLaunchError } from "../errors";
import { BaseOperationConfig } from "../../okito/core/BaseTokenOperation";

export interface TokenLaunchData {
    name: string;
    symbol: string;
    imageUrl: string; // Required for quality tokens
    initialSupply: number;
    decimals: number;
    freezeAuthority: boolean;
    description?: string; // Optional description for the token
    externalUrl?: string; // Optional website or project URL
}

export interface ProductionTokenLaunchConfig {
    maxRetries?: number;
    timeoutMs?: number;
    confirmationStrategy?: 'processed' | 'confirmed' | 'finalized';
    priorityFee?: number;
    enableSimulation?: boolean;
    enableLogging?: boolean;
}


export interface TokenLaunchProps {
    wallet: SignerWallet;
    connection: Connection; // Connection from @solana/web3.js
    tokenData: TokenLaunchData;
    config?: BaseOperationConfig;
    orgName?: string;
   
}

export interface TokenResult {
    success: boolean;
    mintAddress?: string;
    transactionId?: string;
    error?: string;
    estimatedFee?: number;
    actualFee?: number;
    confirmationTime?: number;
}

export interface ValidationResult {
    isValid: boolean;
    errors: string[];
    warnings?: string[];
}

export interface FeeEstimation {
    estimatedFee: number;
    breakdown: {
        accountCreation: number;
        metadata: number;
        mintTokens: number;
        priorityFee: number;
    };
}

