import {
    createBurnInstruction,
    getAssociatedTokenAddress,
    TOKEN_PROGRAM_ID,
} from '@solana/spl-token';
import { Connection, PublicKey } from '@solana/web3.js';
import { BaseTokenOperation, ValidationResult, FeeEstimation, } from '../core/BaseTokenOperation';
import type { BurnTokenConfig, BurnTokenResult } from '../../types/token/burn-token';
import { SignerWallet } from '../../types/custom-wallet-adapter';
import { ErrorFactory } from '../../types/errors';
import { validateAndNormalizePublicKey, validateAmount } from '../utils/sanitizers';

interface BurnOperationData {
    mintInfo: any;
    senderTokenAccount: any;
    rawAmount: bigint;
    ownerAta: PublicKey;
    decimals: number;
    humanReadableAmount: number;
    isNativeSOL: boolean;
    totalSupplyBefore: bigint;
}

/**
 * Specialized burn operation class that extends BaseTokenOperation
 */
export class BurnTokenOperation extends BaseTokenOperation<BurnTokenConfig, BurnTokenResult> {
    private mint: string;
    private amount: bigint;

    constructor(connection: Connection, wallet: SignerWallet, mint: string, amount: bigint, config: BurnTokenConfig) {
        super(connection, wallet, config || {});
        this.mint = mint;
        this.amount = amount;
    }

    protected getOperationName(): string {
        return 'Token Burn';    
    }

    protected async validateParameters(): Promise<ValidationResult> {
        const errors: string[] = [];
        const warnings: string[] = [];

        this.operationLogger.debug('Validating burn parameters', {
            mint: this.mint,
            amount: this.amount.toString()
        });

        // Enhanced mint address validation
        const mintValidation = validateAndNormalizePublicKey(this.mint);
        if (!mintValidation.isValid) {
            errors.push(`Invalid mint address: ${mintValidation.error}`);
        }

        // Enhanced amount validation
        const amountValidation = validateAmount(this.amount);
        if (!amountValidation.isValid) {
            errors.push(`Invalid burn amount: ${amountValidation.error}`);
        }

        // Burn-specific safety validations
        if (amountValidation.isValid && amountValidation.normalized) {
            const amount = amountValidation.normalized;
            
            // Extremely large burn amounts warning
            if (amount > BigInt('1000000000000000000')) { // 1 quintillion
                warnings.push('Burn amount is extremely large - this will permanently destroy tokens');
            }
            
            // Total burn warning
            if (amount > BigInt('100000000000000')) { // 100 trillion
                warnings.push('Large burn detected - ensure this is intentional as tokens will be permanently destroyed');
            }
            
            // Dust amounts warning  
            if (amount < BigInt('1000')) {
                warnings.push('Burn amount is very small, transaction fees may exceed value');
            }
        }

        // Check if this might be a mistake (burning entire supply)
        if (this.config.strictValidation) {
            warnings.push('Strict validation enabled - burn operation will include additional safety checks');
        }

        this.operationLogger.debug('Parameter validation completed', {
            errors: errors.length,
            warnings: warnings.length,
            valid: errors.length === 0
        });

        return {
            isValid: errors.length === 0,
            errors,
            warnings: warnings.length > 0 ? warnings : undefined
        };
    }

