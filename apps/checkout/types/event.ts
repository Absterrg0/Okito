import {z} from 'zod'

const productSchema = z.object({
    id:z.string(),
    name:z.string(),
    price:z.bigint(),

})


const paymentSchema = z.object({
    id:z.string(),
    projectId:z.string(),
    amount:z.bigint(),
    currency:z.enum(['USDC','USDT']),
    recipientAddress:z.string(),
    products:productSchema.array(),
})
export const projectSchema = z.object({
    name: z.string(),
    description:z.string().nullable(),
    logoUrl:z.string().nullable(),
    acceptedCurrencies:z.array(z.enum(['USDC','USDT'])).default([]),
})
export const apiTokenSchema = z.object({
    environment: z.enum(['TEST','LIVE'],{message:"Invalid environment"}).nullable(),

})

const eventSchema = z.object({
    id:z.string(),
    projectId:z.string(),
    project:projectSchema,
    type:z.enum(['PAYMENT_COMPLETED', 'PAYMENT_FAILED', 'PAYMENT_PENDING']),
    token:apiTokenSchema,
    metadata:z.any(),
    webhookUrl:z.string(),
    occurredAt:z.date(),
    sessionId:z.string(),
    paymentId:z.string().nullable(),
    payment:paymentSchema.nullable(),
})







export const getEventSchema = eventSchema.pick({
    sessionId:true
})




export const getEventSchemaResponse = eventSchema.omit({
    webhookUrl:true,
    type:true,
    metadata:true,
    projectId:true,
    id:true,
    

})