import { Connection } from "@solana/web3.js";
import { getMintAddress } from "../get-mint-address";
import { transferTokens } from "../token/transfer-token";

import type { OkitoResolvedConfig } from "../../types/config";
import type { SignerWallet } from "../../types/custom-wallet-adapter";

/**
 * Executes a token payment to the configured merchant.
 * 
 * @param connection - Solana connection instance
 * @param wallet - Custom WalletContextState interface
 * @param amount - Number of tokens to pay (e.g., 2.5)
 * @param token - Token type (USDC/USDT)
 * @param config - The OkitoResolvedConfig containing destination and token info
 * @returns The transaction signature string
 */
export async function pay(
  connection: Connection,
  wallet: SignerWallet,
  amount: number,
  token: "USDC" | "USDT",
  config: OkitoResolvedConfig
): Promise<string> {
  if (!wallet?.publicKey || !wallet.signTransaction) {
    throw new Error("Wallet not connected");
  }

  const selectedToken = token || config.tokens[0];
  const mint = getMintAddress(selectedToken, config.network);
  
  // Convert human-readable amount to raw token amount (6 decimals for USDC/USDT)
  const rawAmount = BigInt(Math.floor(amount * 1_000_000));

  const result = await transferTokens({
    connection,
    wallet,
    mint: mint.toString(),
    destination: config.publicKey.toString(),
    amount: rawAmount,
    config: {
      enableLogging: false,
      enableSimulation: true,
      validateBalance: true,
      createDestinationATA: true,
      confirmationStrategy: "confirmed"
    }
  });

  if (!result.success) {
    throw new Error(result.error || "Payment failed");
  }

  return result.transactionId!;
}
