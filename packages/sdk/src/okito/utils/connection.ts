import { Connection } from "@solana/web3.js";
import { TokenLaunchError, TokenLaunchErrorCode } from "../../types/errors";
import { logger, generateOperationId, createTimer } from "./logger";

/**
 * Circuit breaker states
 */
enum CircuitState {
    CLOSED = 'CLOSED',     // Normal operation
    OPEN = 'OPEN',         // Failing, rejecting requests
    HALF_OPEN = 'HALF_OPEN' // Testing if service recovered
}

/**
 * Circuit breaker configuration
 */
interface CircuitBreakerConfig {
    failureThreshold: number;     // Number of failures to trigger open state
    successThreshold: number;     // Number of successes to close from half-open
    timeout: number;             // Time to wait before attempting to close (ms)
    monitoringPeriod: number;    // Period to monitor failures (ms)
}

/**
 * Connection health check result
 */
interface HealthCheckResult {
    isHealthy: boolean;
    responseTime: number;
    error?: string;
    timestamp: number;
}

/**
 * Advanced connection health monitor with circuit breaker pattern
 */
class ConnectionHealthMonitor {
    private state: CircuitState = CircuitState.CLOSED;
    private failures: number = 0;
    private successes: number = 0;
    private lastFailureTime: number = 0;
    private recentChecks: HealthCheckResult[] = [];
    private config: CircuitBreakerConfig;

    constructor(config: Partial<CircuitBreakerConfig> = {}) {
        this.config = {
            failureThreshold: 5,
            successThreshold: 3,
            timeout: 60000, // 1 minute
            monitoringPeriod: 300000, // 5 minutes
            ...config
        };
    }

    private cleanup(): void {
        const cutoff = Date.now() - this.config.monitoringPeriod;
        this.recentChecks = this.recentChecks.filter(check => check.timestamp > cutoff);
    }

    private shouldAttemptRequest(): boolean {
        switch (this.state) {
            case CircuitState.CLOSED:
                return true;
            case CircuitState.OPEN:
                if (Date.now() - this.lastFailureTime > this.config.timeout) {
                    this.state = CircuitState.HALF_OPEN;
                    this.successes = 0;
                    logger.info('Circuit breaker moving to HALF_OPEN state');
                    return true;
                }
                return false;
            case CircuitState.HALF_OPEN:
                return true;
            default:
                return false;
        }
    }

    private recordSuccess(result: HealthCheckResult): void {
        this.recentChecks.push(result);
        this.cleanup();

        switch (this.state) {
            case CircuitState.CLOSED:
                this.failures = 0;
                break;
            case CircuitState.HALF_OPEN:
                this.successes++;
                if (this.successes >= this.config.successThreshold) {
                    this.state = CircuitState.CLOSED;
                    this.failures = 0;
                    logger.info('Circuit breaker CLOSED - connection recovered');
                }
                break;
        }
    }

    private recordFailure(result: HealthCheckResult): void {
        this.recentChecks.push(result);
        this.cleanup();
        this.lastFailureTime = Date.now();

        switch (this.state) {
            case CircuitState.CLOSED:
                this.failures++;
                if (this.failures >= this.config.failureThreshold) {
                    this.state = CircuitState.OPEN;
                    logger.warn(`Circuit breaker OPEN - connection unhealthy after ${this.failures} failures`);
                }
                break;
            case CircuitState.HALF_OPEN:
                this.state = CircuitState.OPEN;
                this.failures++;
                logger.warn('Circuit breaker returned to OPEN state - test failed');
                break;
        }
    }

