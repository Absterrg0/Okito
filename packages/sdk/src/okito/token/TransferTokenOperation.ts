import {
    createTransferInstruction,
    createAssociatedTokenAccountInstruction,
    getAssociatedTokenAddress,
    getAccount,
} from '@solana/spl-token';
import { PublicKey } from '@solana/web3.js';
import { BaseTokenOperation, ValidationResult, FeeEstimation } from '../core/BaseTokenOperation';
import type { TransferTokensParams, TransferResult } from '../../types/token/transfer';

interface TransferOperationData {
    mintInfo: any;
    senderTokenAccount: any;
    destinationPubkey: PublicKey;
    senderAta: PublicKey;
    destinationAta: PublicKey;
    needsDestinationATA: boolean;
}

/**
 * Specialized transfer operation class that extends BaseTokenOperation
 */
export class TransferTokenOperation extends BaseTokenOperation<any, TransferResult> {
    private mint: string;
    private destination: string;
    private amount: bigint;

    constructor(params: TransferTokensParams) {
        super(params.connection, params.wallet, params.config || {});
        this.mint = params.mint;
        this.destination = params.destination;
        this.amount = params.amount;
    }

    protected getOperationName(): string {
        return 'Token Transfer';
    }

    protected async validateParameters(): Promise<ValidationResult> {
        const errors: string[] = [];
        const warnings: string[] = [];

        // Validate mint address
        try {
            this.validatePublicKey(this.mint, 'mint');
        } catch (error: any) {
            errors.push(error.message);
        }

        // Validate destination address
        try {
            this.validatePublicKey(this.destination, 'destination');
        } catch (error: any) {
            errors.push(error.message);
        }

        // Validate amount
        if (this.amount <= 0) {
            errors.push('Transfer amount must be greater than zero');
        }

        return {
            isValid: errors.length === 0,
            errors,
            warnings: warnings.length > 0 ? warnings : undefined
        };
    }

    protected async prepareOperationData(): Promise<TransferOperationData> {
        // Get mint info
        const mintInfo = await this.getMintInfo(this.mint);
        
        // Convert addresses to PublicKey objects
        const mintPubkey = new PublicKey(this.mint);
        const destinationPubkey = new PublicKey(this.destination);
        const sender = this.wallet.publicKey!;

        // Get Associated Token Accounts
        const senderAta = await getAssociatedTokenAddress(mintPubkey, sender);
        const destinationAta = await getAssociatedTokenAddress(mintPubkey, destinationPubkey);

        // Check sender's token account and balance
        const senderTokenAccount = await this.getTokenAccount(this.mint, sender);

        // Validate sufficient balance
        if (senderTokenAccount.amount < this.amount) {
            throw new Error(`Insufficient token balance. Required: ${this.amount}, Available: ${senderTokenAccount.amount}`);
        }

        // Check if destination ATA exists
        let needsDestinationATA = false;
        try {
            await getAccount(this.connection, destinationAta);
        } catch (error) {
            needsDestinationATA = true;
            if (!this.config.createDestinationATA) {
                throw new Error('Destination token account does not exist and auto-creation is disabled');
            }
        }

        return {
            mintInfo,
            senderTokenAccount,
            destinationPubkey,
            senderAta,
            destinationAta,
            needsDestinationATA
        };
    }

    protected async estimateFees(operationData: TransferOperationData): Promise<FeeEstimation> {
        const transferFee = 5000; // ~0.000005 SOL for transfer instruction
        
        let accountCreationFee = 0;
        if (operationData.needsDestinationATA) {
            // Standard ATA rent exemption
            accountCreationFee = await this.connection.getMinimumBalanceForRentExemption(165);
        }

        const breakdown = {
            transfer: transferFee,
            accountCreation: accountCreationFee,
            priorityFee: this.config.priorityFee
        };

        const estimatedFee = breakdown.transfer + breakdown.accountCreation + breakdown.priorityFee;

        return {
            estimatedFee,
            breakdown
        };
    }

    protected async buildInstructions(operationData: TransferOperationData): Promise<any[]> {
        const instructions = [];
        const { senderAta, destinationAta, destinationPubkey, needsDestinationATA } = operationData;
        const mintPubkey = new PublicKey(this.mint);
        const sender = this.wallet.publicKey!;

        // Add ATA creation instruction if needed
        if (needsDestinationATA) {
            instructions.push(
                createAssociatedTokenAccountInstruction(
                    sender,           // Payer for account creation
                    destinationAta,   // The new ATA address
                    destinationPubkey, // The owner of the new ATA
                    mintPubkey        // The mint the ATA is for
                )
            );
        }

        // Add transfer instruction
        instructions.push(
            createTransferInstruction(
                senderAta,      // Source account
                destinationAta, // Destination account
                sender,         // Owner of source account
                this.amount     // Amount to transfer
            )
        );

        return instructions;
    }

    protected async buildSuccessResult(
        txId: string,
        feeEstimation: FeeEstimation,
        operationData: TransferOperationData
    ): Promise<TransferResult> {
        return {
            success: true,
            transactionId: txId,
            estimatedFee: feeEstimation.estimatedFee,
            confirmationTime: Date.now() - this.startTime,
            createdDestinationATA: operationData.needsDestinationATA
        };
    }
}

/**
 * Factory function to maintain the original API
 */
export async function transferTokens(params: TransferTokensParams): Promise<TransferResult> {
    const operation = new TransferTokenOperation(params);
    return await operation.execute();
} 