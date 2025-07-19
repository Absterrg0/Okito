import { Connection, PublicKey } from "@solana/web3.js";
import { WrapSolFeeEstimation } from "../../types/SOL/wrap";
import { log } from "../utils/logger";

/**
 * Validates SOL wrapping parameters
 */
export function validateWrapSolParams(
    amount: number,
    walletAddress: string
): { isValid: boolean; errors: string[]; warnings?: string[] } {
    const errors: string[] = [];
    const warnings: string[] = [];

    // Validate amount
    if (amount <= 0) {
        errors.push('Wrap amount must be greater than zero');
    } else if (amount > 1000000) {
        warnings.push('Very large wrap amount detected (>1M SOL)');
    } else if (amount < 0.001) {
        warnings.push('Very small wrap amount detected (<0.001 SOL)');
    }

    // Validate wallet address
    if (!walletAddress?.trim()) {
        errors.push('Wallet address is required');
    } else {
        try {
            new PublicKey(walletAddress);
        } catch {
            errors.push('Invalid wallet address format');
        }
    }

    return {
        isValid: errors.length === 0,
        errors,
        warnings: warnings.length > 0 ? warnings : undefined
    };
}

/**
 * Estimates fees for SOL wrapping operations
 * @param connection - Solana connection instance
 * @param needsAccountCreation - Whether token account needs to be created
 * @param priorityFee - Optional priority fee in lamports
 * @returns Promise resolving to fee estimation
 */
export async function estimateWrapSolFee(
    connection: Connection,
    needsAccountCreation: boolean,
    priorityFee: number = 0
): Promise<WrapSolFeeEstimation> {
    try {
        // Base instruction fees
        const transferFee = 5000; // ~0.000005 SOL for SystemProgram.transfer
        const syncFee = 5000; // ~0.000005 SOL for sync instruction
        
        // Account creation fee if needed
        let accountCreationFee = 0;
        if (needsAccountCreation) {
            // Standard ATA rent exemption (approx 0.002 SOL)
            accountCreationFee = await connection.getMinimumBalanceForRentExemption(165);
        }
        
        const breakdown = {
            transfer: transferFee,
            accountCreation: accountCreationFee,
            sync: syncFee,
            priorityFee: priorityFee
        };
        
        const estimatedFee = breakdown.transfer + breakdown.accountCreation + breakdown.sync + breakdown.priorityFee;
        
        return {
            estimatedFee,
            breakdown
        };
    } catch (error) {
        log('error', 'Failed to estimate wrap SOL fees', error);
        return {
            estimatedFee: 0.01 * 1e9, // Conservative estimate
            breakdown: {
                transfer: 5000,
                accountCreation: needsAccountCreation ? 0.002 * 1e9 : 0,
                sync: 5000,
                priorityFee
            }
        };
    }
}