    protected async prepareOperationData(): Promise<BurnOperationData> {
        this.operationLogger.debug('Preparing burn operation data');
        
        // Get mint info with detailed error handling
        let mintInfo: any;
        try {
            mintInfo = await this.getMintInfo(this.mint);
            this.operationLogger.debug('Mint info retrieved', {
                decimals: mintInfo.decimals,
                supply: mintInfo.supply.toString(),
                mintAuthority: mintInfo.mintAuthority?.toString(),
                freezeAuthority: mintInfo.freezeAuthority?.toString()
            });
        } catch (error: any) {
            this.operationLogger.error('Failed to retrieve mint info', error);
            throw ErrorFactory.invalidTokenData('mint', `Invalid or non-existent token mint: ${this.mint}`, this.getErrorContext());
        }

        // Check if this is native SOL (wrapped SOL has special handling)
        const isNativeSOL = this.mint === 'So11111111111111111111111111111111111111112';
        
        // Get sender's token account with detailed validation
        let senderTokenAccount: any;
        try {
            senderTokenAccount = await this.getTokenAccount(this.mint, this.wallet.publicKey!);
            this.operationLogger.debug('Token account found', {
                balance: senderTokenAccount.amount.toString(),
                owner: senderTokenAccount.owner.toString(),
                mint: senderTokenAccount.mint.toString()
            });
        } catch (error: any) {
            this.operationLogger.error('Token account not found', error);
            throw ErrorFactory.insufficientFunds(0, 0, {
                ...this.getErrorContext(),
                additionalData: { 
                    reason: 'No token account found for this mint',
                    mint: this.mint
                }
            });
        }

        // Calculate amounts with precision
        const decimals = mintInfo.decimals;
        const rawAmount = this.amount; // Assume amount is already in raw units
        const humanReadableAmount = Number(rawAmount) / Math.pow(10, decimals);
        const totalSupplyBefore = mintInfo.supply;
        
        this.operationLogger.debug('Amount calculations', {
            decimals,
            rawAmount: rawAmount.toString(),
            humanReadableAmount,
            totalSupplyBefore: totalSupplyBefore.toString(),
            accountBalance: senderTokenAccount.amount.toString()
        });

        // Enhanced balance validation with detailed error reporting
        if (senderTokenAccount.amount < rawAmount) {
            const shortfall = rawAmount - senderTokenAccount.amount;
            this.operationLogger.error('Insufficient token balance for burn', undefined, {
                required: rawAmount.toString(),
                available: senderTokenAccount.amount.toString(),
                shortfall: shortfall.toString(),
                decimals
            });
            
            throw ErrorFactory.insufficientFunds(
                Number(rawAmount), 
                Number(senderTokenAccount.amount), 
                {
                    ...this.getErrorContext(),
                    additionalData: {
                        operation: 'burn',
                        tokenMint: this.mint,
                        requiredAmount: rawAmount.toString(),
                        availableAmount: senderTokenAccount.amount.toString(),
                        shortfall: shortfall.toString(),
                        decimals,
                        humanReadableShortfall: (Number(shortfall) / Math.pow(10, decimals)).toFixed(decimals)
                    }
                }
            );
        }

        // Safety check for large burns (relative to total supply)
        if (this.config.strictValidation && totalSupplyBefore > 0) {
            const burnPercentage = (Number(rawAmount) / Number(totalSupplyBefore)) * 100;
            if (burnPercentage > 50) {
                this.operationLogger.warn('Large burn detected relative to total supply', {
                    burnPercentage: burnPercentage.toFixed(2),
                    rawAmount: rawAmount.toString(),
                    totalSupply: totalSupplyBefore.toString()
                });
            }
        }

        // Get Associated Token Account address
        const mintPubkey = new PublicKey(this.mint);
        const ownerAta = await getAssociatedTokenAddress(
            mintPubkey, 
            this.wallet.publicKey!, 
            false,
            isNativeSOL ? TOKEN_PROGRAM_ID : undefined
        );

        this.operationLogger.debug('Burn operation data prepared', {
            ownerATA: ownerAta.toString(),
            burnAmount: humanReadableAmount,
            isNativeSOL
        });

        return {
            mintInfo,
            senderTokenAccount,
            rawAmount,
            ownerAta,
            decimals,
            humanReadableAmount,
            isNativeSOL,
            totalSupplyBefore
        };
    }

    protected async estimateFees(operationData: BurnOperationData): Promise<FeeEstimation> {
        this.operationLogger.debug('Estimating burn fees (local heuristic)');
        
        // Local-only heuristic: base tx + one burn instruction + small wSOL overhead
        const BASE_TX_FEE = 5000; // lamports
        const PER_INSTRUCTION_FEE = 2000; // lamports per instruction
        const NUM_INSTRUCTIONS = 1; // burn

        const priorityFee = this.config.priorityFee || 0;
        const additionalFees = operationData.isNativeSOL ? 500 : 0; // minor overhead for wSOL

        const burnInstructionFee = PER_INSTRUCTION_FEE * NUM_INSTRUCTIONS;
        const baseFee = BASE_TX_FEE;

        const breakdown = {
            baseFee,
            burnInstruction: burnInstructionFee,
            priorityFee,
            additionalFees,
            total: baseFee + burnInstructionFee + priorityFee + additionalFees
        } as const;

        const estimatedFee = breakdown.total;

        this.operationLogger.debug('Fee estimation completed', {
            breakdown,
            estimatedFee,
            isNativeSOL: operationData.isNativeSOL
        });

        return {
            estimatedFee,
            breakdown
        };
    }

