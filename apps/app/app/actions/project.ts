import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import prisma from "@/db"





export const userHasProjects = async ()=>{
    const session = await auth.api.getSession({
        headers:await headers()
    })

    if(!session?.user){
        return {
            error:'Unauthorized'
        }
    }

    const projects = await prisma.project.findMany({
        where:{userId:session.user.id}
    })

    if(projects.length === 0){
        return false;
    }

    return true;
}