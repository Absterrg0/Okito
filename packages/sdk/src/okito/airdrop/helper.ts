import { AirdropRecipient } from "../../types/airdrop/drop";
import { PublicKey } from "@solana/web3.js";
import { Connection } from "@solana/web3.js";
import { log } from "../utils/logger";
import { AirdropFeeEstimation } from "../../types/airdrop/drop";

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

            if (recipient.amount <= 0) {
                errors.push(`Recipient ${index + 1}: amount must be greater than zero`);
            } else if (recipient.amount > Number.MAX_SAFE_INTEGER) {
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
 * Estimates fees for airdrop operations
 * @param connection - Solana connection instance
 * @param recipients - Array of airdrop recipients
 * @param accountsToCreate - Number of recipient accounts that need to be created
 * @param priorityFee - Optional priority fee in lamports
 * @returns Promise resolving to fee estimation
 */
export async function estimateAirdropFee(
    connection: Connection,
    recipients: AirdropRecipient[],
    accountsToCreate: number,
    priorityFee: number = 0
): Promise<AirdropFeeEstimation> {
    try {
        // Base transfer instruction fee per recipient
        const transferFeePerRecipient = 5000; // ~0.000005 SOL per transfer
        const totalTransferFees = transferFeePerRecipient * recipients.length;
        
        // Account creation fees
        let accountCreationFees = 0;
        if (accountsToCreate > 0) {
            // Standard ATA rent exemption per account
            const rentExemptionPerAccount = await connection.getMinimumBalanceForRentExemption(165);
            accountCreationFees = rentExemptionPerAccount * accountsToCreate;
        }
        
        const breakdown = {
            transfers: totalTransferFees,
            accountCreations: accountCreationFees,
            priorityFee: priorityFee
        };
        
        const estimatedFee = breakdown.transfers + breakdown.accountCreations + breakdown.priorityFee;
        
        return {
            estimatedFee,
            breakdown
        };
    } catch (error) {
        log('error', 'Failed to estimate airdrop fees', error);
        return {
            estimatedFee: 0.01 * 1e9 * recipients.length, // Conservative estimate
            breakdown: {
                transfers: 5000 * recipients.length,
                accountCreations: accountsToCreate * 0.002 * 1e9,
                priorityFee
            }
        };
    }
}
