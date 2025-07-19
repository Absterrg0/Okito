// Re-export from the new class-based implementation
export { burnToken, BurnTokenOperation } from './BurnTokenOperation';
export type { BurnTokenConfig, BurnTokenResult } from '../../types/token/burn-token';

// Re-export fee estimation function for convenience
export async function estimateBurnFee(
    connection: any,
    priorityFee: number = 0
): Promise<{ estimatedFee: number; breakdown: { burn: number; priorityFee: number } }> {
    const burnFee = 5000; // ~0.000005 SOL for burn instruction
    
    const breakdown = {
        burn: burnFee,
        priorityFee: priorityFee
    };
    
    const estimatedFee = breakdown.burn + breakdown.priorityFee;
    
    return {
        estimatedFee,
        breakdown
    };
}