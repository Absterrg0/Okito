import { type OkitoConfig, type OkitoResolvedConfig } from "@/types"
import { clusterApiUrl, PublicKey } from "@solana/web3.js";





/**
 * Configuration utilities for the Okito UI package.
 * Validates and normalizes user-supplied configuration for consistent usage across components.
 */
/**
 * Validates an `OkitoConfig` and returns a normalized `OkitoResolvedConfig`.
 *
 * Rules:
 * - `network` must be one of: `'mainnet-beta' | 'devnet' | 'custom'`
 * - `rpcUrl` is required when `network === 'custom'`
 * - `destinationKey` must be a valid base58-encoded Solana public key
 * - `tokens` must be an array of length 1..2 and each value must be `'USDC'` or `'USDT'`
 *
 * @param {OkitoConfig} config Input configuration.
 * @returns {OkitoResolvedConfig} Resolved configuration with a parsed `PublicKey` and resolved RPC URL.
 * @throws {Error} If validation fails (invalid network, missing rpcUrl for custom, invalid destination key, unsupported tokens).
 *
 * @example
 * const cfg = createConfig({
 *   network: 'devnet',
 *   rpcUrl: undefined,
 *   destinationKey: 'Fg6PaFpoGXkYsidMpWxTWq...example',
 *   tokens: ['USDC']
 * })
 */
export function createConfig(config:OkitoConfig):OkitoResolvedConfig{
   const {network,rpcUrl,destinationKey,tokens} = config;

   if(!['mainnet-beta','devnet','custom'].includes(network)){
    throw new Error(`Invalid network: ${network}`);
   }
   if(network === 'custom' && !rpcUrl){
        throw new Error("RPC Url required for custom endpoint")
   }
   

   let publicKey:PublicKey;

   try{
    publicKey = new PublicKey(destinationKey);
   }catch(error){
    throw new Error("Invalid destination key")
   }

   if (
    !Array.isArray(tokens) ||
    tokens.length < 1 ||
    tokens.length > 2 ||
    !tokens.every((t) => t === "USDC" || t === "USDT")
  ) {
    throw new Error("Only USDC or USDT are supported in tokens array.");
  }

  const storedConfig:OkitoResolvedConfig = {
    network,
    rpcUrl: network === 'custom' ? rpcUrl : clusterApiUrl(network),
    destinationKey: publicKey,
    tokens:[...tokens]
   }
   return storedConfig 
}