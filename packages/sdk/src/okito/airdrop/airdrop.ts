// Re-export from the new class-based implementation
export { airdropTokensToMultiple, airdropTokenToAddress, AirdropOperation } from './AirdropOperation';
export type { AirdropConfig, AirdropRecipient, AirdropResult } from '../../types/airdrop/drop';
import {log} from '../utils/logger';
import { airdropTokensToMultiple } from './AirdropOperation';

/**
 * Batch airdrop function for large-scale distributions
 * Automatically splits large recipient lists into manageable chunks
 */
export async function airdropTokensBatch(
    connection: any,
    wallet: any,
    mint: string,
    recipients: any[],
    config: any = {}
): Promise<any[]> {
    const {
        batchSize = 25, // Conservative batch size to avoid transaction size limits
        delayBetweenBatches = 2000, // 2 second delay between batches
        enableLogging = true,
        ...airdropConfig
    } = config;

    if (enableLogging) {
        log('info', 'Starting batch airdrop', {
            totalRecipients: recipients.length,
            batchSize,
            estimatedBatches: Math.ceil(recipients.length / batchSize)
        });
    }

    const results: any[] = [];
    const errors: { batchIndex: number; error: string }[] = [];

    // Split recipients into batches
    for (let i = 0; i < recipients.length; i += batchSize) {
        const batch = recipients.slice(i, i + batchSize);
        const batchIndex = Math.floor(i / batchSize);
        
        try {
            if (enableLogging) {
                log('info', `Processing batch ${batchIndex + 1}/${Math.ceil(recipients.length / batchSize)}`, {
                    batchSize: batch.length,
                    startIndex: i
                });
            }

            const result = await airdropTokensToMultiple({connection, wallet, mint, batch, ...airdropConfig, enableLogging: false });
            
            results.push(result);

            // Add delay between batches except for the last one
            if (i + batchSize < recipients.length) {
                await new Promise(resolve => setTimeout(resolve, delayBetweenBatches));
            }

        } catch (error: any) {
            const errorMsg = error.message || 'Unknown error';
            errors.push({ batchIndex, error: errorMsg });
            
            // Add failed result to maintain array consistency
            results.push({
                success: false,
                error: errorMsg,
                estimatedFee: 0,
                actualFee: 0,
                confirmationTime: 0,
                recipientsProcessed: 0,
                accountsCreated: 0
            });

            if (enableLogging) {
                log('error', `Batch ${batchIndex + 1} failed`, {
                    batchSize: batch.length,
                    error: errorMsg
                });
            }
        }
    }

    if (enableLogging) {
        const successfulBatches = results.filter(r => r.success).length;
        const totalRecipients = results.reduce((sum, r) => sum + (r.recipientsProcessed || 0), 0);
        
        log('info', 'Batch airdrop completed', {
            totalBatches: results.length,
            successfulBatches,
            failedBatches: errors.length,
            totalRecipientsProcessed: totalRecipients
        });

        if (errors.length > 0) {
            log('warn', 'Some batches failed', errors);
        }
    }

    return results;
} 