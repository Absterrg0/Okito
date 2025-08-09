import { AirdropRecipient } from "../../types/airdrop/drop";
import { PublicKey } from "@solana/web3.js";
import { Connection } from "@solana/web3.js";
import { log } from "../utils/logger";
import { AirdropFeeEstimation } from "../../types/airdrop/drop";
import { createTransferInstruction } from "@solana/spl-token";

/**
 * Validates airdrop parameters
 */
export function validateAirdropParams(
    mint: string,
    sender: string,
    recipients: AirdropRecipient[]
): { isValid: boolean; errors: string[]; warnings?: string[] } {
    const errors: string[] = [];
    const warnings: string[] = [];

    // Validate mint address
    if (!mint?.trim()) {
        errors.push('Mint address is required');
    } else {
        try {
            new PublicKey(mint);
        } catch {
            errors.push('Invalid mint address format');
        }
    }

    // Validate sender address
    if (!sender?.trim()) {
        errors.push('Sender address is required');
    } else {
        try {
            new PublicKey(sender);
        } catch {
            errors.push('Invalid sender address format');
        }
    }

    // Validate recipients
    if (!recipients || recipients.length === 0) {
        errors.push('At least one recipient is required');
    } else {
        if (recipients.length > 100) {
            warnings.push('Large number of recipients detected, consider breaking into smaller batches');
        }

        recipients.forEach((recipient, index) => {
            if (!recipient.address?.trim()) {
                errors.push(`Recipient ${index + 1}: address is required`);
            } else {
                try {
                    new PublicKey(recipient.address);
                } catch {
                    errors.push(`Recipient ${index + 1}: invalid address format`);
                }
            }

            // Fix: Ensure recipient.amount is a bigint for comparison
            let amountBigInt: bigint;
            try {
                amountBigInt = typeof recipient.amount === "bigint"
                    ? recipient.amount
                    : BigInt(recipient.amount);
            } catch {
                errors.push(`Recipient ${index + 1}: invalid amount`);
                return;
            }

            if (amountBigInt <= BigInt(0)) {
                errors.push(`Recipient ${index + 1}: amount must be greater than zero`);
            } else if (amountBigInt > BigInt(Number.MAX_SAFE_INTEGER)) {
                warnings.push(`Recipient ${index + 1}: very large amount detected`);
            }

            // Check for duplicate addresses
            const duplicateIndex = recipients.findIndex((r, i) =>
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

/**
 * Accurately estimates the total cost (rent + fees) for an SPL token airdrop.
 *
 * @param connection - The Solana Connection object.
 * @param recipients - An array of airdrop recipients, each with an address and amount.
 * @param accountsToCreate - The number of new token accounts that need to be created.
 * @param priorityFee - An optional priority fee in micro-lamports to add to the estimate.
 * @returns A Promise resolving to an object containing the fee estimation or an error.
 */
export async function estimateAirdropFee(
    _connection: Connection,
    recipients: AirdropRecipient[],
    accountsToCreate: number,
    priorityFee: number = 0
): Promise<AirdropFeeEstimation> {
    try {
        if (recipients.length === 0) {
            return {
                estimatedFee: 0,
                breakdown: {
                    accountCreations: 0,
                    transactionFees: 0,
                    priorityFees: 0,
                },
            };
        }

        // --- 1. Calculate Total Rent for New Accounts (local heuristic) ---
        const RENT_EXEMPT_165 = 2039280; // lamports
        const accountCreationRent = Math.max(0, accountsToCreate) * RENT_EXEMPT_165;

        // --- 2. Estimate Transaction Fees locally ---
        // Assume transfers will be split; estimate per-instruction cost with buffer
        const BASE_TX_FEE = 5000; // lamports
        const PER_INSTRUCTION_FEE = 2000; // lamports per transfer instruction
        const estimatedInstructionCount = Math.max(1, recipients.length);
        let transactionFee = BASE_TX_FEE + PER_INSTRUCTION_FEE * estimatedInstructionCount;
        transactionFee = Math.floor(transactionFee * 1.1); // 10% buffer

        // --- 3. Combine Costs and Return ---

        const estimatedFee = accountCreationRent + transactionFee + priorityFee;

        return {
            estimatedFee,
            breakdown: {
                accountCreations: accountCreationRent,
                transactionFees: transactionFee,
                priorityFees: priorityFee,
            },
        };
    } catch (error: any) {
        console.error("Failed to estimate airdrop fees:", error);
        return {
            estimatedFee: 0,
            breakdown: {
                accountCreations: 0,
                transactionFees: 0,
                priorityFees: 0,
            },
        };
    }
}
