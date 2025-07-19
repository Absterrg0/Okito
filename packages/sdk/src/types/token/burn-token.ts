


export interface BurnTokenConfig{
    maxRetries?: number;
    timeoutMs?: number;
    confirmationStrategy?: 'processed' | 'confirmed' | 'finalized';
    enableSimulation?: boolean;
    enableLogging?: boolean;    

}



export interface BurnTokenResult{
    success: boolean;
    transactionId?: string;
    error?: string;
    estimatedFee?: number;
    confirmationTime?: number;
}



export interface BurnTokenParams {
    connection: any;
    wallet: any;
    mint: string;
    amount: number;
    config: BurnTokenConfig;
}