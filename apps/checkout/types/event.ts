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

const eventSchema = z.object({
    id:z.string(),
    projectId:z.string(),
    type:z.enum(['PAYMENT_COMPLETED', 'PAYMENT_FAILED', 'PAYMENT_PENDING']),
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
    occurredAt:true,
    projectId:true,
    id:true,

})