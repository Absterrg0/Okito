/**
 * Simple logging utility
 */
export function log(level: 'info' | 'warn' | 'error', message: string, data?: any) {
    if (typeof console !== 'undefined') {
        const timestamp = new Date().toISOString();
        const logMessage = `[${timestamp}] [${level.toUpperCase()}] ${message}`;
        
        switch (level) {
            case 'error':
                console.error(logMessage, data || '');
                break;
            case 'warn':
                console.warn(logMessage, data || '');
                break;
            default:
                console.log(logMessage, data || '');
        }
    }
}