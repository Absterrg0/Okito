import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";





export async function POST(req:NextRequest){

        const headersList = await headers();

        const authHeader = headersList.get('Authorization');

        if(!authHeader){
            return NextResponse.json({
                msg:"Unauthorized"
            },{
                status:403
            })
        }

        if(authHeader !== process.env.AUTH_HEADER){
            return NextResponse.json({
                msg:"Invalid auth header found"
            },{
                status:403
            })
        }

        const webhookData = await req.json();

        // Parse the webhook data and update the backend after confirming properly.



        

        return NextResponse.json({
            msg:"OK"
        },{
            status:200
        })

}