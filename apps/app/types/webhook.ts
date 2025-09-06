import { z } from 'zod'

export const webhookSchema = z.object({
    id: z.uuid({message:'Invalid webhook ID'}),
    projectId: z.uuid({message:'Invalid project ID'}),
    url: z.url({message:'Invalid URL format'}).transform(val=> val.replace(/\/$/,'')),
    description: z.string().max(100,{message:'Description must be less than 100 characters'}).nullable().optional(),
    secret: z.string(),
    status: z.enum(['ACTIVE', 'INACTIVE','REVOKED']),
    lastTimeHit: z.date().nullable().optional(),
    createdAt: z.date(),
})
export const createWebhookSchema = webhookSchema.pick({
    projectId:true,
    url:true,
    description:true
})
export const createWebhookSchemaResponse = webhookSchema.pick({
    id:true,
    url:true,
    description:true,
    secret:true,
    status:true,
    createdAt:true
})
export const listWebhooksByProjectSchema = webhookSchema.pick({
    projectId:true
})
export const listWebhooksByProjectSchemaResponse = webhookSchema.pick({
    id:true,
    url:true,
    description:true,
    secret:true,
    status:true,
    createdAt:true,
    lastTimeHit:true
})


export const getSecretForWebhookSchema = webhookSchema.pick({
    id:true
})

export const getSecretForWebhookSchemaResponse = webhookSchema.pick({
    secret:true
})
export const updateWebhookSchema = webhookSchema.pick({
    id:true,
    status:true
})


export const updateWebhookSchemaResponse = webhookSchema.pick({
    id:true,
    status:true,
})






















export type Webhook = z.infer<typeof webhookSchema>
export type createWebhookPayload = z.infer<typeof createWebhookSchema>
export type createWebhookResponse = z.infer<typeof createWebhookSchemaResponse>
export type listWebhooksByProject = z.infer<typeof listWebhooksByProjectSchema>
export type listWebhooksByProjectResponse = z.infer<typeof listWebhooksByProjectSchemaResponse>