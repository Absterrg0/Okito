import type { IncomingMessage } from 'http'
import crypto from 'node:crypto'
import { z } from 'zod'

// Webhook event schema (envelope)
export const OkitoWebhookEventSchema = z.object({
  id: z.string(),
  type: z.enum([
    'PAYMENT_PENDING',
    'PAYMENT_CONFIRMED',
    'PAYMENT_FAILED',
    'PAYMENT_EXPIRED',
    'WEBHOOK_TEST',
  ]),
  createdAt: z.union([z.string(), z.number()]),
  data: z.object({
    sessionId: z.string(),
    paymentId: z.string(),
    amount: z.number(),
    currency: z.string().optional(),
    network: z.string().optional(),
    status: z.string().optional(),
    metadata: z.any().optional(),
    walletAddress: z.string().optional(),
    tokenMint: z.string().optional(),
    transactionSignature: z.string().optional(),
    blockNumber: z.number().optional(),
    confirmedAt: z.string().optional(),
    products: z.array(z.object({
      id: z.string(),
      name: z.string(),
      price: z.number(),
      metadata: z.any().optional(),
    })).optional(),
  }).passthrough(),
}).strict()

export type OkitoWebhookEvent = z.infer<typeof OkitoWebhookEventSchema>

type HeadersLike = Record<string, string | string[] | undefined> | Headers

function normalizeHeader(headers: HeadersLike, key: string): string | undefined {
  if (headers instanceof Headers) return headers.get(key) ?? undefined
  const v = (headers as Record<string, any>)[key] ?? (headers as Record<string, any>)[key.toLowerCase()]
  if (Array.isArray(v)) return v[0]
  return v
}

function timingSafeEqual(a: string, b: string): boolean {
  const ab = Buffer.from(a)
  const bb = Buffer.from(b)
  if (ab.length !== bb.length) return false
  return crypto.timingSafeEqual(ab, bb)
}

function computeSignature(rawBody: string, secret: string): string {
  return crypto.createHmac('sha256', secret).update(rawBody, 'utf8').digest('hex')
}

async function readRawBodyFromNode(req: IncomingMessage): Promise<string> {
  return new Promise((resolve, reject) => {
    let data = ''
    req.setEncoding('utf8')
    req.on('data', (chunk) => { data += chunk })
    req.on('end', () => resolve(data))
    req.on('error', reject)
  })
}

export type HandleOkitoWebhookOptions = {
  /** Shared secret used to verify the webhook (HMAC-SHA256). If omitted, verification is skipped. */
  secret?: string
  /** Optional override for header name carrying the signature */
  signatureHeader?: string // default: 'x-okito-signature'
}

export type HandleOkitoWebhookResult = {
  ok: boolean
  isVerified: boolean
  event: OkitoWebhookEvent
  rawBody: string
}

/**
 * Universal webhook handler for Okito webhooks.
 * - Works with Fetch API Request (Next.js App Router/Edge), Node IncomingMessage (Express), or raw inputs
 */
export async function handleOkitoWebhook(
  input:
    | Request
    | IncomingMessage
    | { headers: HeadersLike; rawBody: string }
    | { headers: HeadersLike; body: string }
    | { headers: HeadersLike; text: () => Promise<string> },
  options: HandleOkitoWebhookOptions = {}
): Promise<HandleOkitoWebhookResult> {
  const signatureHeader = options.signatureHeader ?? 'x-okito-signature'

  // Extract headers and raw body across environments
  let headers: HeadersLike
  let rawBody: string

  if (typeof (input as any)?.text === 'function') {
    // Likely Fetch API Request-like
    const req = input as any
    headers = (req.headers ?? {}) as HeadersLike
    rawBody = await req.text()
  } else if (typeof (input as any)?.rawBody === 'string') {
    headers = (input as any).headers
    rawBody = (input as any).rawBody
  } else if (typeof (input as any)?.body === 'string') {
    headers = (input as any).headers
    rawBody = (input as any).body
  } else if (typeof (input as IncomingMessage)?.headers === 'object') {
    // Node IncomingMessage
    headers = (input as IncomingMessage).headers as HeadersLike
    rawBody = await readRawBodyFromNode(input as IncomingMessage)
  } else {
    throw new Error('Unsupported webhook input type')
  }

  // Optional signature verification
  let isVerified = false
  const providedSignature = normalizeHeader(headers, signatureHeader) ?? ''
  if (options.secret) {
    const expected = computeSignature(rawBody, options.secret)
    isVerified = timingSafeEqual(providedSignature, expected)
    if (!isVerified) {
      throw new Error('Invalid webhook signature')
    }
  }

  // Parse JSON body
  let json: unknown
  try {
    json = JSON.parse(rawBody)
  } catch {
    throw new Error('Invalid JSON payload')
  }

  // Validate and normalize
  const parsed = OkitoWebhookEventSchema.safeParse(json)
  if (!parsed.success) {
    throw new Error('Invalid webhook event payload')
  }

  return {
    ok: true,
    isVerified,
    event: parsed.data,
    rawBody,
  }
}

// Convenience: minimal Next.js App Router handler example
// export async function POST(req: Request) {
//   const { event } = await handleOkitoWebhook(req, { secret: process.env.OKITO_WEBHOOK_SECRET! })
//   // Do something with event
//   return new Response('ok')
// }




