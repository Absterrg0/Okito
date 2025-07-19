import {
    createTransferInstruction,
    createAssociatedTokenAccountInstruction,
    getAssociatedTokenAddress,
    getAccount,
} from '@solana/spl-token';
import { PublicKey, TransactionMessage } from '@solana/web3.js';
import { BaseTokenOperation, ValidationResult, FeeEstimation } from '../core/BaseTokenOperation';
import type { AirdropConfig, AirdropRecipient, AirdropResult } from '../../types/airdrop/drop';

interface RecipientData {
    address: PublicKey;
    rawAmount: bigint;
    humanAmount: number;
}

interface AirdropOperationData {
    mintInfo: any;
    senderTokenAccount: any;
    recipientData: RecipientData[];
    accountsToCreate: Array<{ recipient: PublicKey; ata: PublicKey }>;
    totalRawAmount: bigint;
    senderAta: PublicKey;
}

/**
 * Specialized airdrop operation class that extends BaseTokenOperation
 */
export class AirdropOperation extends BaseTokenOperation<AirdropConfig, AirdropResult> {
    private mint: string;
    private recipients: AirdropRecipient[];

    constructor(
        connection: any,
        wallet: any,
        mint: string,
        recipients: AirdropRecipient[],
        config: AirdropConfig = {}
    ) {
        const airdropConfig = {
            timeoutMs: 120000, // Longer timeout for multiple recipients
            enableLogging: true, // Enable by default for airdrops (important operations)
            createRecipientAccount: true,
            ...config
        };
        super(connection, wallet, airdropConfig);
        this.mint = mint;
        this.recipients = recipients;
    }

    protected getOperationName(): string {
        return 'Token Airdrop';
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

        // Validate recipients
        if (!this.recipients || this.recipients.length === 0) {
            errors.push('At least one recipient is required');
        } else {
            if (this.recipients.length > 100) {
                warnings.push('Large number of recipients detected, consider breaking into smaller batches');
            }

            this.recipients.forEach((recipient, index) => {
                if (!recipient.address?.trim()) {
                    errors.push(`Recipient ${index + 1}: address is required`);
                } else {
                    try {
                        this.validatePublicKey(recipient.address, `recipient ${index + 1} address`);
                    } catch (error: any) {
                        errors.push(error.message);
                    }
                }

                try {
                    this.validateAmount(recipient.amount, `recipient ${index + 1} amount`);
                } catch (error: any) {
                    errors.push(error.message);
                }

                // Check for duplicate addresses
                const duplicateIndex = this.recipients.findIndex((r, i) => 
                    i !== index && r.address === recipient.address
                );
                if (duplicateIndex !== -1) {
                    warnings.push(`Duplicate recipient address found: ${recipient.address} (positions ${index + 1} and ${duplicateIndex + 1})`);
                }
            });
        }

        return {
            isValid: errors.length === 0,
            errors,
            warnings: warnings.length > 0 ? warnings : undefined
        };
    }

    protected async prepareOperationData(): Promise<AirdropOperationData> {
        // Get mint information
        const mintInfo = await this.getMintInfo(this.mint);
        
        const mintPubkey = new PublicKey(this.mint);
        const sender = this.wallet.publicKey!;
        const senderAta = await getAssociatedTokenAddress(mintPubkey, sender);

        // Check sender's token account and balance
        const senderTokenAccount = await this.getTokenAccount(this.mint, sender);

        // Calculate total amount needed and convert to raw token units
        const decimals = mintInfo.decimals;
        let totalRawAmount = BigInt(0);
        const recipientData: RecipientData[] = [];

        for (const recipient of this.recipients) {
            const rawAmount = this.convertToRawAmount(recipient.amount, decimals);
            totalRawAmount += rawAmount;
            
            recipientData.push({
                address: new PublicKey(recipient.address),
                rawAmount,
                humanAmount: recipient.amount
            });
        }

        // Validate sender has sufficient balance
        if (senderTokenAccount.amount < totalRawAmount) {
            throw new Error(`Insufficient token balance. Required: ${totalRawAmount}, Available: ${senderTokenAccount.amount}`);
        }

        // Check which recipient accounts need to be created
        const accountsToCreate = [];
        for (const recipientInfo of recipientData) {
            const recipientAta = await getAssociatedTokenAddress(mintPubkey, recipientInfo.address);
            
            try {
                await getAccount(this.connection, recipientAta);
            } catch (error) {
                if (!this.config.createRecipientAccount) {
                    throw new Error(`Recipient ${recipientInfo.address.toString()} does not have a token account and auto-creation is disabled`);
                }
                accountsToCreate.push({
                    recipient: recipientInfo.address,
                    ata: recipientAta
                });
            }
        }

        this.logInfo('Airdrop preparation complete', {
            totalRecipients: this.recipients.length,
            accountsToCreate: accountsToCreate.length,
            totalAmount: totalRawAmount.toString(),
            decimals
        });

        return {
            mintInfo,
            senderTokenAccount,
            recipientData,
            accountsToCreate,
            totalRawAmount,
            senderAta
        };
    }

