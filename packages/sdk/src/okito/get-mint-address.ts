import { PublicKey } from "@solana/web3.js";

/**
 * Returns the mint address for a given token on the specified Solana network.
 * If a valid token match is found, returns the value; otherwise, throws an error.
 *
 * @param token - The token symbol (e.g., "USDC", "USDT", etc.)
 * @param network - "mainnet-beta" | "devnet" | "custom"
 * @returns PublicKey of the mint
 */
export function getMintAddress(
  token: string,
  network: "mainnet-beta" | "devnet" | "custom"
): PublicKey {
  // For custom, fallback to mainnet-beta mapping
  const resolvedNetwork = network === "custom" ? "mainnet-beta" : network;

  // Generalized mapping: add more tokens as needed
  const MINTS: Record<string, Record<string, string>> = {
    "mainnet-beta": {
      USDC: "EPjFWdd5AufqSSqeM2qN1xzy3dKTtWHv5aC88jydDxAz",
      USDT: "Es9vMFrzaCERQdaYL8xq8gLsXjE7EqE3sGzA4DMwCsxH",
      // Add more tokens here as needed
    },
    "devnet": {
      USDC: "BXXkv6zRCpzzB4K8GzJJwRGCqkAs7u3fTqYWMvYMgPqa",
      USDT: "C8dV1ujnpVaUYZBLsD1fGkx9pVnUo4LxGC7hB9NRWnfa",
      // Add more tokens here as needed
    }
  };

  if (!(resolvedNetwork in MINTS)) {
    throw new Error(
      `Unsupported network: ${network}. Supported: ${Object.keys(MINTS).join(", ")} or custom`
    );
  }

  const tokenMap = MINTS[resolvedNetwork];
  const mintAddress = tokenMap[token];

  if (mintAddress) {
    return new PublicKey(mintAddress);
  } else {
    throw new Error(
      `Unsupported token: ${token}. Supported tokens: ${Object.keys(tokenMap).join(", ")}`
    );
  }
}