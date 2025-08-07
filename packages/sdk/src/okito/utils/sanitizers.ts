import { PublicKey } from "@solana/web3.js";
import { TokenLaunchErrorCode } from "../../types/errors";

/**
 * Production-grade input validation and sanitization utilities
 */

/**
 * URL validation options
 */
interface UrlValidationOptions {
    allowedProtocols?: string[];
    allowedDomains?: string[];
    maxLength?: number;
    requireSecure?: boolean;
}

/**
 * Enhanced URL validation with security checks
 */
export function isValidUrl(url: string, options: UrlValidationOptions = {}): boolean {
    if (!url || typeof url !== 'string') {
        return false;
    }

    const {
        allowedProtocols = ['http:', 'https:'],
        allowedDomains = [],
        maxLength = 2048,
        requireSecure = false
    } = options;

    try {
        // Check length
        if (url.length > maxLength) {
            return false;
        }

        const urlObj = new URL(url);
        
        // Check protocol
        if (!allowedProtocols.includes(urlObj.protocol)) {
            return false;
        }

        // Check if secure protocol is required
        if (requireSecure && urlObj.protocol !== 'https:') {
            return false;
        }

        // Check allowed domains if specified
        if (allowedDomains.length > 0) {
            const isAllowedDomain = allowedDomains.some(domain => 
                urlObj.hostname === domain || urlObj.hostname.endsWith('.' + domain)
            );
            if (!isAllowedDomain) {
                return false;
            }
        }

        // Additional security checks
        if (urlObj.hostname === 'localhost' || 
            urlObj.hostname.startsWith('127.') || 
            urlObj.hostname.startsWith('192.168.') ||
            urlObj.hostname.startsWith('10.') ||
            urlObj.hostname.startsWith('172.')) {
            // Block local/private IPs in production
            return false;
        }

        return true;
    } catch {
        return false;
    }
}

/**
 * Validates and normalizes Solana public key
 */
export function validateAndNormalizePublicKey(address: string | PublicKey): {
    isValid: boolean;
    normalized?: string;
    publicKey?: PublicKey;
    error?: string;
} {
    try {
        if (!address) {
            return { isValid: false, error: 'Address is required' };
        }

        let pubkey: PublicKey;
        
        if (typeof address === 'string') {
            // Trim whitespace
            const trimmed = address.trim();
            
            // Check basic format
            if (!/^[A-HJ-NP-Z1-9]{32,44}$/.test(trimmed)) {
                return { isValid: false, error: 'Invalid address format' };
            }
            
            pubkey = new PublicKey(trimmed);
        } else {
            pubkey = address;
        }

        // Additional validation
        if (pubkey.equals(PublicKey.default)) {
            return { isValid: false, error: 'Default public key not allowed' };
        }

        return {
            isValid: true,
            normalized: pubkey.toString(),
            publicKey: pubkey
        };
    } catch (error: any) {
        return { 
            isValid: false, 
            error: `Invalid public key format: ${error.message}` 
        };
    }
}

/**
 * Legacy function for backward compatibility
 */
export function isValidMintAddress(address: string): boolean {
    return validateAndNormalizePublicKey(address).isValid;
}

/**
 * Text sanitization options
 */
interface TextSanitizationOptions {
    maxLength?: number;
    allowedCharacters?: RegExp;
    removeHtml?: boolean;
    removeNewlines?: boolean;
    removeExtraSpaces?: boolean;
    preventXss?: boolean;
}

/**
 * Enhanced text sanitization with configurable options
 */
