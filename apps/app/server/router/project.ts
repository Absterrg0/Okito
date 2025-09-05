import { protectedProcedure, router } from "../trpc";
import type { ProtectedContext } from "../context";
import { createProjectSchemaResponse, createProjectSchema, fetchProjectDetailsSchema, fetchProjectDetailsSchemaResponse } from "@/types/project";
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
            userId:ctx.session.user.id,
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




export const projectRouter = router({
    create: createProject,
    list: listProjects,
    details:listProjectDetails
})