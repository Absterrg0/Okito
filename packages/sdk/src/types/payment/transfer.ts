import { SignerWallet } from "../custom-wallet-adapter";
export interface TransferTokensParams {
    /** An initialized Solana Connection object. */
    connection: any; // Connection type
    /** The wallet object of the sender, conforming to the SignerWallet interface. */
    wallet: SignerWallet;
    /** The mint address of the SPL token to be transferred. */
    mint: string;
    /** The public key of the recipient's wallet. */
    destination: string;
    /**
     * The raw amount of tokens to send, in the smallest unit (lamports).
     * Use BigInt for safety with large numbers and decimals.
     * e.g., for 10.5 USDC (6 decimals), this should be 10500000n.
     */
    amount: bigint;
    /** Optional production configuration. */
    config?: ProductionTransferConfig;
    /** Optional send options for the transaction. */
    sendOptions?: any;
}

export interface ProductionTransferConfig {
    maxRetries?: number;
    timeoutMs?: number;
    confirmationStrategy?: 'processed' | 'confirmed' | 'finalized';
    priorityFee?: number;
    enableLogging?: boolean;
    enableSimulation?: boolean;
    validateBalance?: boolean;
    createDestinationATA?: boolean; // Whether to automatically create destination ATA
}

export interface TransferResult {
    success: boolean;
    transactionId?: string;
    error?: string;
    estimatedFee?: number;
    actualFee?: number;
    confirmationTime?: number;
    createdDestinationATA?: boolean;
}

export interface TransferFeeEstimation {
    estimatedFee: number;
    breakdown: {
        transfer: number;
        accountCreation: number; // For destination ATA if needed
        priorityFee: number;
    };
}