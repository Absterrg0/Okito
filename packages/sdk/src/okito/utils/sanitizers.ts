import { PublicKey } from "@solana/web3.js";

/**
 * Validates URL format
 */
export function isValidUrl(url: string): boolean {
    try {
        const urlObj = new URL(url);
        return ['http:', 'https:'].includes(urlObj.protocol);
    } catch {
        return false;
    }
}

/**
 * Validates mint address format
 */
export function isValidMintAddress(address: string): boolean {
    try {
        new PublicKey(address);
        return true;
    } catch {
        return false;
    }
}

/**
 * Sanitizes text input to prevent injection attacks
 */
export function sanitizeText(text: string, maxLength: number = 100): string {
    return text
        .trim()
        .replace(/[<>'"&]/g, '') // Remove potentially dangerous characters
        .substring(0, maxLength);
}
