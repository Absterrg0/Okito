import { protectedProcedure, router } from "../trpc";
import type { ProtectedContext } from "../context";
import { 
    createProjectSchemaResponse,
    createProjectSchema,
    fetchProjectDetailsSchema,
    fetchProjectDetailsSchemaResponse, 
    updateProjectDetailsSchema, 
    updateProjectCurrenciesSchemaResponse, 
    updateProjectDetailsSchemaResponse, 
    updateProjectLogoSchema, 
    updateProjectLogoSchemaResponse, 
    updateProjectCurrenciesSchema, 
    updateProjectNotificationEmailSchema, 
    updateProjectNotificationEmailSchemaResponse 
} from "@/types/project";
import prisma from "@/db";
import { TRPCError } from "@trpc/server";




const createProject = protectedProcedure
.input(createProjectSchema)
.output(createProjectSchemaResponse)
.mutation(async ({input,ctx})=>{
    const {name} = input;


    const project = await prisma.project.create({
        data:{
            name,
            description:"",
            userId:ctx.session.user.id,
            acceptedCurrencies:['USDC','USDT'],
            notificationEmails:[ctx.session.user.email]
        }
    })



    return {
        id: project.id,
        name: project.name,
    }

})


const listProjects =  protectedProcedure
.output(createProjectSchemaResponse.array())
.query(
    async ({ctx}:{ctx:ProtectedContext})=>{
    
        const projects = await prisma.project.findMany({
            where:{
                userId:ctx.session.user.id
            },
            select:{
                name:true,
                id:true
            }
        })
        
        return projects
    
    })


const listProjectDetails = protectedProcedure.
input(fetchProjectDetailsSchema)
.output(fetchProjectDetailsSchemaResponse)
.query(
    async ({input,ctx})=>{

        const {id} = input;
        const details = await prisma.project.findUnique({
            where:{
                id:id,
                userId:ctx.session.user.id
            },
            include:{
                apiTokens:{
                    where:{
                        status:"ACTIVE"
                    },
                    select:{
                        id:true,
                        environment:true,
                        allowedDomains:true,
                        lastUsedAt:true,
                        createdAt:true,
                        status:true,
                        requestCount:true
                    }
                },
                webhookEndpoints:{
                    where:{
                        status:{
                            not:"REVOKED"
                        }
                    },
                    select:{
                        id:true,
                        url:true,
                        projectId:true,
                        description:true,
                        status:true,
                        createdAt:true,
                        lastTimeHit:true
                    }
                },
            }
        })

        if(!details){
            throw new TRPCError({
                code:"NOT_FOUND",
                message:"Project not found for the user"
            })
        }

        return details;
    }
)



const updateProjectDetails = protectedProcedure
.input(updateProjectDetailsSchema)
.output(updateProjectDetailsSchemaResponse)
.mutation(async ({input,ctx})=>{

    const {name,description,id} = input;

    const updatedProject = await prisma.project.update({
        where:{
            id:id,
            userId:ctx.session.user.id
        },
        data:{
            name,
            description
        }
    })

    if(!updatedProject){
        throw new TRPCError({
            code:"UNAUTHORIZED",
            message:"Invalid project Id or unauthorized"
        })
    }

    return {
        name:updatedProject.name,
        description:updatedProject.description
    }

})


const updateProjectLogo = protectedProcedure
.input(updateProjectLogoSchema)
.output(updateProjectLogoSchemaResponse)
.mutation(async ({input,ctx})=>{

    const {id,logoUrl} = input;

    const updatedProject = await prisma.project.update({
        where:{
            id,
            userId:ctx.session.user.id
        },
        data:{
            logoUrl
        }
    })

    if(!updatedProject){
        throw new TRPCError({
            code:"UNAUTHORIZED",
            message:"Invalid project Id or unauthorized"
        })
    }
    return{
        logoUrl
    }
})



const updateProjectCurrencies = protectedProcedure
.input(updateProjectCurrenciesSchema)
.output(updateProjectCurrenciesSchemaResponse)
.mutation(async ({input,ctx})=>{
    const {acceptedCurrencies,id} = input;

    console.log(acceptedCurrencies);
    const updatedProject = await prisma.project.update({
        where:{
            id,
            userId:ctx.session.user.id
        },
        data:{
            acceptedCurrencies:acceptedCurrencies
        }
    })

    if(!updatedProject){
        throw new TRPCError({
            code:"UNAUTHORIZED",
            message:"Invalid project Id or unauthorized"
        })
    }
    return{
        acceptedCurrencies:updatedProject.acceptedCurrencies
    }
})




const updateProjectNotificationEmail = protectedProcedure
.input(updateProjectNotificationEmailSchema)
.output(updateProjectNotificationEmailSchemaResponse)
.mutation(async ({input,ctx})=>{
    const {id,notificationEmails} = input;


    const updatedProject = await prisma.project.update({
        where:{
            id,
            userId:ctx.session.user.id
        },
        data:{
            notificationEmails
        }
    })

    if(!updatedProject){
        throw new TRPCError({
            code:"UNAUTHORIZED",
            message:"Invalid project Id or unauthorized"
        })
    }
    return{
        notificationEmails
    }
    
})



export const projectRouter = router({
    create: createProject,
    list: listProjects,
    details:listProjectDetails,
    updateProjectDetails,
    updateProjectLogo,
    updateProjectCurrencies,
    updateProjectNotificationEmail
})