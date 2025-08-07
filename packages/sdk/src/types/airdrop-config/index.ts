import { OperationConfig, OperationResult } from "../core";
import { AirdropRecipient } from "./recipient";

export interface AirdropConfig extends OperationConfig {
    createRecipientAccount?: boolean; 
}







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


export interface AirdropParams {
    connection: any;
    wallet: any;
    mint: string;
    recipients: AirdropRecipient[];
    config?: AirdropConfig;
}   
