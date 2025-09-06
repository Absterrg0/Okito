import { protectedProcedure, router } from "../trpc";
import { createWebhookSchema, createWebhookSchemaResponse, getSecretForWebhookSchema, getSecretForWebhookSchemaResponse, listWebhooksByProjectSchema, listWebhooksByProjectSchemaResponse, updateWebhookSchema, updateWebhookSchemaResponse } from "@/types/webhook";
import prisma from "@/db";
import { TRPCError } from "@trpc/server";
import { encryptData, generateWebhookSecret, decryptData } from "@/lib/helpers";


const createWebhook =protectedProcedure
.input(createWebhookSchema).
output(createWebhookSchemaResponse)
.mutation(async ({input,ctx})=>{

    const {projectId,url,description} = input;

    const projectExists = await prisma.project.count({
        where:{
            id:projectId,
            userId:ctx.session?.user.id
        }
    })>0

    if(!projectExists){
        throw new TRPCError({
            code: "NOT_FOUND",
            message:" Project does not exist"
        })
    }

    // Check if webhook with same URL already exists for this project
    const existingWebhook = await prisma.webhookEndpoint.findFirst({
        where:{
            projectId: projectId,
            url: url,
            status: {
                not: "REVOKED" // Only check non-revoked webhooks
            }
        }
    })

    if(existingWebhook){
        throw new TRPCError({
            code: "CONFLICT",
            message: "A webhook with this URL already exists for this project"
        })
    }

    const rawWebhookSecret = generateWebhookSecret();
    const encryptedWebhookSecret = await encryptData(rawWebhookSecret)
  
    const validWebhook = await prisma.webhookEndpoint.create({
      data: {
        url: url,
        secret: encryptedWebhookSecret,
        description: description,
        eventTypes: [],
        projectId: projectId
      }
    });

    return {
        id: validWebhook.id,
        url: validWebhook.url,
        secret: rawWebhookSecret,
        description: validWebhook.description,
        status: validWebhook.status,
        createdAt: validWebhook.createdAt
    }
  

})




const listWebhooksForProjectQuery = protectedProcedure
.input(listWebhooksByProjectSchema)
.output(listWebhooksByProjectSchemaResponse.array())
.query( async ({input,ctx})=>{

    const {projectId} = input;

    const projectWithWebhooks = await prisma.project.findFirst({
        where:{
            id:projectId,
            userId:ctx.session?.user.id
        },
        include:{
            webhookEndpoints:{
                select:{
                    id:true,
                    url:true,
                    description:true,
                    secret:true,
                    status:true,
                    createdAt:true,
                    lastTimeHit:true
                }
            }
        }
    })

    if(!projectWithWebhooks){
        throw new TRPCError({
            code:"NOT_FOUND",
            message:"Project not found for the user"
        })
    }

    // Decrypt secrets before returning
    const decryptedWebhooks = await Promise.all(
        projectWithWebhooks.webhookEndpoints.map(async (webhook) => ({
            ...webhook,
            secret: await decryptData<string>(webhook.secret)
        }))
    );

    return decryptedWebhooks
})



const getSecretForWebhook = protectedProcedure
.input(getSecretForWebhookSchema)
.output(getSecretForWebhookSchemaResponse)
.query(
    async ({input,ctx})=>{

        const {id} = input;

        const webhook = await prisma.webhookEndpoint.findUnique({
            where:{
                id:id,
                project:{
                    userId:ctx.session.user.id
                }
            },
            select:{
                secret:true
            }
        })

        if(!webhook){
            throw new TRPCError({
                code:"NOT_FOUND",
                message:"Webhook not found"
            })
        }

        const decryptedSecret = await decryptData<string>(webhook.secret)
        return {
            secret:decryptedSecret
        }
    }
)


const updateWebhookStatus = protectedProcedure
.input(updateWebhookSchema)
.output(updateWebhookSchemaResponse)
.mutation(
    async ({input,ctx})=>{

        const {id,status} = input;

        await prisma.webhookEndpoint.update({
            where:{
                id:id,
                project:{
                    userId:ctx.session.user.id
                }
            },
            data:{
                status: status
            }
        })
        return {
            id:id,
            status:status
        }

    }
) 




export const webhookRouter = router({
    create: createWebhook,
    list: listWebhooksForProjectQuery,
    getSecret:getSecretForWebhook,
    updateStatus:updateWebhookStatus
})



