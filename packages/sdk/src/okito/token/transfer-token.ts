// Re-export from the new class-based implementation
export { transferTokens, TransferTokenOperation } from './TransferTokenOperation';
export type { TransferTokensParams, TransferResult, TransferFeeEstimation } from '../../types/token/transfer';

// Re-export fee estimation function for convenience
export async function estimateTokenTransferFee(
    connection: any,
    mint: string,
    destination: string,
    priorityFee: number = 0
): Promise<any> {
    try {
        const { PublicKey } = await import('@solana/web3.js');
        const { getAssociatedTokenAddress, getAccount } = await import('@solana/spl-token');
        
        const mintPubkey = new PublicKey(mint);
        const destPubkey = new PublicKey(destination);
        
        // Check if destination ATA exists
        const destinationAta = await getAssociatedTokenAddress(mintPubkey, destPubkey);
        let needsDestinationATA = false;
        
        try {
            await getAccount(connection, destinationAta);
        } catch {
            needsDestinationATA = true;
        }
        
        // Base transfer instruction fee
        const transferFee = 5000; // ~0.000005 SOL
        
        let accountCreationFee = 0;
        if (needsDestinationATA) {
            accountCreationFee = await connection.getMinimumBalanceForRentExemption(165);
        }

        const breakdown = {
            transfer: transferFee,
            accountCreation: accountCreationFee,
            priorityFee: priorityFee
        };

        const estimatedFee = breakdown.transfer + breakdown.accountCreation + breakdown.priorityFee;

        return {
            estimatedFee,
            breakdown
        };
    } catch (error) {
        return {
            estimatedFee: 0.005 * 1e9,
            breakdown: {
                transfer: 5000,
                accountCreation: 0,
                priorityFee
            }
        };
    }
}

