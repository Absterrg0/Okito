import {
    createBurnInstruction,
    getAssociatedTokenAddress,
} from '@solana/spl-token';
import { PublicKey, TransactionMessage } from '@solana/web3.js';
import { BaseTokenOperation, ValidationResult, FeeEstimation } from '../core/BaseTokenOperation';
import type { BurnTokenConfig, BurnTokenResult } from '../../types/token/burn-token';

interface BurnOperationData {
    mintInfo: any;
    senderTokenAccount: any;
    rawAmount: bigint;
    ownerAta: PublicKey;
}

/**
 * Specialized burn operation class that extends BaseTokenOperation
 */
export class BurnTokenOperation extends BaseTokenOperation<BurnTokenConfig, BurnTokenResult> {
    private mint: string;
    private amount: number;

    constructor(
        connection: any,
        wallet: any,
        mint: string,
        amount: number,
        config: BurnTokenConfig = {}
    ) {
        super(connection, wallet, config);
        this.mint = mint;
        this.amount = amount;
    }

    protected getOperationName(): string {
        return 'Token Burn';    
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

        // Validate amount
        try {
            this.validateAmount(this.amount, 'burn amount');
        } catch (error: any) {
            errors.push(error.message);
        }

        // Additional burn-specific validations
        if (this.amount > 1000000) {
            warnings.push('Very large burn amount detected');
        }

        return {
            isValid: errors.length === 0,
            errors,
            warnings: warnings.length > 0 ? warnings : undefined
        };
    }

    protected async prepareOperationData(): Promise<BurnOperationData> {
        // Get mint info to fetch actual decimals
        const mintInfo = await this.getMintInfo(this.mint);
        
        // Get sender's token account
        const senderTokenAccount = await this.getTokenAccount(this.mint, this.wallet.publicKey!);
        
        // Convert amount to raw token units using actual mint decimals
        const rawAmount = this.convertToRawAmount(this.amount, mintInfo.decimals);
        
        this.logInfo('Token decimals and conversion', {
            decimals: mintInfo.decimals,
            humanAmount: this.amount,
            rawAmount: rawAmount.toString()
        });

        // Validate sufficient balance
        if (senderTokenAccount.amount < rawAmount) {
            throw new Error(`Insufficient token balance. Required: ${rawAmount}, Available: ${senderTokenAccount.amount}`);
        }

        // Get Associated Token Account address
        const mintPubkey = new PublicKey(this.mint);
        const ownerAta = await getAssociatedTokenAddress(mintPubkey, this.wallet.publicKey!);

        return {
            mintInfo,
            senderTokenAccount,
            rawAmount,
            ownerAta
        };
    }

    protected async estimateFees(): Promise<FeeEstimation> {
        const hash = await this.connection.getLatestBlockhash();
        const dummyMessage = new TransactionMessage({
            payerKey: PublicKey.default,
            recentBlockhash: hash.blockhash,
            instructions: []
        }).compileToV0Message();
        const feeCalculator = await this.connection.getFeeForMessage(dummyMessage);
        const burnFee = feeCalculator.value || 0
        const breakdown = {
            burn: burnFee,
        };
        
        const estimatedFee = breakdown.burn;
        
        return {
            estimatedFee,
            breakdown
        };
    }

    protected async buildInstructions(operationData: BurnOperationData): Promise<any[]> {
        const { rawAmount, ownerAta } = operationData;
        const mintPubkey = new PublicKey(this.mint);
        
        return [
            createBurnInstruction(
                ownerAta,     // Token account to burn from
                mintPubkey,   // Mint address  
                this.wallet.publicKey!, // Owner of the token account
                rawAmount     // Amount to burn in raw token units
            )
        ];
    }

    protected async buildSuccessResult(
        txId: string, 
        feeEstimation: FeeEstimation, 
        operationData: BurnOperationData
    ): Promise<BurnTokenResult> {
        return {
            success: true,
            transactionId: txId,
            estimatedFee: feeEstimation.estimatedFee,
            confirmationTime: Date.now() - this.startTime
        };
    }
}

/**
 * Factory function to maintain the original API
 */
export async function burnToken(
    wallet: any,
    connection: any,
    mint: string,
    amount: number,
    config: BurnTokenConfig = {}
): Promise<BurnTokenResult> {
    const operation = new BurnTokenOperation(connection, wallet, mint, amount, config);
    return await operation.execute();
} 