// Local-only estimation; no TransactionMessage or RPC usage here

// Re-export from the new class-based implementation
export { transferTokens, TransferTokenOperation } from './TransferTokenOperation';
export type { TransferTokensParams, TransferResult, TransferFeeEstimation } from '../../types/token/transfer';

// Re-export fee estimation function for convenience
export async function estimateTokenTransferFee(
    _connection: any,
    mint: string,
    destination: string,
    priorityFee: number = 0
): Promise<any> {
    // Local heuristic: base tx + instruction fee + optional ATA rent
    const { PublicKey } = await import('@solana/web3.js');
    const { getAssociatedTokenAddress } = await import('@solana/spl-token');

    const mintPubkey = new PublicKey(mint);
    const destPubkey = new PublicKey(destination);
    const destinationAta = await getAssociatedTokenAddress(mintPubkey, destPubkey);
    // We cannot check chain for existence without RPC; assume not exists if caller wants conservative
    // Provide a conservative default: treat as not exists only if caller passes a special hint? Keep simple: assume exists
    const needsDestinationATA = false;

    const BASE_TX_FEE = 5000;
    const PER_INSTRUCTION_FEE = 2000;
    const NUM_INSTRUCTIONS = 1 + (needsDestinationATA ? 1 : 0);
    const accountCreationFee = needsDestinationATA ? 2039280 : 0;

    const breakdown = {
        base: BASE_TX_FEE,
        instructions: PER_INSTRUCTION_FEE * NUM_INSTRUCTIONS,
        accountCreation: accountCreationFee,
        priorityFee
    } as const;

    const estimatedFee = breakdown.base + breakdown.instructions + breakdown.accountCreation + breakdown.priorityFee;

    return {
        estimatedFee,
        breakdown,
        destinationAta: destinationAta.toString(),
        assumedDestinationAtaExists: !needsDestinationATA
    };
}

