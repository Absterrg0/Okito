export interface OperationConfig {
    maxRetries?: number;
    timeoutMs?: number;
    confirmationStrategy?: 'processed' | 'confirmed' | 'finalized';
    priorityFee?: number;
    enableLogging?: boolean;
    enableSimulation?: boolean;
    validateBalance?: boolean;
    
    // Advanced configuration options
    logLevel?: 'trace' | 'debug' | 'info' | 'warn' | 'error' | 'fatal';
    enableMetrics?: boolean;
    enablePerformanceTracking?: boolean;
    customRetryConfig?: {
        baseDelay?: number;
        maxDelay?: number;
        backoffFactor?: number;
        jitter?: boolean;
    };
    
    // Network and connection options
    healthCheckTimeout?: number;
    enableCircuitBreaker?: boolean;
    connectionFeatureCheck?: boolean;
    
    // Transaction options
    computeUnitLimit?: number;
    computeUnitPrice?: number;
    enableVersionedTransactions?: boolean;
    
    // Security and validation options
    strictValidation?: boolean;
    allowUnsafeOperations?: boolean;
    requireSignatureValidation?: boolean;
}

/**
 * Base result interface for all token operations
 */
export interface OperationResult {
    success: boolean;
    transactionId?: string;
    error?: string;
    estimatedFee?: number;
    actualFee?: number;
    confirmationTime?: number;
    
    // Enhanced result data
    operationId?: string;
    metrics?: {
        validationTime?: number;
        preparationTime?: number;
        simulationTime?: number;
        sendTime?: number;
        confirmationTime?: number;
        totalTime?: number;
        retryCount?: number;
        networkLatency?: number;
    };
    
    // Error details for debugging
    errorDetails?: {
        code?: string;
        severity?: string;
        category?: string;
        isRetryable?: boolean;
        recoverySuggestions?: Array<{
            action: string;
            description: string;
            automated?: boolean;
        }>;
    };
    
    // Network and transaction info
    networkInfo?: {
        cluster?: string;
        blockHeight?: number;
        blockhash?: string;
        slot?: number;
    };
}