    async checkHealth(connection: Connection): Promise<HealthCheckResult> {
        if (!this.shouldAttemptRequest()) {
            return {
                isHealthy: false,
                responseTime: 0,
                error: 'Circuit breaker is OPEN',
                timestamp: Date.now()
            };
        }

        const timer = createTimer();
        const startTime = Date.now();

        try {
            await connection.getLatestBlockhash('processed');
            const responseTime = timer.end();
            
            // Consider healthy if response time is under 10 seconds
            const isHealthy = responseTime < 10000;
            
            const result: HealthCheckResult = {
                isHealthy,
                responseTime,
                timestamp: startTime
            };

            if (isHealthy) {
                this.recordSuccess(result);
            } else {
                result.error = `Slow response: ${responseTime}ms`;
                this.recordFailure(result);
            }

            return result;
        } catch (error: any) {
            const responseTime = timer.end();
            const result: HealthCheckResult = {
                isHealthy: false,
                responseTime,
                error: error.message || 'Connection failed',
                timestamp: startTime
            };

            this.recordFailure(result);
            return result;
        }
    }

    getHealthMetrics() {
        this.cleanup();
        const healthyChecks = this.recentChecks.filter(c => c.isHealthy);
        const avgResponseTime = this.recentChecks.length > 0 
            ? this.recentChecks.reduce((sum, c) => sum + c.responseTime, 0) / this.recentChecks.length 
            : 0;

        return {
            state: this.state,
            failures: this.failures,
            successes: this.successes,
            healthyRate: this.recentChecks.length > 0 ? healthyChecks.length / this.recentChecks.length : 1,
            averageResponseTime: Math.round(avgResponseTime),
            totalChecks: this.recentChecks.length,
            lastCheck: this.recentChecks[this.recentChecks.length - 1]
        };
    }
}

// Global health monitor
const healthMonitor = new ConnectionHealthMonitor();

/**
 * Enhanced connection health check with circuit breaker pattern
 * @param connection - The Solana Connection object to check
 * @returns Promise<boolean> - True if the connection is healthy, false otherwise
 */
export async function checkConnectionHealth(connection: Connection): Promise<boolean> {
    const operationId = generateOperationId();
    const operationLogger = logger.child(operationId, { operation: 'health_check' });

    try {
        operationLogger.debug('Starting connection health check');
        const result = await healthMonitor.checkHealth(connection);
        
        operationLogger.info('Health check completed', {
            healthy: result.isHealthy,
            responseTime: result.responseTime,
            error: result.error
        });

        return result.isHealthy;
    } catch (error: any) {
        operationLogger.error('Health check failed', error);
        return false;
    }
}

/**
 * Get detailed connection health metrics
 */
export function getConnectionHealthMetrics() {
    return healthMonitor.getHealthMetrics();
}

/**
 * Enhanced retry configuration
 */
interface RetryConfig {
    maxRetries: number;
    baseDelay: number;
    maxDelay: number;
    backoffFactor: number;
    jitter: boolean;
    retryableErrors: string[];
    nonRetryableErrors: string[];
}

/**
 * Default retry configuration
 */
const DEFAULT_RETRY_CONFIG: RetryConfig = {
    maxRetries: 3,
    baseDelay: 1000,
    maxDelay: 30000,
    backoffFactor: 2,
    jitter: true,
    retryableErrors: [
        'network',
        'timeout',
        'rate limit',
        '429',
        '503',
        '502',
        '504',
        'fetch failed',
        'connection',
        'ECONNRESET',
        'ETIMEDOUT'
    ],
    nonRetryableErrors: [
        'wallet not connected',
        'invalid token data',
        'invalid url',
        'authority validation failed',
        'invalid destination',
        'insufficient funds',
        'insufficient token balance'
    ]
};

/**
 * Determine if an error should be retried
 */
function shouldRetryError(error: any, config: RetryConfig): boolean {
    if (error instanceof TokenLaunchError) {
        const nonRetryableCodes = [
            TokenLaunchErrorCode.WALLET_NOT_CONNECTED,
            TokenLaunchErrorCode.INVALID_TOKEN_DATA,
            TokenLaunchErrorCode.INVALID_URL,
            TokenLaunchErrorCode.AUTHORITY_VALIDATION_FAILED,
            TokenLaunchErrorCode.INVALID_DESTINATION,
            TokenLaunchErrorCode.INSUFFICIENT_FUNDS,
            TokenLaunchErrorCode.INSUFFICIENT_TOKEN_BALANCE,
            TokenLaunchErrorCode.INVALID_AMOUNT,
            TokenLaunchErrorCode.VALIDATION_ERROR
        ];
        
        return !nonRetryableCodes.includes(error.code);
    }

    const errorMessage = error.message?.toLowerCase() || '';
    
    // Check non-retryable errors first
    if (config.nonRetryableErrors.some(pattern => errorMessage.includes(pattern.toLowerCase()))) {
        return false;
    }
    
    // Check retryable errors
    return config.retryableErrors.some(pattern => errorMessage.includes(pattern.toLowerCase()));
}

