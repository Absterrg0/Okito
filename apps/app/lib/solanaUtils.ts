import { PublicKey } from "@solana/web3.js";
import nacl from 'tweetnacl'
export function generateNonce(walletAddress: string, timestamp: number): string {
  return `Sign this message to link your wallet.\n\nWallet: ${walletAddress}\nNonce: ${timestamp}`;
}

export function verifySignature(
  publicKey: string,
  signature: number[],
  message: string
): boolean {
  try {
    if (!publicKey || !signature || !message) {
      return false;
    }

    if (signature.length !== 64) {
      return false;
    }

    const publicKeyBytes = new PublicKey(publicKey).toBytes();
    const messageBytes = new TextEncoder().encode(message);
    const signatureBytes = new Uint8Array(signature);

    return nacl.sign.detached.verify(messageBytes, signatureBytes, publicKeyBytes);
  } catch {
    return false;
  }
}
