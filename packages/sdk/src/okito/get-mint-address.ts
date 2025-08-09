import { PublicKey } from "@solana/web3.js";

/**
 * Returns the mint address for a given token on the specified Solana network.
 * If a valid token match is found, returns the value; otherwise, throws an error.
 *
 * @param token - The token symbol (e.g., "USDC", "USDT", "SOL", "DOGE", etc.)
 * @param network - "mainnet-beta" | "devnet"
 * @returns PublicKey of the mint
 */
export function getMintAddress(
  token: string,
  network: 'mainnet-beta' | 'devnet' = 'mainnet-beta'
): PublicKey {
  // Generalized mapping: add more tokens as needed
  const MINTS: Record<string, Record<string, string>> = {
    "mainnet-beta": {
      USDC: "EPjFWdd5AufqSSqeM2qN1xzy3dKTtWHv5aC88jydDxAz",
      USDT: "Es9vMFrzaCERQdaYL8xq8gLsXjE7EqE3sGzA4DMwCsxH",
      SOL: "So11111111111111111111111111111111111111112", // Wrapped SOL
      DOGE: "8xsYz5Q7mF1gcfkYVabDFJQMQqQh1gC6vA6u1g1b1QhA", // Example: Dogecoin (Solana SPL, unofficial)
      BTC: "9n4nbM75f5Ui33ZbPYXn59EwSgE8CGsHtAeTH5YFeJ9E", // Wrapped Bitcoin
      ETH: "2nd6h9A6rRz2Q2oN1KQ6Qw1Qw1Qw1Qw1Qw1Qw1Qw1Qw1", // Example: Wrapped Ethereum (replace with actual if needed)
      // Add more tokens here as needed
    },
    "devnet": {
      USDC: "BXXkv6zRCpzzB4K8GzJJwRGCqkAs7u3fTqYWMvYMgPqa",
      USDT: "C8dV1ujnpVaUYZBLsD1fGkx9pVnUo4LxGC7hB9NRWnfa",
      SOL: "So11111111111111111111111111111111111111112", // Wrapped SOL (same as mainnet)
      DOGE: "7kbnvuGBxxj8AG9qp8Scn56muWGaRaFqxg1FsRp3PaFT", // Example: Dogecoin (Solana SPL, unofficial devnet)
      BTC: "3UNBZjzQZQZQZQZQZQZQZQZQZQZQZQZQZQZQZQZQZQZQ", // Example: Wrapped Bitcoin (replace with actual devnet address)
      ETH: "4nd6h9A6rRz2Q2oN1KQ6Qw1Qw1Qw1Qw1Qw1Qw1Qw1Qw1", // Example: Wrapped Ethereum (replace with actual devnet address)
      // Add more tokens here as needed
    }
  };

  if (!(network in MINTS)) {
    throw new Error(
      `Unsupported network: ${network}. Supported: ${Object.keys(MINTS).join(', ')}`
    );
  }

  const tokenMap = MINTS[network];
  const mintAddress = tokenMap[token];

  if (mintAddress) {
    return new PublicKey(mintAddress);
  } else {
    throw new Error(
      `Unsupported token: ${token}. Supported tokens: ${Object.keys(tokenMap).join(", ")}`
    );
  }
}