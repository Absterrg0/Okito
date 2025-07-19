import { Connection } from "@solana/web3.js";

import { TokenLaunchError, TokenLaunchErrorCode } from "../../types/errors";
import { log } from "./logger";

/**
 * Checks connection health
 */
export async function checkConnectionHealth(connection: Connection): Promise<boolean> {
    try {
        const startTime = Date.now();
        await connection.getLatestBlockhash('processed');
        const responseTime = Date.now() - startTime;
        
        // Consider connection healthy if response time is under 5 seconds
        return responseTime < 5000;
    } catch {
        return false;
    }
}



/**
 * Confirms transaction with timeout and retry logic
 */
export async function confirmTransactionWithRetry(
    connection: Connection,
    signature: string,
    blockhash: string,
    lastValidBlockHeight: number,
    strategy: 'processed' | 'confirmed' | 'finalized' = 'confirmed',
    timeoutMs: number = 30000
): Promise<void> {
    const startTime = Date.now();
    
    while (Date.now() - startTime < timeoutMs) {
        try {
            const confirmation = await connection.confirmTransaction({
                signature,
                blockhash,
                lastValidBlockHeight
            }, strategy);

            if (confirmation.value.err) {
                throw new TokenLaunchError(
                    TokenLaunchErrorCode.TRANSACTION_FAILED,
                    'Transaction failed during confirmation',
                    confirmation.value.err
                );
            }
            
            return; // Success
        } catch (error: any) {
            if (error instanceof TokenLaunchError) {
                throw error;
            }
            
            // If it's a network error, retry after a short delay
            if (Date.now() - startTime < timeoutMs - 2000) {
                await new Promise(resolve => setTimeout(resolve, 1000));
                continue;
            }
            
            throw new TokenLaunchError(
                TokenLaunchErrorCode.TIMEOUT,
                'Transaction confirmation timed out',
                error
            );
        }
    }
    
    throw new TokenLaunchError(
        TokenLaunchErrorCode.TIMEOUT,
        `Transaction confirmation timed out after ${timeoutMs}ms`
    );
}



/**
 * Executes function with retry logic
 */
export async function withRetry<T>(
    fn: () => Promise<T>,
    maxRetries: number = 3,
    enableLogging: boolean = false
): Promise<T> {
    let lastError: any;
    
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            return await fn();
        } catch (error: any) {
            lastError = error;
            
            if (enableLogging) {
                log('warn', `Attempt ${attempt}/${maxRetries} failed`, error.message);
            }
            
            // Don't retry on certain errors
            if (error instanceof TokenLaunchError) {
                const nonRetryableCodes = [
                    TokenLaunchErrorCode.WALLET_NOT_CONNECTED,
                    TokenLaunchErrorCode.INVALID_TOKEN_DATA,
                    TokenLaunchErrorCode.INVALID_URL,
                    TokenLaunchErrorCode.AUTHORITY_VALIDATION_FAILED
                ];
                
                if (nonRetryableCodes.includes(error.code)) {
                    throw error;
                }
            }
            
            if (attempt < maxRetries) {
                // Exponential backoff
                const delay = Math.min(1000 * Math.pow(2, attempt - 1), 5000);
                await new Promise(resolve => setTimeout(resolve, delay));
            }
        }
    }
    
    throw lastError;
}