/**
 * Calculate delay with exponential backoff and jitter
 */
function calculateDelay(attempt: number, config: RetryConfig): number {
    const exponentialDelay = Math.min(
        config.baseDelay * Math.pow(config.backoffFactor, attempt - 1),
        config.maxDelay
    );
    
    if (!config.jitter) {
        return exponentialDelay;
    }
    
    // Add jitter to prevent thundering herd
    const jitterRange = exponentialDelay * 0.1;
    const jitter = (Math.random() - 0.5) * 2 * jitterRange;
    
    return Math.max(0, exponentialDelay + jitter);
}

/**
 * Advanced retry mechanism with exponential backoff, jitter, and intelligent error classification
 */
export async function withRetry<T>(
    fn: () => Promise<T>,
    maxRetries: number = 3,
    enableLogging: boolean = false,
    customConfig?: Partial<RetryConfig>
): Promise<T> {
    const config = { ...DEFAULT_RETRY_CONFIG, maxRetries, ...customConfig };
    const operationId = generateOperationId();
    const operationLogger = logger.child(operationId, { operation: 'retry_wrapper' });
    
    let lastError: any;
    
    for (let attempt = 1; attempt <= config.maxRetries; attempt++) {
        try {
            operationLogger.debug(`Attempt ${attempt}/${config.maxRetries}`);
            const timer = createTimer();
            const result = await fn();
            const duration = timer.end();
            
            if (attempt > 1) {
                operationLogger.info(`Operation succeeded on attempt ${attempt}`, { duration });
            }
            
            return result;
        } catch (error: any) {
            lastError = error;
            
            const isRetryable = shouldRetryError(error, config);
            const isLastAttempt = attempt === config.maxRetries;
            
            operationLogger.warn(`Attempt ${attempt}/${config.maxRetries} failed`, {
                error: error.message,
                code: error.code,
                retryable: isRetryable,
                lastAttempt: isLastAttempt
            });
            
            if (!isRetryable || isLastAttempt) {
                operationLogger.error('Retry attempts exhausted or non-retryable error', error);
                throw error;
            }
            
            if (attempt < config.maxRetries) {
                const delay = calculateDelay(attempt, config);
                operationLogger.debug(`Waiting ${delay}ms before retry`);
                await new Promise(resolve => setTimeout(resolve, delay));
            }
        }
    }
    
    throw lastError;
}

/**
 * Enhanced transaction confirmation with multiple strategies and fallbacks
 */
export async function confirmTransactionWithRetry(
    connection: Connection,
    signature: string,
    blockhash: string,
    lastValidBlockHeight: number,
    strategy: 'processed' | 'confirmed' | 'finalized' = 'confirmed',
    timeoutMs: number = 30000
): Promise<void> {
    const operationId = generateOperationId();
    const operationLogger = logger.child(operationId, { 
        operation: 'transaction_confirmation',
        signature: signature.slice(0, 8) + '...',
        strategy,
        timeout: timeoutMs
    });
    
    operationLogger.info('Starting transaction confirmation');
    const timer = createTimer();
    const startTime = Date.now();
    
    // Strategy escalation: if primary fails, try less strict confirmation
    const strategies: Array<'processed' | 'confirmed' | 'finalized'> = [strategy];
    if (strategy === 'finalized') {
        strategies.push('confirmed', 'processed');
    } else if (strategy === 'confirmed') {
        strategies.push('processed');
    }
    
    let lastError: any;
    
    for (const currentStrategy of strategies) {
        const strategyTimeout = Math.max(timeoutMs - (Date.now() - startTime), 5000);
        operationLogger.debug(`Trying confirmation strategy: ${currentStrategy}`, { timeout: strategyTimeout });
        
        try {
            await confirmWithStrategy(connection, signature, blockhash, lastValidBlockHeight, currentStrategy, strategyTimeout, operationLogger);
            const duration = timer.end();
            operationLogger.info('Transaction confirmed successfully', { 
                strategy: currentStrategy, 
                duration 
            });
            return;
        } catch (error: any) {
            lastError = error;
            operationLogger.warn(`Confirmation failed with strategy ${currentStrategy}`, { error: error.message });
            
            // If this is a definitive failure (not timeout), don't try other strategies
            if (error instanceof TokenLaunchError && error.code === TokenLaunchErrorCode.TRANSACTION_FAILED) {
                throw error;
            }
        }
    }
    
    const totalDuration = timer.end();
    operationLogger.error('All confirmation strategies failed', lastError, { totalDuration });
    throw lastError;
}

