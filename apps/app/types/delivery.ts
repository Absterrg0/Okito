import { z } from 'zod'

export const deliverySchema = z.object({
    id: z.string(),
    eventId: z.string(),
    endpointId: z.string(),
    // Avoid circular schemas; represent relations as ids or shape separately if needed
    attemptNumber: z.number(),
    deliveryStatus: z.enum(['PENDING', 'DELIVERED', 'FAILED', 'RETRYING']),
    httpStatusCode: z.number().nullable(),
    errorMessage: z.string().nullable(),
    responseBody: z.string().nullable(),
    deliveredAt: z.date(),
})

export type Delivery = z.infer<typeof deliverySchema>
