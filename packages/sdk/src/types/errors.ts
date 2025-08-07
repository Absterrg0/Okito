export enum TokenLaunchErrorCode {
    // Wallet & Authentication Errors
    WALLET_NOT_CONNECTED = 'WALLET_NOT_CONNECTED',
    WALLET_DISCONNECTED = 'WALLET_DISCONNECTED',
    INSUFFICIENT_PERMISSIONS = 'INSUFFICIENT_PERMISSIONS',
    SIGNATURE_REJECTED = 'SIGNATURE_REJECTED',
    
    // Validation Errors
    INVALID_TOKEN_DATA = 'INVALID_TOKEN_DATA',
    INVALID_URL = 'INVALID_URL',
    INVALID_MINT_ADDRESS = 'INVALID_MINT_ADDRESS',
    INVALID_DESTINATION = 'INVALID_DESTINATION',
    INVALID_AMOUNT = 'INVALID_AMOUNT',
    VALIDATION_ERROR = 'VALIDATION_ERROR',
    AUTHORITY_VALIDATION_FAILED = 'AUTHORITY_VALIDATION_FAILED',
    
    // Balance & Funding Errors
    INSUFFICIENT_FUNDS = 'INSUFFICIENT_FUNDS',
    INSUFFICIENT_TOKEN_BALANCE = 'INSUFFICIENT_TOKEN_BALANCE',
    INSUFFICIENT_GAS = 'INSUFFICIENT_GAS',
    
    // Network & Connection Errors
    NETWORK_ERROR = 'NETWORK_ERROR',
    CONNECTION_TIMEOUT = 'CONNECTION_TIMEOUT',
    RPC_ERROR = 'RPC_ERROR',
    RATE_LIMITED = 'RATE_LIMITED',
    SERVICE_UNAVAILABLE = 'SERVICE_UNAVAILABLE',
    
    // Transaction Errors
    TRANSACTION_FAILED = 'TRANSACTION_FAILED',
    TRANSACTION_TIMEOUT = 'TRANSACTION_TIMEOUT',
    SIMULATION_FAILED = 'SIMULATION_FAILED',
    BLOCKHASH_EXPIRED = 'BLOCKHASH_EXPIRED',
    TRANSACTION_TOO_LARGE = 'TRANSACTION_TOO_LARGE',
    
    // Account Errors
    TOKEN_ACCOUNT_NOT_FOUND = 'TOKEN_ACCOUNT_NOT_FOUND',
    ACCOUNT_CREATION_FAILED = 'ACCOUNT_CREATION_FAILED',
    ACCOUNT_ALREADY_EXISTS = 'ACCOUNT_ALREADY_EXISTS',
    
    // Operation Errors
    TIMEOUT = 'TIMEOUT',
    BATCH_EXECUTION_FAILED = 'BATCH_EXECUTION_FAILED',
    OPERATION_CANCELLED = 'OPERATION_CANCELLED',
    OPERATION_NOT_SUPPORTED = 'OPERATION_NOT_SUPPORTED',
    
    // Configuration Errors
    INVALID_CONFIGURATION = 'INVALID_CONFIGURATION',
    MISSING_REQUIRED_PARAMETER = 'MISSING_REQUIRED_PARAMETER',
    
    // External Service Errors
    METADATA_UPLOAD_FAILED = 'METADATA_UPLOAD_FAILED',
    IMAGE_UPLOAD_FAILED = 'IMAGE_UPLOAD_FAILED',
    EXTERNAL_API_ERROR = 'EXTERNAL_API_ERROR',
    
    // Security Errors
    SECURITY_VIOLATION = 'SECURITY_VIOLATION',
    UNAUTHORIZED_OPERATION = 'UNAUTHORIZED_OPERATION',
    
    // Unknown/Generic Errors
    UNKNOWN_ERROR = 'UNKNOWN_ERROR',
    INTERNAL_ERROR = 'INTERNAL_ERROR'
}

/**
 * Error severity levels
 */
export enum ErrorSeverity {
    LOW = 'LOW',           // Minor issues, operation can continue
    MEDIUM = 'MEDIUM',     // Significant issues, operation might fail
    HIGH = 'HIGH',         // Critical issues, operation will fail
    CRITICAL = 'CRITICAL'  // System-level issues, service unavailable
}

