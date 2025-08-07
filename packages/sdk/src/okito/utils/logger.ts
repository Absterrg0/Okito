/**
 * Production-grade logging utility with structured logging, multiple levels, and context tracking
 */

export type LogLevel = 'trace' | 'debug' | 'info' | 'warn' | 'error' | 'fatal';
export type LogContext = Record<string, any>;

export interface LogEntry {
    timestamp: string;
    level: LogLevel;
    message: string;
    context?: LogContext;
    operationId?: string;
    duration?: number;
    error?: any;
}

/**
 * Configuration for the logger
 */
export interface LoggerConfig {
    level: LogLevel;
    enableConsole: boolean;
    enableStructured: boolean;
    includeTimestamp: boolean;
    includeStack: boolean;
    prefix?: string;
}

class ProductionLogger {
    private config: LoggerConfig;
    private logLevels: Record<LogLevel, number> = {
        trace: 0,
        debug: 1,
        info: 2,
        warn: 3,
        error: 4,
        fatal: 5
    };

    constructor(config: Partial<LoggerConfig> = {}) {
        this.config = {
            level: 'info',
            enableConsole: true,
            enableStructured: false,
            includeTimestamp: true,
            includeStack: false,
            ...config
        };
    }

    private shouldLog(level: LogLevel): boolean {
        return this.logLevels[level] >= this.logLevels[this.config.level];
    }

    private formatMessage(entry: LogEntry): string {
        const parts: string[] = [];
        
        if (this.config.includeTimestamp) {
            parts.push(`[${entry.timestamp}]`);
        }
        
        if (this.config.prefix) {
            parts.push(`[${this.config.prefix}]`);
        }
        
        parts.push(`[${entry.level.toUpperCase()}]`);
        
        if (entry.operationId) {
            parts.push(`[${entry.operationId}]`);
        }
        
        parts.push(entry.message);
        
        if (entry.duration !== undefined) {
            parts.push(`(${entry.duration}ms)`);
        }

        return parts.join(' ');
    }

    private createLogEntry(
        level: LogLevel, 
        message: string, 
        context?: LogContext,
        operationId?: string,
        duration?: number,
        error?: any
    ): LogEntry {
        return {
            timestamp: new Date().toISOString(),
            level,
            message,
            context,
            operationId,
            duration,
            error
        };
    }

    private output(entry: LogEntry): void {
        if (!this.config.enableConsole || typeof console === 'undefined') {
            return;
        }

        const baseMessage = this.formatMessage(entry);
        const hasData = entry.context || entry.error;
        
        switch (entry.level) {
            case 'fatal':
            case 'error':
                if (hasData) {
                    console.error(baseMessage, {
                        context: entry.context,
                        error: entry.error,
                        stack: this.config.includeStack && entry.error?.stack
                    });
                } else {
                    console.error(baseMessage);
                }
                break;
            case 'warn':
                if (hasData) {
                    console.warn(baseMessage, { context: entry.context });
                } else {
                    console.warn(baseMessage);
                }
                break;
            case 'trace':
            case 'debug':
                if (hasData) {
                    console.debug(baseMessage, { context: entry.context });
                } else {
                    console.debug(baseMessage);
                }
                break;
            default:
                if (hasData) {
                    console.log(baseMessage, { context: entry.context });
                } else {
                    console.log(baseMessage);
                }
        }
    }

    public log(
        level: LogLevel, 
        message: string, 
        context?: LogContext,
        operationId?: string,
        duration?: number,
        error?: any
    ): void {
        if (!this.shouldLog(level)) {
            return;
        }

        const entry = this.createLogEntry(level, message, context, operationId, duration, error);
        this.output(entry);
    }

    trace(message: string, context?: LogContext, operationId?: string): void {
        this.log('trace', message, context, operationId);
    }

    debug(message: string, context?: LogContext, operationId?: string): void {
        this.log('debug', message, context, operationId);
    }

    info(message: string, context?: LogContext, operationId?: string): void {
        this.log('info', message, context, operationId);
    }

    warn(message: string, context?: LogContext, operationId?: string): void {
        this.log('warn', message, context, operationId);
    }

    error(message: string, error?: any, context?: LogContext, operationId?: string): void {
        this.log('error', message, context, operationId, undefined, error);
    }

    fatal(message: string, error?: any, context?: LogContext, operationId?: string): void {
        this.log('fatal', message, context, operationId, undefined, error);
    }

    /**
     * Log operation timing
     */
    timing(operationName: string, duration: number, context?: LogContext, operationId?: string): void {
        this.log('info', `Operation completed: ${operationName}`, context, operationId, duration);
    }

    /**
     * Create a child logger with a specific operation ID
     */
    child(operationId: string, additionalContext?: LogContext): OperationLogger {
        return new OperationLogger(this, operationId, additionalContext);
    }

    /**
     * Update logger configuration
     */
    configure(config: Partial<LoggerConfig>): void {
        this.config = { ...this.config, ...config };
    }
}

/**
 * Operation-scoped logger that automatically includes operation ID and context
 */
export class OperationLogger {
    constructor(
        private parentLogger: ProductionLogger,
        private operationId: string,
        private baseContext?: LogContext
    ) {}

    private mergeContext(context?: LogContext): LogContext | undefined {
        if (!this.baseContext && !context) return undefined;
        return { ...this.baseContext, ...context };
    }

    trace(message: string, context?: LogContext): void {
        this.parentLogger.trace(message, this.mergeContext(context), this.operationId);
    }

    debug(message: string, context?: LogContext): void {
        this.parentLogger.debug(message, this.mergeContext(context), this.operationId);
    }

    info(message: string, context?: LogContext): void {
        this.parentLogger.info(message, this.mergeContext(context), this.operationId);
    }

    warn(message: string, context?: LogContext): void {
        this.parentLogger.warn(message, this.mergeContext(context), this.operationId);
    }

    error(message: string, error?: any, context?: LogContext): void {
        this.parentLogger.error(message, error, this.mergeContext(context), this.operationId);
    }

    fatal(message: string, error?: any, context?: LogContext): void {
        this.parentLogger.fatal(message, error, this.mergeContext(context), this.operationId);
    }

    timing(operationName: string, duration: number, context?: LogContext): void {
        this.parentLogger.timing(operationName, duration, this.mergeContext(context), this.operationId);
    }
}

// Global logger instance
const globalLogger = new ProductionLogger();

// Backward compatibility functions
export function log(level: 'info' | 'warn' | 'error', message: string, data?: any): void {
    globalLogger.log(level as LogLevel, message, data ? { data } : undefined);
}

// Enhanced logging functions
export const logger = globalLogger;

/**
 * Create a performance timer for measuring operation duration
 */
export function createTimer(): { end: (label?: string) => number } {
    const start = Date.now();
    return {
        end: (label?: string) => {
            const duration = Date.now() - start;
            if (label) {
                globalLogger.timing(label, duration);
            }
            return duration;
        }
    };
}

/**
 * Generate a unique operation ID
 */
export function generateOperationId(): string {
    return `op_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}