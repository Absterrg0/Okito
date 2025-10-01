import { z } from 'zod'
import { paymentSchema } from './payment'
import { productSchema } from './product'

// Basic event schema for list view
export const eventSchema = z.object({
    id: z.string(),
    projectId: z.string(),
    sessionId: z.string(),    
    type: z.enum(['PAYMENT']),
    metadata: z.any(),
    createdAt: z.date(),
})

export type Event = z.infer<typeof eventSchema>

export const getEventSchema = eventSchema.pick({
    projectId: true,
})

// Minimal payment fields for list view
export const paymentListSchema = paymentSchema.pick({
    amount: true,
    currency: true,
    status: true,
})

export const EventSchemaResponse = eventSchema
    .omit({ projectId: true })
    .extend({
        payment: paymentListSchema.nullable().optional(),
    })

export const getEventSchemaResponse = z.array(EventSchemaResponse)

// Use shared product/payment types with picks/omits for details view
export const productDetailsSchema = productSchema.pick({
    id: true,
    name: true,
    price: true,
    metadata: true,
})

export type ProductDetails = z.infer<typeof productDetailsSchema>

export const paymentDetailsSchema = paymentSchema.pick({
    amount: true,
    currency: true,
    txHash: true,
    status: true,
}).extend({
    products: z.array(productDetailsSchema),
})

export type PaymentDetails = z.infer<typeof paymentDetailsSchema>

// Delivery schema for event details
export const deliveryDetailsSchema = z.object({
    endpoint: z.object({
        url: z.string(),
    }),
    attemptNumber: z.number(),
    deliveryStatus: z.enum(['PENDING', 'DELIVERED', 'FAILED', 'RETRYING']),
})

export type DeliveryDetails = z.infer<typeof deliveryDetailsSchema>

// Input schema for getting event details
export const getEventDetailsSchema = z.object({
    id: z.string()
})

// Response schema for event details
export const getEventDetailsSchemaResponse = z.object({
    type: z.enum(['PAYMENT']),
    sessionId: z.string(),
    metadata: z.any(),
    payment: paymentDetailsSchema.nullable(),
    deliveries: z.array(deliveryDetailsSchema),
})

export type EventDetailsResponse = z.infer<typeof getEventDetailsSchemaResponse>


