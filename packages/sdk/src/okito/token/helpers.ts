import { TokenLaunchData, ValidationResult, FeeEstimation } from "../../types/token/launch";
import { TransferFeeEstimation } from "../../types/token/transfer";
import { Connection, TransactionMessage } from "@solana/web3.js";
import { getMintLen, ExtensionType, TYPE_SIZE, LENGTH_SIZE } from "@solana/spl-token";
import { PublicKey } from "@solana/web3.js";
import { pack } from "@solana/spl-token-metadata";
import { log } from "../utils/logger";
import { isValidUrl, isValidMintAddress } from "../utils/sanitizers";
import { getAccount } from "@solana/spl-token";

/**
 * Legacy validation function for backward compatibility
 */
export function validateTokenData(tokenData: TokenLaunchData): { isValid: boolean; error?: string } {
    const result = validateProductionTokenData(tokenData);
    return {
        isValid: result.isValid,
        error: result.errors[0]
    };
}



/**
 * Estimates fees for token creation
 */
export async function estimateTokenCreationFee(
    connection: Connection,
    tokenData: TokenLaunchData,
    priorityFee: number = 0
): Promise<FeeEstimation> {
    try {
        // Calculate space requirements
        const mintLen = getMintLen([ExtensionType.MetadataPointer]);
        
        // Basic metadata without additional fields
        const metadata = {
            mint: new PublicKey(0), // Placeholder
            name: tokenData.name,
            symbol: tokenData.symbol,
            uri: tokenData.imageUrl,
            additionalMetadata: []
        };
        
        const metadataLen = TYPE_SIZE + LENGTH_SIZE + pack(metadata).length;
        
        // Get rent exemption costs
        const accountCreationFee = await connection.getMinimumBalanceForRentExemption(mintLen + metadataLen);
        
        // Estimate transaction fees (approximate)
        const baseTransactionFee = 5000; // 0.000005 SOL base fee
        const instructionFees = 6 * 1000; // ~6 instructions * 1000 lamports each
        
        const breakdown = {
            accountCreation: accountCreationFee,
            metadata: 0, // Included in account creation
            mintTokens: instructionFees,
            priorityFee: priorityFee
        };
        
        const estimatedFee = breakdown.accountCreation + breakdown.mintTokens + breakdown.priorityFee + baseTransactionFee;
        
        return {
            estimatedFee,
            breakdown
        };
    } catch (error) {
        log('error', 'Failed to estimate fees', error);
        // Return conservative estimate
        return {
            estimatedFee: 0.01 * 1e9, // 0.01 SOL in lamports
            breakdown: {
                accountCreation: 0.008 * 1e9,
                metadata: 0,
                mintTokens: 0.001 * 1e9,
                priorityFee: priorityFee
            }
        };
    }
}




/**
 * Enhanced validation for production use
 * @param tokenData - The token data to validate
 * @returns Comprehensive validation result
 */
export function validateProductionTokenData(tokenData: TokenLaunchData): ValidationResult {
    const errors: string[] = [];
    const warnings: string[] = [];

    // Basic field validation
    if (!tokenData.name?.trim()) {
        errors.push('Token name is required');
    } else if (tokenData.name.length > 32) {
        errors.push('Token name must be 32 characters or less');
    } else if (tokenData.name.length < 2) {
        warnings.push('Token name is very short, consider a more descriptive name');
    }

    if (!tokenData.symbol?.trim()) {
        errors.push('Token symbol is required');
    } else if (tokenData.symbol.length > 10) {
        errors.push('Token symbol must be 10 characters or less');
    } else if (!/^[A-Z0-9]+$/.test(tokenData.symbol)) {
        errors.push('Token symbol should only contain uppercase letters and numbers');
    }

    // URL validation
    if (!tokenData.imageUrl?.trim()) {
        errors.push('Image URL is required for quality tokens');
    } else if (!isValidUrl(tokenData.imageUrl)) {
        errors.push('Invalid image URL format');
    }

    if (tokenData.externalUrl && !isValidUrl(tokenData.externalUrl)) {
        errors.push('Invalid external URL format');
    }

    // Description validation
    if (tokenData.description && tokenData.description.length > 500) {
        errors.push('Description must be 500 characters or less');
    }

    // Supply validation
    if (!tokenData.initialSupply || tokenData.initialSupply <= 0) {
        errors.push('Initial supply must be a positive number');
    } else if (tokenData.initialSupply > 1e15) {
        warnings.push('Very large initial supply detected');
    }

    // Decimals validation
    if (isNaN(tokenData.decimals) || tokenData.decimals < 0 || tokenData.decimals > 18) {
        errors.push('Decimals must be between 0 and 18');
    } else if (tokenData.decimals !== 9 && tokenData.decimals !== 6) {
        warnings.push('Standard decimals are 6 or 9');
    }

    return {
        isValid: errors.length === 0,
        errors,
        warnings
    };
}

