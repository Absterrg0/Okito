import prisma from "@/db";
import { auth } from "@/lib/auth";
import { decryptData } from "@/lib/helpers";
import { NextRequest, NextResponse } from "next/server";






export async function GET(req:NextRequest,{params}:{params:Promise<{projectId:string,webhookId:string}>}){
    const session = await auth.api.getSession({
        headers: req.headers,
    });
    
    if(!session?.user){
        return NextResponse.json({
            msg:"Unauthorized"
        },{
            status:403
        })
    }


    const { projectId,webhookId } = await params;

    const webhookExists = await prisma.webhookEndpoint.findFirst({
        where:{
            id:webhookId,
            projectId:projectId,
            project:{
                userId:session.user.id
            }
        }
    })

    if(!webhookExists){
        return NextResponse.json({
            msg:"Webhook not found or invalid owner"
        },{
            status:404
        })
    }
    
    const decryptedSecret = await decryptData(webhookExists.secret);

    return NextResponse.json({
        msg:"Webhook secret fetched successfully",
        secret:decryptedSecret
    },{
        status:200
    })
}