    protected async buildInstructions(operationData: BurnOperationData): Promise<any[]> {
        this.operationLogger.debug('Building burn instructions');
        
        const { rawAmount, ownerAta, isNativeSOL } = operationData;
        const mintPubkey = new PublicKey(this.mint);
        
        this.operationLogger.debug('Creating burn instruction', {
            tokenAccount: ownerAta.toString(),
            mint: mintPubkey.toString(),
            owner: this.wallet.publicKey!.toString(),
            amount: rawAmount.toString(),
            isNativeSOL
        });
        
        try {
            const burnInstruction = createBurnInstruction(
                ownerAta,               // Token account to burn from
                mintPubkey,             // Mint address  
                this.wallet.publicKey!, // Owner of the token account
                rawAmount,              // Amount to burn in raw token units
                [],                     // Multi-signers (empty for single signature)
                isNativeSOL ? TOKEN_PROGRAM_ID : undefined
            );
            
            this.operationLogger.info('Burn instruction created successfully', {
                burnAmount: operationData.humanReadableAmount,
                rawAmount: rawAmount.toString()
            });
            
            return [burnInstruction];
        } catch (error: any) {
            this.operationLogger.error('Failed to create burn instruction', error);
            throw ErrorFactory.transactionFailed(undefined, error, {
                ...this.getErrorContext(),
                additionalData: {
                    stage: 'instruction_building',
                    instructionType: 'burn',
                    amount: rawAmount.toString(),
                    tokenAccount: ownerAta.toString()
                }
            });
        }
    }

    protected async buildSuccessResult(
        txId: string, 
        feeEstimation: FeeEstimation, 
        operationData: BurnOperationData
    ): Promise<BurnTokenResult> {
        const totalTime = Date.now() - this.startTime;
        
        // Get updated token account balance for verification
        let newBalance: bigint | undefined;
        try {
            const updatedAccount = await this.getTokenAccount(this.mint, this.wallet.publicKey!);
            newBalance = updatedAccount.amount;
        } catch (error) {
            this.operationLogger.warn('Could not fetch updated balance after burn', { error });
        }

        const result: BurnTokenResult = {
            success: true,
            transactionId: txId,
            estimatedFee: feeEstimation.estimatedFee,
            confirmationTime: totalTime,
            
        };

        this.operationLogger.info('Token burn completed successfully', {
            transactionId: txId,
            burnedAmount: operationData.humanReadableAmount,
            decimals: operationData.decimals,
            newBalance: newBalance?.toString(),
            totalTime
        });

        return result;
    }
}

/**
 * Enhanced factory function with production-grade validation and error handling
 */
export default async function burnToken(
    connection: Connection,
    wallet: SignerWallet,
    mint: string,
    amount: bigint | string | number,
    config?: BurnTokenConfig
): Promise<BurnTokenResult> {
    // Input validation before creating operation
    if (!connection) {
        throw ErrorFactory.invalidTokenData('connection', 'Connection is required');
    }
    
    if (!wallet) {
        throw ErrorFactory.walletNotConnected();
    }
    
    if (!mint || typeof mint !== 'string') {
        throw ErrorFactory.invalidTokenData('mint', 'Valid mint address is required');
    }

    // Enhanced amount normalization with validation
    let normalizedAmount: bigint;
    try {
        if (typeof amount === 'bigint') {
            normalizedAmount = amount;
        } else if (typeof amount === 'string') {
            if (amount.includes('.')) {
                throw new Error('Amount string cannot contain decimals - provide amount in base units');
            }
            normalizedAmount = BigInt(amount);
        } else if (typeof amount === 'number') {
            if (!Number.isInteger(amount) || amount < 0) {
                throw new Error('Amount number must be a positive integer');
            }
            normalizedAmount = BigInt(amount);
        } else {
            throw new Error('Amount must be a bigint, string, or number');
        }
        
        if (normalizedAmount <= 0) {
            throw new Error('Burn amount must be greater than zero');
        }
        
    } catch (error: any) {
        throw ErrorFactory.invalidTokenData('amount', `Invalid burn amount: ${error.message}`);
    }

    // Merge with production defaults
    const productionConfig: BurnTokenConfig = {
        enableLogging: true,
        enableSimulation: true,
        enableMetrics: true,
        maxRetries: 3,
        timeoutMs: 60000, // 1 minute for burns
        confirmationStrategy: 'confirmed',
        strictValidation: true,
        ...config
    } as BurnTokenConfig;

    try {
        const operation = new BurnTokenOperation(connection, wallet, mint, normalizedAmount, productionConfig);
        return await operation.execute();
    } catch (error: any) {
        // Enhanced error handling with context
        if (error instanceof Error && !(error.name === 'TokenLaunchError')) {
            throw ErrorFactory.networkError(error, {
                additionalData: {
                    operation: 'token_burn',
                    mint,
                    amount: normalizedAmount.toString()
                }
            });
        }
        throw error;
    }
} 