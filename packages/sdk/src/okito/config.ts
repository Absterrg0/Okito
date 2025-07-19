/**
 * Okito SDK Config Logic
 * Handles config validation, resolution, and global storage for the OkitoProvider.
 *
 * @module config
 */
import { clusterApiUrl, PublicKey } from "@solana/web3.js";
import type { OkitoResolvedConfig, OkitoConfig } from "../types/config";


/**
 * Validates and resolves the user's Okito config.
 *
 * @param config - The user-defined OkitoConfig object.
 * @returns The resolved OkitoResolvedConfig object.
 */
export function validateAndResolveOkitoConfig(config: OkitoConfig): OkitoResolvedConfig {
  // Clone to avoid mutating the imported config
  const cfg = { ...config } as OkitoConfig;

  const { network, publicKey, tokens, rpcUrl } = cfg;

  if (!["mainnet-beta", "devnet", "custom"].includes(network)) {
    throw new Error(`Invalid network: ${network}`);
  }

  if (network === "custom" && !rpcUrl) {
    throw new Error("Custom network requires rpcUrl.");
  }

  // Remove rpcUrl for standard networks
  if ((network === "mainnet-beta" || network === "devnet") && rpcUrl) {
    delete (cfg as any).rpcUrl;
  }

  let destinationPublicKey: PublicKey;
  try {
    destinationPublicKey = new PublicKey(publicKey);
  } catch {
    throw new Error("publicKey is not a valid Solana public key.");
  }

  if (
    !Array.isArray(tokens) ||
    tokens.length < 1 ||
    tokens.length > 2 ||
    !tokens.every((t) => t === "USDC" || t === "USDT")
  ) {
    throw new Error("Only USDC or USDT are supported in tokens array.");
  }

  return {
    network,
    rpcUrl: network === "custom" ? rpcUrl : clusterApiUrl(network),
    publicKey: destinationPublicKey,
    tokens: [...tokens], // Defensive copy
  };
}