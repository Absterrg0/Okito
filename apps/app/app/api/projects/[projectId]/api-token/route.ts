import prisma from "@/db";
import { auth } from "@/lib/auth";
import { generateApiToken, hashValue } from "@/lib/helpers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, { params }: { params: Promise<{ projectId: string }> }) {
  const session = await auth.api.getSession({
    headers: req.headers,
  });

  const { environment } = await req.json();

  if (!['test', 'live'].includes(environment)) {
    return NextResponse.json({
      msg: "Invalid environment"
    }, { status: 400 });
  }

  if (!session?.user) {
    return NextResponse.json({
      msg: "Unauthorized"
    }, { status: 403 });
  }

  const projectId = await params;

  const projectExists = await prisma.project.count({
    where: {
      id: projectId.projectId,
      userId: session.user.id
    }
  }) > 0;

  if (!projectExists) {
    return NextResponse.json({
      msg: "Project not found or invalid owner"
    }, { status: 404 });
  }

  let apiToken: string;
  if (environment === 'test') {
    apiToken = generateApiToken('DEVELOPMENT');
  } else {
    apiToken = generateApiToken('PRODUCTION');
  }

  const createdApiToken = await prisma.apiToken.create({
    data: {
      projectId: projectId.projectId,
      tokenHash: hashValue(apiToken),
      name: "API Token",
      environment: environment === 'test' ? 'DEVELOPMENT' : 'PRODUCTION',
      allowedDomains: []
    }
  });

  return NextResponse.json({
    msg: "API token created successfully",
    apiToken: {
      id: createdApiToken.id,
      rawToken: apiToken,
      name: createdApiToken.name,
      environment: createdApiToken.environment
    }
  }, { status: 200 });
}




export async function GET(req:NextRequest,{params}:{params:Promise<{projectId:string}>}){
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
    
    const { projectId } = await params;
  
    const apiTokens = await prisma.apiToken.findMany({
      where:{
        projectId:projectId,
        project:{
          userId:session.user.id
        }
      }
    })

    return NextResponse.json({
      msg:"API tokens fetched successfully",
      apiTokens:apiTokens
    },{
      status:200
    })
}