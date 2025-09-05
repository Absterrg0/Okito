import { createApiTokenSchema,createApiTokenSchemaResponse, listApiTokenForProjectSchema } from "@/types/api-token"
import { protectedProcedure, router } from "../trpc"
import { z } from "zod"
import { generateApiToken, hashValue } from "@/lib/helpers"
import prisma from "@/db"
import { TRPCError } from "@trpc/server"





const createApiToken = protectedProcedure.
input(createApiTokenSchema).
output(createApiTokenSchemaResponse.extend({
    rawToken:z.string(),
})).
mutation(async ({input,ctx})=>{
    const {environment,projectId} = input;

    const validProject = await prisma.project.count({
        where:{
            id:projectId,
            userId:ctx.session.user.id
        }
    }) >0;

    if(!validProject){
        throw new TRPCError({
            code:"NOT_FOUND",
            message:"Project not found for the user"
        })
    }

    const rawToken = generateApiToken(environment);
    const tokenHash = hashValue(rawToken);
    const apiToken = await prisma.apiToken.create({
        data:{
            projectId,
            tokenHash,
            environment,
            allowedDomains:[]
        }
    })
    
    return {
        id:apiToken.id,
        createdAt:apiToken.createdAt,
        environment:apiToken.environment,
        requestCount:apiToken.requestCount,
        status:apiToken.status,
        rawToken:rawToken
    }
})




const listApiTokenForProject = protectedProcedure
.input(listApiTokenForProjectSchema)
.output(createApiTokenSchemaResponse.array())
.query(async ({input,ctx})=>{
    const {projectId} = input;
    const apiTokens = await prisma.apiToken.findMany({
        where:{
            projectId,
        },
        select:{
            id:true,
            environment:true,
            createdAt:true,
            status:true,
            requestCount:true
        }
    })
    return apiTokens
})






export const apiTokenRouter = router({
    create:createApiToken,
    list:listApiTokenForProject
})