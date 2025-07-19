import { PublicKey } from "@solana/web3.js";

/**
 * Tokens supported by Okito SDK.
 */
export type OkitoToken = "USDC" | "USDT";

/**
 * Allowed Solana network environments.
 */
export type OkitoNetwork = "mainnet-beta" | "devnet" | "custom";

/**
 * User-defined config structure for `okito.config.ts`
 * 
 * - If network is "mainnet-beta" or "devnet", `rpcUrl` must not be provided.
 * - If network is "custom", `rpcUrl` is required.
 */
export type OkitoConfig =
  | {
      network: "mainnet-beta" | "devnet";
      rpcUrl?: never;
      publicKey: string;
      tokens: [OkitoToken] | [OkitoToken, OkitoToken];
    }
  | {
      network: "custom";
      rpcUrl: string;
      publicKey: string;
      tokens: [OkitoToken] | [OkitoToken, OkitoToken];
    };


export type OkitoResolvedConfig = {
  network: OkitoNetwork;
  rpcUrl: string;
  publicKey: PublicKey;
  tokens: [OkitoToken] | [OkitoToken, OkitoToken];
};
