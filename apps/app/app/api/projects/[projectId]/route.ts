import prisma from "@/db";
import { auth } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";



export async function GET(req:NextRequest,{params}:{params:Promise<{projectId:string}>}){

    const session = await auth.api.getSession({
        headers: req.headers,
    })

    if(!session?.user){
        return NextResponse.json({
            msg:"Unauthorized"
        },{
            status:403
        })
    }

    const projectId = await params;

    const validProject = await prisma.project.findUnique({
        where:{
            id:projectId.projectId,
            userId:session.user.id
        },
        include:{
            apiTokens:true,
            webhookEndpoints:true,
        }
    })

    if(!validProject){
        return NextResponse.json({
            msg:"Project not found or invalid owner"
        },{
            status:404
        })
    }


    return NextResponse.json({
        msg:"Project details fetched successfully",
        project:validProject
    },{
        status:200
    })
}