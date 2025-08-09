import { TokenData, FeeEstimation } from "../../types/token/launch";
import { TransferFeeEstimation } from "../../types/token/transfer";
import { Connection, SystemProgram, PublicKey } from "@solana/web3.js";
import {
  getMintLen,
  ExtensionType,
  TYPE_SIZE,
  LENGTH_SIZE,
  TOKEN_2022_PROGRAM_ID,
  createInitializeMetadataPointerInstruction,
  createInitializeMint2Instruction,
  getAssociatedTokenAddressSync,
  createAssociatedTokenAccountInstruction,
  createMintToInstruction,
} from "@solana/spl-token";
import { pack, createInitializeInstruction as createMetadataInitializeInstruction } from "@solana/spl-token-metadata";
import { log } from "../utils/logger";
import { isValidUrl, isValidMintAddress } from "../utils/sanitizers";
import { ValidationResult } from "../core/BaseTokenOperation";
/**
 * Legacy validation function for backward compatibility
 */
export function validateTokenData(tokenData: TokenData): { isValid: boolean; error?: string } {
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
  _connection: Connection,
  tokenData: TokenData,
  priorityFee: number = 0
): Promise<FeeEstimation> {
  try {
    // Heuristic, local-only estimation (no RPC calls)
    // 1) Calculate account sizes and approximate rent with static cluster defaults
    const mintLen = getMintLen([ExtensionType.MetadataPointer]);
    const metadataPackedLen = pack({
      // Minimal metadata just for sizing
      mint: PublicKey.default,
      name: tokenData.name,
      symbol: tokenData.symbol,
      uri: tokenData.imageUrl,
      additionalMetadata: [],
    } as any).length;
    const metadataLen = TYPE_SIZE + LENGTH_SIZE + metadataPackedLen;
    // Static rent approximations (avoid RPC):
    // - 165-byte ATA rent exemption on mainnet-beta is ~2039280 lamports
    // - Mint+metadata rent varies with metadata size; approximate proportionally
    const RENT_EXEMPT_165 = 2039280; // lamports
    const approxRentPerByte = 2 * 1e9 / (128 * 1024); // very rough: ~2 SOL per 128KB → ~15625 lamports/byte
    const rentForMintWithMetadata = Math.max(
      Math.floor((mintLen + metadataLen) * approxRentPerByte),
      RENT_EXEMPT_165
    );
    const rentForAta = RENT_EXEMPT_165;

    // 2) Local heuristic transaction fee estimation (no network)
    // Count representative instructions and apply per-instruction fee on top of base tx fee
    const representativeInstructionCount = 6; // createAccount, init metadata pointer, init mint, init metadata, create ATA, mintTo
    const BASE_TX_FEE = 5000; // lamports
    const PER_INSTRUCTION_FEE = 2000; // heuristic
    const transactionFee = BASE_TX_FEE + representativeInstructionCount * PER_INSTRUCTION_FEE;

    const accountCreation = rentForMintWithMetadata + rentForAta;
    const breakdown = {
      accountCreation,
      metadata: 0,
      mintTokens: transactionFee,
      priorityFee,
    };

    return {
      estimatedFee: accountCreation + transactionFee + priorityFee,
      breakdown,
    };
  } catch (error) {
    log('error', 'Failed to estimate token creation fees', error);
    // Conservative fallback
    return {
      estimatedFee: 0.01 * 1e9,
      breakdown: {
        accountCreation: 0.008 * 1e9,
        metadata: 0,
        mintTokens: 0.001 * 1e9,
        priorityFee,
      },
    };
  }
}




/**
 * Enhanced validation for production use
 * @param tokenData - The token data to validate
 * @returns Comprehensive validation result
 */
export function validateProductionTokenData(tokenData: TokenData): ValidationResult {
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
    _connection: Connection,
    needsDestinationATA: boolean,
    priorityFee: number = 0
): Promise<TransferFeeEstimation> {
    try {
        // Local heuristic: base tx fee + transfer instruction fee
        const BASE_TX_FEE = 5000; // lamports per signature
        const PER_INSTRUCTION_FEE = 2000; // heuristic for compute load
        const NUM_INSTRUCTIONS = 1; // simple transfer only
        const transferFee = BASE_TX_FEE + PER_INSTRUCTION_FEE * NUM_INSTRUCTIONS;
        
        // ATA creation fee if needed (use static rent estimate to avoid RPC)
        let accountCreationFee = 0;
        if (needsDestinationATA) {
            const RENT_EXEMPT_165 = 2039280; // lamports
            accountCreationFee = RENT_EXEMPT_165;
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
