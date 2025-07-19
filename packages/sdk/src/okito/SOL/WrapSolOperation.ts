import {
    SystemProgram,
    LAMPORTS_PER_SOL,
    PublicKey
} from '@solana/web3.js';
import {
    createAssociatedTokenAccountInstruction,
    createSyncNativeInstruction,
    getAssociatedTokenAddress,
    getAccount,
} from '@solana/spl-token';
import { BaseTokenOperation, ValidationResult, FeeEstimation } from '../core/BaseTokenOperation';
import type { WrapSolConfig, WrapSolResult } from '../../types/SOL/wrap';

interface WrapOperationData {
    WSOL_MINT: PublicKey;
    associatedTokenAddress: PublicKey;
    lamports: number;
    needsAccountCreation: boolean;
}

/**
 * Specialized SOL wrapping operation class that extends BaseTokenOperation
 */
export class WrapSolOperation extends BaseTokenOperation<WrapSolConfig, WrapSolResult> {
    private amountSol: number;

    constructor(
        connection: any,
        wallet: any,
        amountSol: number,
        config: WrapSolConfig = {}
    ) {
        super(connection, wallet, config);
        this.amountSol = amountSol;
    }

    protected getOperationName(): string {
        return 'SOL Wrap';
    }

    protected async validateParameters(): Promise<ValidationResult> {
        const errors: string[] = [];
        const warnings: string[] = [];

        // Validate amount
        try {
            this.validateAmount(this.amountSol, 'wrap amount');
        } catch (error: any) {
            errors.push(error.message);
        }

        // Additional wrap-specific validations
        if (this.amountSol > 1000000) {
            warnings.push('Very large wrap amount detected (>1M SOL)');
        } else if (this.amountSol < 0.001) {
            warnings.push('Very small wrap amount detected (<0.001 SOL)');
        }

        return {
            isValid: errors.length === 0,
            errors,
            warnings: warnings.length > 0 ? warnings : undefined
        };
    }

    protected async prepareOperationData(): Promise<WrapOperationData> {
        // Setup wSOL mint and associated token account
        const WSOL_MINT = new PublicKey("So11111111111111111111111111111111111111112");
        const associatedTokenAddress = await getAssociatedTokenAddress(
            WSOL_MINT,
            this.wallet.publicKey!
        );

        // Check if wSOL token account exists
        let needsAccountCreation = false;
        try {
            await getAccount(this.connection, associatedTokenAddress);
        } catch (error) {
            needsAccountCreation = true;
            if (!this.config.createAccountIfNeeded) {
                throw new Error('wSOL token account does not exist and auto-creation is disabled');
            }
        }

        // Convert SOL amount to lamports
        const lamports = Math.round(this.amountSol * LAMPORTS_PER_SOL);
        
        this.logInfo('SOL to lamports conversion', {
            sol: this.amountSol,
            lamports: lamports.toString()
        });

        return {
            WSOL_MINT,
            associatedTokenAddress,
            lamports,
            needsAccountCreation
        };
    }

    protected async estimateFees(operationData: WrapOperationData): Promise<FeeEstimation> {
        const transferFee = 5000; // ~0.000005 SOL for SystemProgram.transfer
        const syncFee = 5000; // ~0.000005 SOL for sync instruction
        
        let accountCreationFee = 0;
        if (operationData.needsAccountCreation) {
            // Standard ATA rent exemption (approx 0.002 SOL)
            accountCreationFee = await this.connection.getMinimumBalanceForRentExemption(165);
        }

        const breakdown = {
            transfer: transferFee,
            accountCreation: accountCreationFee,
            sync: syncFee,
            priorityFee: this.config.priorityFee
        };

        const estimatedFee = breakdown.transfer + breakdown.accountCreation + breakdown.sync + breakdown.priorityFee;

        return {
            estimatedFee,
            breakdown
        };
    }

    protected async buildInstructions(operationData: WrapOperationData): Promise<any[]> {
        const instructions = [];
        const { WSOL_MINT, associatedTokenAddress, lamports, needsAccountCreation } = operationData;
        const sender = this.wallet.publicKey!;

        // Add account creation instruction if needed
        if (needsAccountCreation) {
            instructions.push(
                createAssociatedTokenAccountInstruction(
                    sender,
                    associatedTokenAddress,
                    sender,
                    WSOL_MINT
                )
            );
        }

        // Add transfer and sync instructions
        instructions.push(
            SystemProgram.transfer({
                fromPubkey: sender,
                toPubkey: associatedTokenAddress,
                lamports,
            }),
            createSyncNativeInstruction(associatedTokenAddress)
        );

        return instructions;
    }

    protected async validateWalletBalance(requiredAmount: number): Promise<void> {
        // Override to include wrap amount + fees
        const operationData = await this.prepareOperationData();
        const totalRequired = operationData.lamports + requiredAmount;
        
        const balance = await this.connection.getBalance(this.wallet.publicKey!);
        if (balance < totalRequired) {
            throw new Error(
                `Insufficient SOL balance. Required: ${totalRequired / 1e9} SOL (${this.amountSol} wrap + ${requiredAmount / 1e9} fees), Available: ${balance / 1e9} SOL`
            );
        }
    }

    protected async buildSuccessResult(
        txId: string,
        feeEstimation: FeeEstimation,
        operationData: WrapOperationData
    ): Promise<WrapSolResult> {
        return {
            success: true,
            tokenAccount: operationData.associatedTokenAddress.toString(),
            transactionId: txId,
            estimatedFee: feeEstimation.estimatedFee,
            actualFee: feeEstimation.estimatedFee,
            confirmationTime: Date.now() - this.startTime,
            createdTokenAccount: operationData.needsAccountCreation
        };
    }
}

/**
 * Factory function to maintain the original API
 */
export async function wrapSol(
    connection: any,
    wallet: any,
    amountSol: number,
    config: WrapSolConfig = {}
): Promise<WrapSolResult> {
    const operation = new WrapSolOperation(connection, wallet, amountSol, config);
    return await operation.execute();
} 