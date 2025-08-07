import { OperationConfig, OperationResult } from "../core";



export interface BurnTokenConfig extends OperationConfig{
    mint: string;
    amount: bigint | string | number;
}



export interface BurnTokenResult extends OperationResult{
    burnedAmount?: number;
    decimals?: number;
    newBalance?: number;
    totalTime?: number;
}


