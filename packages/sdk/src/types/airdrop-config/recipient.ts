/**
 * Single airdrop recipient data
 */
export interface AirdropRecipient {
    address: string; // Recipient wallet address
    amount: bigint | string | number; // Amount in human-readable format (e.g., 10.5 for tokens with decimals)
}
