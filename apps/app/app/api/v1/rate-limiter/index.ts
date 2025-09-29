import { Ratelimit } from '@upstash/ratelimit'
import { redis } from '@/lib/upstash'

// Rate limiter for payment endpoints - DDoS protection with reasonable limits
export const paymentRateLimit = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(50, '60s'), // 50 requests per minute per identifier
    analytics: true,
    prefix: '@okito/payment'
})

// Strict rate limiter for DDoS protection - very low limits
export const strictRateLimit = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(10, '60s'), // 5 requests per minute for suspicious activity
    analytics: true,
    prefix: '@okito/strict'
})

// Rate limiter for general API endpoints
export const apiRateLimit = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(100, '60s'), // 100 requests per minute
    analytics: true,
    prefix: '@okito/api'
})



// Utility function to create rate limit error response
export function createRateLimitResponse(limit: number, remaining: number, reset: Date) {
    return new Response(
        JSON.stringify({
            error: "Rate limit exceeded",
            message: "Too many requests. Please try again later.",
            limit,
            remaining,
            reset: reset.toISOString(),
        }),
        {
            status: 429,
            headers: {
                'Content-Type': 'application/json',
                'X-RateLimit-Limit': limit.toString(),
                'X-RateLimit-Remaining': remaining.toString(),
                'X-RateLimit-Reset': reset.toISOString(),
                'Retry-After': Math.ceil((reset.getTime() - Date.now()) / 1000).toString(),
            },
        }
    )
}

// Helper function to get identifier for rate limiting
export function getRateLimitIdentifier(apiKey: string | null, ip: string | null): string {
    if (apiKey) {
        return `api_key:${apiKey}`;
    }
    return `ip:${ip || 'unknown'}`;
}