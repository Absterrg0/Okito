import { PublicKey } from "@solana/web3.js";
export function getMintAddress(
    token: string,
    network: 'mainnet-beta' | 'devnet' = 'mainnet-beta'
  ): PublicKey {
    const MINTS: Record<string, Record<string, string>> = {
      "mainnet-beta": {
        USDC: "EPjFWdd5AufqSSqeM2qN1xzy3dKTtWHv5aC88jydDxAz",
        USDT: "Es9vMFrzaCERQdaYL8xq8gLsXjE7EqE3sGzA4DMwCsxH",
      },
      "devnet": {
        USDC: "BXXkv6zRCpzzB4K8GzJJwRGCqkAs7u3fTqYWMvYMgPqa",
        USDT: "C8dV1ujnpVaUYZBLsD1fGkx9pVnUo4LxGC7hB9NRWnfa",
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

