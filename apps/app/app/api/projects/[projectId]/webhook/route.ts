import prisma from "@/db";
import { auth } from "@/lib/auth";
import { generateWebhookSecret } from "@/lib/helpers";
import { encryptData } from "@/lib/helpers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, { params }: { params: Promise<{ projectId: string }> }) {
  const session = await auth.api.getSession({
    headers: req.headers,
  });

  if (!session?.user) {
    return NextResponse.json({
      msg: "Unauthorized"
    }, { status: 403 });
  }

  const { projectId } = await params;

  const projectExists = await prisma.project.count({
    where: {
      id: projectId,
      userId: session.user.id
    }
  }) > 0;

  if (!projectExists) {
    return NextResponse.json({
      msg: "Project not found or invalid owner"
    }, { status: 404 });
  }

  const { url,description } = await req.json();

  if (!url) {
    return NextResponse.json({
      msg: "URL is required"
    }, { status: 400 });
  }

  // Validate and sanitize URL
  let sanitizedUrl: string;
  try {
    const urlObj = new URL(url);
    // Remove trailing slash if present
    sanitizedUrl = urlObj.toString().replace(/\/$/, '');
    
    // Ensure it's HTTPS (recommended for webhooks)
    if (urlObj.protocol !== 'https:') {
      return NextResponse.json({
        msg: "URL must use HTTPS protocol"
      }, { status: 400 });
    }
  } catch (error) {
    return NextResponse.json({
      msg: "Invalid URL format"
    }, { status: 400 });
  }

  // Auto-generate secret if not provided
  const rawWebhookSecret = generateWebhookSecret();
  const encryptedWebhookSecret = await encryptData(rawWebhookSecret)

  const validWebhook = await prisma.webhookEndpoint.create({
    data: {
      url: sanitizedUrl,
      secret: encryptedWebhookSecret,
      description: description || null,
      eventTypes: [],
      apiVersion: "1.0",
      projectId: projectId
    }
  });

  return NextResponse.json({
    msg: "Webhook endpoint created successfully",
    webhook: {
      url: validWebhook.url,
      secret: rawWebhookSecret, 
      description: validWebhook.description || null
    }
  }, { status: 201 });
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

  const projectExists = await prisma.project.count({
    where: {
      id: projectId,
      userId: session.user.id
    }
  }) > 0;
  
  if(!projectExists){
    return NextResponse.json({
      msg:"Project not found or invalid owner"
    },{
      status:404
    })
  }
  
  const webhooks = await prisma.webhookEndpoint.findMany({
    where: {
      projectId: projectId
    },
    select: {
        url:true,
        description:true,
        status:true,
        lastUsedAt:true,
        createdAt:true
    }
  });
  
  
  return NextResponse.json({
    msg:"Webhooks fetched successfully",
    webhooks:webhooks
  },{
    status:200
  })
  
}