/**
 * Error category for grouping related errors
 */
export enum ErrorCategory {
    AUTHENTICATION = 'AUTHENTICATION',
    VALIDATION = 'VALIDATION',
    NETWORK = 'NETWORK',
    TRANSACTION = 'TRANSACTION',
    ACCOUNT = 'ACCOUNT',
    CONFIGURATION = 'CONFIGURATION',
    EXTERNAL = 'EXTERNAL',
    SECURITY = 'SECURITY',
    SYSTEM = 'SYSTEM'
}

/**
 * Recovery suggestion interface
 */
interface RecoverySuggestion {
    action: string;
    description: string;
    automated?: boolean;
}

/**
 * Error context interface
 */
export interface ErrorContext {
    operationId?: string;
    timestamp?: number;
    userId?: string;
    sessionId?: string;
    networkType?: string;
    walletType?: string;
    transactionSignature?: string;
    blockHeight?: number;
    additionalData?: Record<string, any>;
}

/**
 * Enhanced error class with comprehensive error handling
 */
export class TokenLaunchError extends Error {
    public readonly code: TokenLaunchErrorCode;
    public readonly severity: ErrorSeverity;
    public readonly category: ErrorCategory;
    public readonly context?: ErrorContext;
    public readonly details?: any;
    public readonly recoverySuggestions?: RecoverySuggestion[];
    public readonly isRetryable: boolean;
    public readonly timestamp: number;

    constructor(
        code: TokenLaunchErrorCode,
        message: string,
        details?: any,
        context?: ErrorContext,
        recoverySuggestions?: RecoverySuggestion[]
    ) {
        super(message);
        this.name = 'TokenLaunchError';
        this.code = code;
        this.details = details;
        this.context = {
            timestamp: Date.now(),
            ...context
        };
        this.recoverySuggestions = recoverySuggestions;
        this.timestamp = Date.now();
        
        // Automatically determine severity, category, and retryability
        const errorInfo = this.getErrorInfo(code);
        this.severity = errorInfo.severity;
        this.category = errorInfo.category;
        this.isRetryable = errorInfo.isRetryable;
    }