/**
 * Estimates fees for token transfer
 */
export async function estimateTransferFee(
    connection: Connection,
    needsDestinationATA: boolean,
    priorityFee: number = 0
): Promise<TransferFeeEstimation> {
    try {
        // Base transfer instruction fee
        const hash = await connection.getLatestBlockhash();
        const dummyMessage = new TransactionMessage({
            payerKey: PublicKey.default,
            recentBlockhash: hash.blockhash,
            instructions: []
        }).compileToV0Message();
        const feeCalculator = await connection.getFeeForMessage(dummyMessage);
        const transferFee = feeCalculator.value ?? 0;
        
        // ATA creation fee if needed
        let accountCreationFee = 0;
        if (needsDestinationATA) {
            // Standard ATA rent exemption
            accountCreationFee = await connection.getMinimumBalanceForRentExemption(165);
        }
        
        const estimatedFee = transferFee + priorityFee + accountCreationFee;
        
        return {
            estimatedFee,
        };
    } catch (error) {
        log('error', 'Failed to estimate transfer fees', error);
        // Return conservative estimate
        return {
            estimatedFee: 0.005 * 1e9, // 0.005 SOL in lamports
        };
    }
}

/**
 * Validates transfer parameters
 */
export function validateTransferParams(
    mint: string,
    destination: string,
    amount: bigint
): ValidationResult {
    const errors: string[] = [];
    const warnings: string[] = [];

    // Validate mint address
    if (!mint?.trim()) {
        errors.push('Mint address is required');
    } else if (!isValidMintAddress(mint)) {
        errors.push('Invalid mint address format');
    }

    // Validate destination address
    if (!destination?.trim()) {
        errors.push('Destination address is required');
    } else if (!isValidMintAddress(destination)) { // Reusing mint validation for PublicKey validation
        errors.push('Invalid destination address format');
    }

    // Validate amount
    if (amount <= BigInt(0)) {
        errors.push('Transfer amount must be greater than zero');
    } else if (amount > BigInt(Number.MAX_SAFE_INTEGER)) {
        warnings.push('Very large transfer amount detected');
    }

    return {
        isValid: errors.length === 0,
        errors,
        warnings
    };
}




/**
 * Validates burn parameters
 */
export function validateBurnParams(
    mint: string,
    owner: string,
    amount: number
): ValidationResult {
    const errors: string[] = [];
    const warnings: string[] = [];

    // Validate mint address
    if (!mint?.trim()) {
        errors.push('Mint address is required');
    } else if (!isValidMintAddress(mint)) {
        errors.push('Invalid mint address format');
    }

    // Validate owner address
    if (!owner?.trim()) {
        errors.push('Owner address is required');
    } else if (!isValidMintAddress(owner)) { // Reusing mint validation for PublicKey validation
        errors.push('Invalid owner address format');
    }

    // Validate amount
    if (amount <= 0) {
        errors.push('Burn amount must be greater than zero');
    } else if (amount > Number.MAX_SAFE_INTEGER) {
        warnings.push('Very large burn amount detected');
    }

    return {
        isValid: errors.length === 0,
        errors,
        warnings
    };
}
