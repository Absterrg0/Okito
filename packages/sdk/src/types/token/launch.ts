import { Connection } from "@solana/web3.js";
import type { SignerWallet } from "../custom-wallet-adapter";
import type { TokenLaunchError } from "../errors";
import { OperationConfig, OperationResult } from "../core";

export interface TokenData {
    name: string;
    symbol: string;
    imageUrl: string; // Required for quality tokens
    initialSupply: number;
    decimals: number;
    freezeAuthority: boolean;
    description?: string; // Optional description for the token
    externalUrl?: string; // Optional website or project URL
}





export interface TokenResult extends OperationResult {
    mintAddress?: string;
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