/**
 * Confirm transaction with a specific strategy
 */
async function confirmWithStrategy(
    connection: Connection,
    signature: string,
    blockhash: string,
    lastValidBlockHeight: number,
    strategy: 'processed' | 'confirmed' | 'finalized',
    timeoutMs: number,
    operationLogger: any
): Promise<void> {
    const startTime = Date.now();
    let attempts = 0;
    
    while (Date.now() - startTime < timeoutMs) {
        attempts++;
        
        try {
            const confirmation = await connection.confirmTransaction({
                signature,
                blockhash,
                lastValidBlockHeight
            }, strategy);

            if (confirmation.value.err) {
                throw new TokenLaunchError(
                    TokenLaunchErrorCode.TRANSACTION_FAILED,
                    'Transaction failed during confirmation',
                    confirmation.value.err
                );
            }
            
            operationLogger.debug(`Confirmation successful after ${attempts} attempts`);
            return;
        } catch (error: any) {
            if (error instanceof TokenLaunchError) {
                throw error;
            }
            
            // Check if we still have time for another attempt
            const remainingTime = timeoutMs - (Date.now() - startTime);
            if (remainingTime < 2000) {
                throw new TokenLaunchError(
                    TokenLaunchErrorCode.TIMEOUT,
                    `Transaction confirmation timed out after ${attempts} attempts (${Math.round((Date.now() - startTime) / 1000)}s)`,
                    error
                );
            }
            
            // Wait before retrying, with exponential backoff
            const delay = Math.min(1000 * Math.pow(1.5, attempts - 1), 5000);
            await new Promise(resolve => setTimeout(resolve, delay));
        }
    }
    
    throw new TokenLaunchError(
        TokenLaunchErrorCode.TIMEOUT,
        `Transaction confirmation timed out after ${timeoutMs}ms with strategy ${strategy}`
    );
}

/**
 * Check if connection supports a specific feature
 */
export async function checkConnectionFeatures(connection: Connection): Promise<{
    supportsVersionedTransactions: boolean;
    supportsPriorityFees: boolean;
    apiVersion?: string;
    cluster?: string;
}> {
    const operationLogger = logger.child(generateOperationId(), { operation: 'feature_check' });
    
    try {
        operationLogger.debug('Checking connection features');
        
        // Test versioned transaction support
        let supportsVersionedTransactions = false;
        try {
            await connection.getVersion();
            supportsVersionedTransactions = true;
        } catch {
            // Older RPC endpoints may not support getVersion
        }
        
        // Test priority fee support (newer feature)
        let supportsPriorityFees = false;
        try {
            await connection.getRecentPrioritizationFees({ lockedWritableAccounts: [] });
            supportsPriorityFees = true;
        } catch {
            // Priority fees not supported
        }
        
        const features = {
            supportsVersionedTransactions,
            supportsPriorityFees
        };
        
        operationLogger.info('Connection features detected', features);
        return features;
    } catch (error: any) {
        operationLogger.warn('Failed to detect connection features', { error: error.message });
        return {
            supportsVersionedTransactions: false,
            supportsPriorityFees: false
        };
    }
}