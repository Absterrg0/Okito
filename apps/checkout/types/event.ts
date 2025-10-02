import {z} from 'zod'

const productSchema = z.object({
    id:z.string(),
    name:z.string(),
    price:z.bigint(),
})


// Full payment (not used in response)
const paymentSchema = z.object({
    id:z.string(),
    projectId:z.string(),
    amount:z.bigint(),
    recipientAddress:z.string(),
    products:productSchema.array(),
})

// Preview payment for checkout response
const paymentPreviewSchema = z.object({
    status: z.enum(['PENDING','CONFIRMED','FAILED']),
    products: productSchema.array(),
})
export const projectSchema = z.object({
    name: z.string(),
    description:z.string().nullable(),
    logoUrl:z.string().nullable(),
    acceptedCurrencies:z.array(z.enum(['USDC','USDT'])).default([]),
})
export const apiTokenSchema = z.object({
    environment: z.enum(['TEST','LIVE'],{message:"Invalid environment"}),

})

const eventSchema = z.object({
    id:z.string(),
    projectId:z.string(),
    project:projectSchema,
    type:z.enum(['PAYMENT']),
    token:apiTokenSchema,
    metadata:z.any(),
    createdAt:z.date(),
    sessionId:z.string(),
    paymentId:z.string().nullable(),
    payment:paymentSchema.nullable(),
})







export const getEventSchema = eventSchema.pick({
    sessionId:true
})




export const getEventSchemaResponse = z.object({
    createdAt: z.date(),
    sessionId: z.string(),
    paymentId: z.string().nullable(),
    payment: paymentPreviewSchema.nullable(),
    project: projectSchema,
    token: apiTokenSchema.nullable(),
})