import { z } from 'zod'
import { apiTokenSchema } from './api-token'
import { paymentSchema } from './payment'
import { eventSchema } from './event'
import { webhookSchema } from './webhook'
import { userSchema } from './user'
import { trpc } from '@/lib/trpc'
export const projectSchema = z.object({
    id: z.string(),
    name: z.string(),
    createdAt: z.date(),
    userId: z.string(),
    user:userSchema,
    apiTokens: z.array(apiTokenSchema).optional().default([]),
    payments: z.array(paymentSchema).optional().default([]),
    events: z.array(eventSchema).optional().default([]),
    webhookEndpoints: z.array(webhookSchema).optional().default([]),
})

export const createProjectSchema = projectSchema.pick({
    name:true
})
export const createProjectSchemaResponse = projectSchema.pick({
    name:true,
    id:true
})





export const fetchProjectDetailsSchema = projectSchema.pick({
    id:true,
})

export const fetchProjectDetailsSchemaResponse = projectSchema.omit({
    user:true,
    payments:true,
    events:true
});