    private getErrorInfo(code: TokenLaunchErrorCode): {
        severity: ErrorSeverity;
        category: ErrorCategory;
        isRetryable: boolean;
    } {
        // Mapping of error codes to their properties
        const errorMap: Record<TokenLaunchErrorCode, {
            severity: ErrorSeverity;
            category: ErrorCategory;
            isRetryable: boolean;
        }> = {
            // Wallet & Authentication
            [TokenLaunchErrorCode.WALLET_NOT_CONNECTED]: {
                severity: ErrorSeverity.HIGH,
                category: ErrorCategory.AUTHENTICATION,
                isRetryable: false
            },
            [TokenLaunchErrorCode.WALLET_DISCONNECTED]: {
                severity: ErrorSeverity.HIGH,
                category: ErrorCategory.AUTHENTICATION,
                isRetryable: false
            },
            [TokenLaunchErrorCode.INSUFFICIENT_PERMISSIONS]: {
                severity: ErrorSeverity.HIGH,
                category: ErrorCategory.AUTHENTICATION,
                isRetryable: false
            },
            [TokenLaunchErrorCode.SIGNATURE_REJECTED]: {
                severity: ErrorSeverity.HIGH,
                category: ErrorCategory.AUTHENTICATION,
                isRetryable: false
            },
            
            // Validation
            [TokenLaunchErrorCode.INVALID_TOKEN_DATA]: {
                severity: ErrorSeverity.HIGH,
                category: ErrorCategory.VALIDATION,
                isRetryable: false
            },
            [TokenLaunchErrorCode.INVALID_URL]: {
                severity: ErrorSeverity.MEDIUM,
                category: ErrorCategory.VALIDATION,
                isRetryable: false
            },
            [TokenLaunchErrorCode.INVALID_MINT_ADDRESS]: {
                severity: ErrorSeverity.HIGH,
                category: ErrorCategory.VALIDATION,
                isRetryable: false
            },
            [TokenLaunchErrorCode.INVALID_DESTINATION]: {
                severity: ErrorSeverity.HIGH,
                category: ErrorCategory.VALIDATION,
                isRetryable: false
            },
            [TokenLaunchErrorCode.INVALID_AMOUNT]: {
                severity: ErrorSeverity.HIGH,
                category: ErrorCategory.VALIDATION,
                isRetryable: false
            },
            [TokenLaunchErrorCode.VALIDATION_ERROR]: {
                severity: ErrorSeverity.HIGH,
                category: ErrorCategory.VALIDATION,
                isRetryable: false
            },
            [TokenLaunchErrorCode.AUTHORITY_VALIDATION_FAILED]: {
                severity: ErrorSeverity.HIGH,
                category: ErrorCategory.VALIDATION,
                isRetryable: false
            },
            
            // Balance & Funding
            [TokenLaunchErrorCode.INSUFFICIENT_FUNDS]: {
                severity: ErrorSeverity.HIGH,
                category: ErrorCategory.ACCOUNT,
                isRetryable: false
            },
            [TokenLaunchErrorCode.INSUFFICIENT_TOKEN_BALANCE]: {
                severity: ErrorSeverity.HIGH,
                category: ErrorCategory.ACCOUNT,
                isRetryable: false
            },
            [TokenLaunchErrorCode.INSUFFICIENT_GAS]: {
                severity: ErrorSeverity.HIGH,
                category: ErrorCategory.ACCOUNT,
                isRetryable: false
            },
            
            // Network & Connection
            [TokenLaunchErrorCode.NETWORK_ERROR]: {
                severity: ErrorSeverity.MEDIUM,
                category: ErrorCategory.NETWORK,
                isRetryable: true
            },
            [TokenLaunchErrorCode.CONNECTION_TIMEOUT]: {
                severity: ErrorSeverity.MEDIUM,
                category: ErrorCategory.NETWORK,
                isRetryable: true
            },
            [TokenLaunchErrorCode.RPC_ERROR]: {
                severity: ErrorSeverity.MEDIUM,
                category: ErrorCategory.NETWORK,
                isRetryable: true
            },
            [TokenLaunchErrorCode.RATE_LIMITED]: {
                severity: ErrorSeverity.MEDIUM,
                category: ErrorCategory.NETWORK,
                isRetryable: true
            },
            [TokenLaunchErrorCode.SERVICE_UNAVAILABLE]: {
                severity: ErrorSeverity.HIGH,
                category: ErrorCategory.NETWORK,
                isRetryable: true
            },
            
            // Transaction
            [TokenLaunchErrorCode.TRANSACTION_FAILED]: {
                severity: ErrorSeverity.HIGH,
                category: ErrorCategory.TRANSACTION,
                isRetryable: false
            },
            [TokenLaunchErrorCode.TRANSACTION_TIMEOUT]: {
                severity: ErrorSeverity.MEDIUM,
                category: ErrorCategory.TRANSACTION,
                isRetryable: true
            },
            [TokenLaunchErrorCode.SIMULATION_FAILED]: {
                severity: ErrorSeverity.MEDIUM,
                category: ErrorCategory.TRANSACTION,
                isRetryable: true
            },
            [TokenLaunchErrorCode.BLOCKHASH_EXPIRED]: {
                severity: ErrorSeverity.MEDIUM,
                category: ErrorCategory.TRANSACTION,
                isRetryable: true
            },
            [TokenLaunchErrorCode.TRANSACTION_TOO_LARGE]: {
                severity: ErrorSeverity.HIGH,
                category: ErrorCategory.TRANSACTION,
                isRetryable: false
            },
            
            // Account
            [TokenLaunchErrorCode.TOKEN_ACCOUNT_NOT_FOUND]: {
                severity: ErrorSeverity.MEDIUM,
                category: ErrorCategory.ACCOUNT,
                isRetryable: false
            },
            [TokenLaunchErrorCode.ACCOUNT_CREATION_FAILED]: {
                severity: ErrorSeverity.HIGH,
                category: ErrorCategory.ACCOUNT,
                isRetryable: true
            },
            [TokenLaunchErrorCode.ACCOUNT_ALREADY_EXISTS]: {
                severity: ErrorSeverity.LOW,
                category: ErrorCategory.ACCOUNT,
                isRetryable: false
            },
            
            // Operation
            [TokenLaunchErrorCode.TIMEOUT]: {
                severity: ErrorSeverity.MEDIUM,
                category: ErrorCategory.SYSTEM,
                isRetryable: true
            },
            [TokenLaunchErrorCode.BATCH_EXECUTION_FAILED]: {
                severity: ErrorSeverity.HIGH,
                category: ErrorCategory.SYSTEM,
                isRetryable: true
            },
            [TokenLaunchErrorCode.OPERATION_CANCELLED]: {
                severity: ErrorSeverity.LOW,
                category: ErrorCategory.SYSTEM,
                isRetryable: false
            },
            [TokenLaunchErrorCode.OPERATION_NOT_SUPPORTED]: {
                severity: ErrorSeverity.HIGH,
                category: ErrorCategory.SYSTEM,
                isRetryable: false
            },
            
            // Configuration
            [TokenLaunchErrorCode.INVALID_CONFIGURATION]: {
                severity: ErrorSeverity.HIGH,
                category: ErrorCategory.CONFIGURATION,
                isRetryable: false
            },
            [TokenLaunchErrorCode.MISSING_REQUIRED_PARAMETER]: {
                severity: ErrorSeverity.HIGH,
                category: ErrorCategory.CONFIGURATION,
                isRetryable: false
            },
            
            // External Services
            [TokenLaunchErrorCode.METADATA_UPLOAD_FAILED]: {
                severity: ErrorSeverity.MEDIUM,
                category: ErrorCategory.EXTERNAL,
                isRetryable: true
            },
            [TokenLaunchErrorCode.IMAGE_UPLOAD_FAILED]: {
                severity: ErrorSeverity.MEDIUM,
                category: ErrorCategory.EXTERNAL,
                isRetryable: true
            },
            [TokenLaunchErrorCode.EXTERNAL_API_ERROR]: {
                severity: ErrorSeverity.MEDIUM,
                category: ErrorCategory.EXTERNAL,
                isRetryable: true
            },
            
            // Security
            [TokenLaunchErrorCode.SECURITY_VIOLATION]: {
                severity: ErrorSeverity.CRITICAL,
                category: ErrorCategory.SECURITY,
                isRetryable: false
            },
            [TokenLaunchErrorCode.UNAUTHORIZED_OPERATION]: {
                severity: ErrorSeverity.HIGH,
                category: ErrorCategory.SECURITY,
                isRetryable: false
            },
            
            // Generic
            [TokenLaunchErrorCode.UNKNOWN_ERROR]: {
                severity: ErrorSeverity.MEDIUM,
                category: ErrorCategory.SYSTEM,
                isRetryable: true
            },
            [TokenLaunchErrorCode.INTERNAL_ERROR]: {
                severity: ErrorSeverity.HIGH,
                category: ErrorCategory.SYSTEM,
                isRetryable: true
            }
        };

        return errorMap[code] || {
            severity: ErrorSeverity.MEDIUM,
            category: ErrorCategory.SYSTEM,
            isRetryable: true
        };
    }