    protected async estimateFees(operationData: AirdropOperationData): Promise<FeeEstimation> {
        // Base transfer instruction fee per recipient
        const hash = await this.connection.getLatestBlockhash();
        const dummyMessage = new TransactionMessage({
            payerKey: PublicKey.default,
            recentBlockhash: hash.blockhash,
            instructions: []
        }).compileToV0Message();
        const feeCalculator = await this.connection.getFeeForMessage(dummyMessage);
        const transferFeePerRecipient = feeCalculator.value || 0; // ~0.000005 SOL per transfer
        const totalTransferFees = transferFeePerRecipient * this.recipients.length;
        
        // Account creation fees
        let accountCreationFees = 0;
        if (operationData.accountsToCreate.length > 0) {
            // Standard ATA rent exemption per account
            const rentExemptionPerAccount = await this.connection.getMinimumBalanceForRentExemption(165);
            accountCreationFees = rentExemptionPerAccount * operationData.accountsToCreate.length;
        }

        const breakdown = {
            transfers: totalTransferFees,
            accountCreations: accountCreationFees,
            priorityFee: this.config.priorityFee
        };

        const estimatedFee = breakdown.transfers + breakdown.accountCreations + breakdown.priorityFee;

        return {
            estimatedFee,
            breakdown
        };
    }

    protected async buildInstructions(operationData: AirdropOperationData): Promise<any[]> {
        const instructions = [];
        const { recipientData, accountsToCreate, senderAta } = operationData;
        const mintPubkey = new PublicKey(this.mint);
        const sender = this.wallet.publicKey!;

        // Add account creation instructions
        for (const accountToCreate of accountsToCreate) {
            instructions.push(
                createAssociatedTokenAccountInstruction(
                    sender,
                    accountToCreate.ata,
                    accountToCreate.recipient,
                    mintPubkey
                )
            );
        }

        // Add transfer instructions
        for (const recipientInfo of recipientData) {
            const recipientAta = await getAssociatedTokenAddress(mintPubkey, recipientInfo.address);
            
            instructions.push(
                createTransferInstruction(
                    senderAta,
                    recipientAta,
                    sender,
                    recipientInfo.rawAmount
                )
            );
        }

        return instructions;
    }

    protected async buildSuccessResult(
        txId: string,
        feeEstimation: FeeEstimation,
        operationData: AirdropOperationData
    ): Promise<AirdropResult> {
        return {
            success: true,
            transactionId: txId,
            estimatedFee: feeEstimation.estimatedFee,
            actualFee: feeEstimation.estimatedFee,
            confirmationTime: Date.now() - this.startTime,
            recipientsProcessed: this.recipients.length,
            accountsCreated: operationData.accountsToCreate.length,
            totalAmountSent: operationData.totalRawAmount.toString()
        };
    }
}

/**
 * Factory function to maintain the original API
 */
export async function airdropTokensToMultiple(
    connection: any,
    wallet: any,
    mint: string,
    recipients: AirdropRecipient[],
    config: AirdropConfig = {}
): Promise<AirdropResult> {
    const operation = new AirdropOperation(connection, wallet, mint, recipients, config);
    return await operation.execute();
}

/**
 * Convenience function for single recipient airdrop
 */
export async function airdropTokenToAddress(
    connection: any,
    wallet: any,
    mint: string,
    recipientAddress: string,
    amount: number,
    config: AirdropConfig = {}
): Promise<AirdropResult> {
    return airdropTokensToMultiple(connection, wallet, mint, [{ address: recipientAddress, amount }], config);
} 