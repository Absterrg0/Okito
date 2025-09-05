import { z } from 'zod'

export const eventSchema = z.object({
    id: z.string(),
    projectId: z.string(),
    type: z.enum(['PAYMENT_COMPLETED', 'PAYMENT_FAILED', 'PAYMENT_PENDING']),
    metadata: z.any(),
    webhookUrl: z.string(),
    occurredAt: z.date(),
})

export type Event = z.infer<typeof eventSchema>
