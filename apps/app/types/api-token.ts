import { z } from 'zod'

export const apiTokenSchema = z.object({
    id: z.uuid({message:"Invalid id"}),
    projectId: z.uuid({message:"Invalid project id"}),
    environment: z.enum(['TEST','LIVE'],{message:"Invalid environment"}),
    allowedDomains: z.array(z.url().transform(val=> val.replace(/\/$/,'')).optional()).default([]),
    lastUsedAt: z.date().nullable(),
    createdAt: z.date(),
    status: z.enum(['ACTIVE', 'REVOKED'],{message:"Invalid status"}),
    requestCount:z.number(),

})

export const createApiTokenSchema = apiTokenSchema.pick({
    environment:true,
    projectId:true,

})


export const createApiTokenSchemaResponse = apiTokenSchema.pick({
    id:true,
    environment:true,
    createdAt:true,
    status:true,
    requestCount:true,
})



export const listApiTokenForProjectSchema = apiTokenSchema.pick({
    projectId:true,
})





export type ApiToken = z.infer<typeof apiTokenSchema>
