import { PublicKey } from '@solana/web3.js';
import nacl from 'tweetnacl';
export function verifySignature(
  publicKey: string, 
  signature: number[], 
  message: string
): boolean {
  try {

    
    // Validate inputs
    if (!publicKey || !signature || !message) {
      return false;
    }
    
    if (signature.length !== 64) {
      return false;
    }
    
    // Convert public key string to bytes
    const publicKeyBytes = new PublicKey(publicKey).toBytes();
    
    // Convert message to bytes
    const messageBytes = new TextEncoder().encode(message);
    
    // Convert signature array to Uint8Array
    const signatureBytes = new Uint8Array(signature);
    
    // Verify the signature using tweetnacl
    return nacl.sign.detached.verify(messageBytes, signatureBytes, publicKeyBytes);
  } catch (error) {
    return false;
  }
}

export function generateNonce(walletAddress?: string, timestamp?: number): string {
  const currentTimestamp = timestamp || Date.now();
  // Use a simpler message format that's more compatible with Solana wallets
  const baseMessage = `Verify your wallet ${walletAddress}`;
  
  return baseMessage;
}


