import { z } from 'zod'
import { apiTokenSchema } from './api-token'
import { paymentSchema } from './payment'
import { eventSchema } from './event'
import { webhookSchema } from './webhook'
import { userSchema } from './user'
export const projectSchema = z.object({
    id: z.string(),
    name: z.string(),
    description:z.string().nullable(),
    logoUrl:z.string().nullable(),
    acceptedCurrencies:z.array(z.enum(['USDC','USDT'])).default([]),
    notificationEmails:z.array(z.string()),
    createdAt: z.date(),
    userId: z.string(),
    user:userSchema,
    apiTokens: z.array(apiTokenSchema).optional().default([]),
    payments: z.array(paymentSchema).optional().default([]),
    events: z.array(eventSchema).optional().default([]),
    webhookEndpoints: z.array(webhookSchema).optional().default([]),
})

export const createProjectSchema = projectSchema.pick({
    name:true,
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
}).extend({
    apiTokens: z.array(apiTokenSchema.omit({ projectId: true })).optional().default([]),
    webhookEndpoints: z.array(webhookSchema.omit({ secret: true })).optional().default([]),
    notificationEmails: z.array(z.string()).optional().default([]),
});



export const updateProjectDetailsSchema = projectSchema.pick({
    name:true,
    description:true,
    id:true
})


export const updateProjectDetailsSchemaResponse = projectSchema.pick({
    name:true,
    description:true,
})

export const updateProjectCurrenciesSchema = projectSchema.pick({
        id:true,
        acceptedCurrencies:true,
})

export const updateProjectCurrenciesSchemaResponse = projectSchema.pick({
    acceptedCurrencies:true,
})
export const updateProjectNotificationEmailSchema = projectSchema.pick({
    id:true,
    notificationEmails:true,
})

export const updateProjectNotificationEmailSchemaResponse = projectSchema.pick({
    notificationEmails:true,
})

export const updateProjectLogoSchema = projectSchema.pick({
    id:true,
    logoUrl:true
})


export const updateProjectLogoSchemaResponse = projectSchema.pick({
    logoUrl:true
})

export type ProjectDetails = z.infer<typeof fetchProjectDetailsSchemaResponse>









