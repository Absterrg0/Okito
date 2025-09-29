import { PublicKey } from "@solana/web3.js";
import { NextResponse } from "next/server";
export function getMintAddress(
    token: string,
    network: 'mainnet-beta' | 'devnet' = 'mainnet-beta'
  ): PublicKey {
    const MINTS: Record<string, Record<string, string>> = {
      "mainnet-beta": {
        USDC: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
        USDT: "Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB",
      },
      "devnet": {
        USDC: "4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU",
        USDT: "2tWC4JAdL4AxEFJySziYJfsAnW2MHKRo98vbAPiRDSk8",
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