export function sanitizeText(text: string, options: TextSanitizationOptions = {}): string {
    if (!text || typeof text !== 'string') {
        return '';
    }

    const {
        maxLength = 1000,
        allowedCharacters,
        removeHtml = true,
        removeNewlines = false,
        removeExtraSpaces = true,
        preventXss = true
    } = options;

    let sanitized = text;

    // Trim whitespace
    sanitized = sanitized.trim();

    // Remove HTML tags if requested
    if (removeHtml) {
        sanitized = sanitized.replace(/<[^>]*>/g, '');
    }

    // Remove potentially dangerous characters for XSS prevention
    if (preventXss) {
        sanitized = sanitized.replace(/[<>'"&\x00-\x1f\x7f-\x9f]/g, '');
    }

    // Remove newlines if requested
    if (removeNewlines) {
        sanitized = sanitized.replace(/[\r\n]/g, ' ');
    }

    // Remove extra spaces
    if (removeExtraSpaces) {
        sanitized = sanitized.replace(/\s+/g, ' ').trim();
    }

    // Apply character filter if provided
    if (allowedCharacters) {
        sanitized = sanitized.replace(new RegExp(`[^${allowedCharacters.source}]`, 'g'), '');
    }

    // Truncate to max length
    if (sanitized.length > maxLength) {
        sanitized = sanitized.substring(0, maxLength).trim();
    }

    return sanitized;
}

/**
 * Validate and sanitize token symbol
 */
export function validateTokenSymbol(symbol: string): {
    isValid: boolean;
    sanitized?: string;
    error?: string;
} {
    if (!symbol || typeof symbol !== 'string') {
        return { isValid: false, error: 'Symbol is required' };
    }

    const sanitized = sanitizeText(symbol, {
        maxLength: 10,
        allowedCharacters: /A-Z0-9/,
        removeHtml: true,
        preventXss: true
    }).toUpperCase();

    if (sanitized.length === 0) {
        return { isValid: false, error: 'Symbol cannot be empty after sanitization' };
    }

    if (sanitized.length < 2) {
        return { isValid: false, error: 'Symbol must be at least 2 characters' };
    }

    if (sanitized.length > 10) {
        return { isValid: false, error: 'Symbol must be 10 characters or less' };
    }

    // Check for reserved symbols
    const reservedSymbols = ['SOL', 'USDC', 'USDT', 'BTC', 'ETH', 'NULL', 'VOID'];
    if (reservedSymbols.includes(sanitized)) {
        return { isValid: false, error: 'Symbol is reserved' };
    }

    return { isValid: true, sanitized };
}

/**
 * Validate and sanitize token name
 */
export function validateTokenName(name: string): {
    isValid: boolean;
    sanitized?: string;
    error?: string;
} {
    if (!name || typeof name !== 'string') {
        return { isValid: false, error: 'Name is required' };
    }

    const sanitized = sanitizeText(name, {
        maxLength: 32,
        allowedCharacters: /[a-zA-Z0-9\s\-_.]/,
        removeHtml: true,
        preventXss: true,
        removeExtraSpaces: true
    });

    if (sanitized.length === 0) {
        return { isValid: false, error: 'Name cannot be empty after sanitization' };
    }

    if (sanitized.length < 2) {
        return { isValid: false, error: 'Name must be at least 2 characters' };
    }

    if (sanitized.length > 32) {
        return { isValid: false, error: 'Name must be 32 characters or less' };
    }

    return { isValid: true, sanitized };
}

/**
 * Validate numeric amount with comprehensive checks
 */
export function validateAmount(amount: any): {
    isValid: boolean;
    normalized?: bigint;
    error?: string;
} {
    if (amount === null || amount === undefined) {
        return { isValid: false, error: 'Amount is required' };
    }

    try {
        let normalizedAmount: bigint;

        if (typeof amount === 'bigint') {
            normalizedAmount = amount;
        } else if (typeof amount === 'number') {
            if (!Number.isFinite(amount)) {
                return { isValid: false, error: 'Amount must be a finite number' };
            }
            if (amount < 0) {
                return { isValid: false, error: 'Amount cannot be negative' };
            }
            if (amount > Number.MAX_SAFE_INTEGER) {
                return { isValid: false, error: 'Amount too large for safe conversion' };
            }
            normalizedAmount = BigInt(Math.floor(amount));
        } else if (typeof amount === 'string') {
            const trimmed = amount.trim();
            if (trimmed === '') {
                return { isValid: false, error: 'Amount cannot be empty' };
            }
            
            // Check for scientific notation
            if (/[eE]/.test(trimmed)) {
                return { isValid: false, error: 'Scientific notation not supported' };
            }
            
            const parsed = parseFloat(trimmed);
            if (!Number.isFinite(parsed)) {
                return { isValid: false, error: 'Invalid amount format' };
            }
            if (parsed < 0) {
                return { isValid: false, error: 'Amount cannot be negative' };
            }
            if (parsed > Number.MAX_SAFE_INTEGER) {
                return { isValid: false, error: 'Amount too large for safe conversion' };
            }
            
            normalizedAmount = BigInt(Math.floor(parsed));
        } else {
            return { isValid: false, error: 'Amount must be a number, string, or bigint' };
        }

        // Check range
        if (normalizedAmount <= BigInt(0)) {
            return { isValid: false, error: 'Amount must be greater than zero' };
        }

        if (normalizedAmount > BigInt('18446744073709551615')) { // Max u64
            return { isValid: false, error: 'Amount exceeds maximum supported value' };
        }

        return { isValid: true, normalized: normalizedAmount };
    } catch (error: any) {
        return { isValid: false, error: `Failed to parse amount: ${error.message}` };
    }
}

/**
 * Validate decimals parameter
 */
export function validateDecimals(decimals: any): {
    isValid: boolean;
    normalized?: number;
    error?: string;
} {
    if (decimals === null || decimals === undefined) {
        return { isValid: false, error: 'Decimals is required' };
    }

    const num = Number(decimals);
    
    if (!Number.isInteger(num) || num < 0 || num > 18) {
        return { isValid: false, error: 'Decimals must be an integer between 0 and 18' };
    }

    return { isValid: true, normalized: num };
}

/**
 * Comprehensive validation for image URLs
 */
export function validateImageUrl(url: string): {
    isValid: boolean;
    error?: string;
} {
    if (!url || typeof url !== 'string') {
        return { isValid: false, error: 'Image URL is required' };
    }

    // Basic URL validation
    if (!isValidUrl(url, { requireSecure: true, maxLength: 512 })) {
        return { isValid: false, error: 'Invalid image URL format or not secure' };
    }

    // Check file extension
    const urlObj = new URL(url);
    const pathname = urlObj.pathname.toLowerCase();
    const allowedExtensions = ['.png', '.jpg', '.jpeg', '.gif', '.webp', '.svg'];
    
    if (!allowedExtensions.some(ext => pathname.endsWith(ext))) {
        return { isValid: false, error: 'Image URL must point to a valid image file (.png, .jpg, .jpeg, .gif, .webp, .svg)' };
    }

    return { isValid: true };
}

/**
 * Validate priority fee
 */
export function validatePriorityFee(fee: any): {
    isValid: boolean;
    normalized?: number;
    error?: string;
} {
    if (fee === null || fee === undefined) {
        return { isValid: true, normalized: 0 }; // Default to 0
    }

    const num = Number(fee);
    
    if (!Number.isFinite(num) || num < 0) {
        return { isValid: false, error: 'Priority fee must be a non-negative number' };
    }

    if (num > 100000000) { // 0.1 SOL in micro-lamports
        return { isValid: false, error: 'Priority fee too high (max 0.1 SOL)' };
    }

    return { isValid: true, normalized: Math.floor(num) };
}

/**
 * Sanitize and validate metadata description
 */
export function validateDescription(description: string): {
    isValid: boolean;
    sanitized?: string;
    error?: string;
} {
    if (!description || typeof description !== 'string') {
        return { isValid: true, sanitized: '' }; // Optional field
    }

    const sanitized = sanitizeText(description, {
        maxLength: 500,
        removeHtml: true,
        preventXss: true,
        removeExtraSpaces: true
    });

    return { isValid: true, sanitized };
}

/**
 * Validate external URL (optional)
 */
export function validateExternalUrl(url: string): {
    isValid: boolean;
    error?: string;
} {
    if (!url || typeof url !== 'string') {
        return { isValid: true }; // Optional field
    }

    return isValidUrl(url, { requireSecure: true, maxLength: 256 }) 
        ? { isValid: true }
        : { isValid: false, error: 'Invalid external URL or not secure' };
}