    /**
     * Convert error to a serializable object
     */
    toJSON() {
        return {
            name: this.name,
            code: this.code,
            message: this.message,
            severity: this.severity,
            category: this.category,
            isRetryable: this.isRetryable,
            timestamp: this.timestamp,
            context: this.context,
            details: this.details,
            recoverySuggestions: this.recoverySuggestions,
            stack: this.stack
        };
    }

    /**
     * Create a user-friendly error message
     */
    getUserMessage(): string {
        const userFriendlyMessages: Partial<Record<TokenLaunchErrorCode, string>> = {
            [TokenLaunchErrorCode.WALLET_NOT_CONNECTED]: 'Please connect your wallet to continue.',
            [TokenLaunchErrorCode.INSUFFICIENT_FUNDS]: 'You don\'t have enough SOL to complete this transaction. Please add funds to your wallet.',
            [TokenLaunchErrorCode.RATE_LIMITED]: 'Too many requests. Please wait a moment and try again.',
            [TokenLaunchErrorCode.NETWORK_ERROR]: 'Network connection issue. Please check your internet connection and try again.',
            [TokenLaunchErrorCode.TRANSACTION_FAILED]: 'Transaction failed. Please try again.',
            [TokenLaunchErrorCode.INVALID_TOKEN_DATA]: 'Invalid token information provided. Please check your input.',
        };

        return userFriendlyMessages[this.code] || this.message;
    }
}

