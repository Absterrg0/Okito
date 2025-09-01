import prisma from "@/db"
import { auth } from "@/lib/auth"
import { NextRequest, NextResponse } from "next/server"
import z from "zod"
import { generateApiToken,hashValue } from "@/lib/helpers"
const projectSchema = z.object({
  projectName: z.string().min(1),
})


export async function POST(request: NextRequest) {
  const user = await auth.api.getSession({
    headers: request.headers,
  })

  if (!user) {
    return NextResponse.json({
      msg: "Unauthorized"
    }, {
      status: 401
    })
  }

  const result = projectSchema.safeParse(await request.json())

  if (!result.success) {
    return NextResponse.json({ error: result.error.message }, { status: 400 })
  }

  const { projectName } = result.data

  try {
    // Generate actual tokens
    const testToken = generateApiToken('DEVELOPMENT')
    const liveToken = generateApiToken('PRODUCTION')

    // Create project and API tokens in a transaction
    const project = await prisma.project.create({
      data: {
        name: projectName,  
        userId: user.user.id,
        apiTokens: {
          create: [
            {
              tokenHash: hashValue(testToken),
              name: "Development Key",
              environment: "DEVELOPMENT",
              allowedDomains: [],
            },
            {
              tokenHash: hashValue(liveToken),
              name: "Production Key",
              environment: "PRODUCTION",
              allowedDomains: [],
            }
          ]
        }
      }
    });


    // Return the actual tokens (only time they're visible)
    return NextResponse.json({
      msg: "Project created successfully",
      project: {
        name: project.name,
        id:project.id
      },
      
    }, {
      status: 200
    })

  } catch (error) {
    console.error('Error creating project:', error)
    return NextResponse.json({
      error: "Failed to create project"
    }, {
      status: 500
    })
  }
}