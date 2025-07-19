import { PublicKey } from "@solana/web3.js";

/**
 * Returns the canonical mint address for USDC or USDT on the specified Solana network.
 * Throws if the mint or network is invalid.
 *
 * @param mint - "USDC" or "USDT"
 * @param network - "mainnet-beta" | "devnet" | "custom"
 * @returns PublicKey of the mint
 */
export function getMintAddress(
  mint: "USDC" | "USDT",
  network: "mainnet-beta" | "devnet" | "custom"
): PublicKey {

  const resolvedNetwork = network === "custom" ? "mainnet-beta" : network;

  const MINTS: Record<
    "mainnet-beta" | "devnet",
    Record<"USDC" | "USDT", PublicKey>
  > = {
    "devnet": {
      USDC: new PublicKey("BXXkv6zRCpzzB4K8GzJJwRGCqkAs7u3fTqYWMvYMgPqa"),
      USDT: new PublicKey("C8dV1ujnpVaUYZBLsD1fGkx9pVnUo4LxGC7hB9NRWnfa"),
    },
    "mainnet-beta": { 
      USDC: new PublicKey("EPjFWdd5AufqSSqeM2qN1xzy3dKTtWHv5aC88jydDxAz"),
      USDT: new PublicKey("Es9vMFrzaCERQdaYL8xq8gLsXjE7EqE3sGzA4DMwCsxH"),
    },
  };

  if (!(resolvedNetwork in MINTS)) {
    throw new Error(
      `Unsupported network: ${network}. Supported: mainnet-beta, devnet, custom`
    );
  }
  if (!(mint in MINTS[resolvedNetwork])) {
    throw new Error(
      `Unsupported mint: ${mint}. Supported: USDC, USDT`
    );
  }

  return MINTS[resolvedNetwork][mint];
}