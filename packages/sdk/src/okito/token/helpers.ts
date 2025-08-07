import { TokenData, FeeEstimation } from "../../types/token/launch";
import { TransferFeeEstimation } from "../../types/token/transfer";
import { Connection, TransactionMessage, SystemProgram, PublicKey } from "@solana/web3.js";
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
  connection: Connection,
  tokenData: TokenData,
  priorityFee: number = 0
): Promise<FeeEstimation> {
  try {
    // 1) Calculate account sizes and rent
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

    const rentForMintWithMetadata = await connection.getMinimumBalanceForRentExemption(
      mintLen + metadataLen
    );

    // ATA rent for payer
    const dummyMint = new PublicKey(1);
    const payer = PublicKey.default;
    const ata = getAssociatedTokenAddressSync(dummyMint, payer, false, TOKEN_2022_PROGRAM_ID);
    const rentForAta = await connection.getMinimumBalanceForRentExemption(165);

    // 2) Build a representative transaction and get fee from RPC
    const latest = await connection.getLatestBlockhash();
    const instructions = [
      // Create mint account
      SystemProgram.createAccount({
        fromPubkey: payer,
        newAccountPubkey: dummyMint,
        lamports: rentForMintWithMetadata,
        space: mintLen,
        programId: TOKEN_2022_PROGRAM_ID,
      }),
      // Init metadata pointer
      createInitializeMetadataPointerInstruction(
        dummyMint,
        payer,
        dummyMint,
        TOKEN_2022_PROGRAM_ID
      ),
      // Init mint
      createInitializeMint2Instruction(
        dummyMint,
        tokenData.decimals,
        payer,
        null,
        TOKEN_2022_PROGRAM_ID
      ),
      // Init metadata
      createMetadataInitializeInstruction({
        programId: TOKEN_2022_PROGRAM_ID,
        mint: dummyMint,
        metadata: dummyMint,
        name: tokenData.name,
        symbol: tokenData.symbol,
        uri: tokenData.imageUrl,
        mintAuthority: payer,
        updateAuthority: payer,
      }),
      // Create ATA
      createAssociatedTokenAccountInstruction(
        payer,
        ata,
        payer,
        dummyMint,
        TOKEN_2022_PROGRAM_ID
      ),
      // Mint initial supply (amount value does not affect fee sizing)
      createMintToInstruction(
        dummyMint,
        ata,
        payer,
        BigInt(1),
        [],
        TOKEN_2022_PROGRAM_ID
      ),
    ];

    const message = new TransactionMessage({
      payerKey: payer,
      recentBlockhash: latest.blockhash,
      instructions,
    }).compileToV0Message();

    const transactionFee = (await connection.getFeeForMessage(message)).value || 0;

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
