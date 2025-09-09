import prisma from "@/db";
import { NextRequest, NextResponse } from "next/server";



export async function GET(req:NextRequest,{params}:{params:Promise<{sessionId:string}>}){


    const {sessionId} = await params;

    const session = await prisma.session.findUnique({
        where: {
            id: sessionId
        }
    })
    

    if(!session){
        return NextResponse.json({
            msg: "Session not found"
        }, {
            status: 404
        })
    }
    
    return NextResponse.json(session)
}