/**
 * Error factory functions for common error scenarios
 */
export class ErrorFactory {
    static walletNotConnected(context?: ErrorContext): TokenLaunchError {
        return new TokenLaunchError(
            TokenLaunchErrorCode.WALLET_NOT_CONNECTED,
            'Wallet not connected or public key not available',
            undefined,
            context,
            [
                {
                    action: 'connect_wallet',
                    description: 'Connect your Solana wallet to continue',
                    automated: false
                }
            ]
        );
    }

    static insufficientFunds(required: number, available: number, context?: ErrorContext): TokenLaunchError {
        return new TokenLaunchError(
            TokenLaunchErrorCode.INSUFFICIENT_FUNDS,
            `Insufficient SOL for transaction fees. Required: ${required / 1e9} SOL, Available: ${available / 1e9} SOL`,
            { required, available },
            context,
            [
                {
                    action: 'add_funds',
                    description: `Add at least ${(required - available) / 1e9} SOL to your wallet`,
                    automated: false
                }
            ]
        );
    }

    static networkError(originalError: any, context?: ErrorContext): TokenLaunchError {
        return new TokenLaunchError(
            TokenLaunchErrorCode.NETWORK_ERROR,
            `Network error: ${originalError.message || 'Connection failed'}`,
            originalError,
            context,
            [
                {
                    action: 'check_connection',
                    description: 'Check your internet connection',
                    automated: false
                },
                {
                    action: 'retry_operation',
                    description: 'Retry the operation',
                    automated: true
                }
            ]
        );
    }

    static rateLimited(retryAfter?: number, context?: ErrorContext): TokenLaunchError {
        const retryMessage = retryAfter 
            ? ` Please wait ${Math.ceil(retryAfter / 1000)} seconds before retrying.`
            : ' Please wait a moment before retrying.';
            
        return new TokenLaunchError(
            TokenLaunchErrorCode.RATE_LIMITED,
            `Rate limited by RPC endpoint.${retryMessage}`,
            { retryAfter },
            context,
            [
                {
                    action: 'wait_and_retry',
                    description: retryAfter 
                        ? `Wait ${Math.ceil(retryAfter / 1000)} seconds and retry`
                        : 'Wait a moment and retry',
                    automated: true
                }
            ]
        );
    }

    static transactionFailed(signature?: string, details?: any, context?: ErrorContext): TokenLaunchError {
        return new TokenLaunchError(
            TokenLaunchErrorCode.TRANSACTION_FAILED,
            `Transaction failed${signature ? ` (${signature.slice(0, 8)}...)` : ''}`,
            details,
            { ...context, transactionSignature: signature },
            [
                {
                    action: 'retry_transaction',
                    description: 'Retry the transaction with adjusted parameters',
                    automated: false
                }
            ]
        );
    }

    static invalidTokenData(field: string, value: any, context?: ErrorContext): TokenLaunchError {
        return new TokenLaunchError(
            TokenLaunchErrorCode.INVALID_TOKEN_DATA,
            `Invalid token data: ${field} = ${value}`,
            { field, value },
            context,
            [
                {
                    action: 'fix_token_data',
                    description: `Please provide a valid value for ${field}`,
                    automated: false
                }
            ]
        );
    }
}

/**
 * Type guard to check if an error is a TokenLaunchError
 */
export function isTokenLaunchError(error: any): error is TokenLaunchError {
    return error instanceof TokenLaunchError;
}

/**
 * Extract error information from any error type
 */
export function extractErrorInfo(error: any): {
    code: string;
    message: string;
    isRetryable: boolean;
    severity: ErrorSeverity;
    category: ErrorCategory;
} {
    if (isTokenLaunchError(error)) {
        return {
            code: error.code,
            message: error.message,
            isRetryable: error.isRetryable,
            severity: error.severity,
            category: error.category
        };
    }

    // Handle standard JavaScript errors
    return {
        code: TokenLaunchErrorCode.UNKNOWN_ERROR,
        message: error.message || 'An unknown error occurred',
        isRetryable: true,
        severity: ErrorSeverity.MEDIUM,
        category: ErrorCategory.SYSTEM
    };
}
