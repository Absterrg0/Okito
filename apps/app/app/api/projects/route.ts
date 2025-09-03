import prisma from "@/db";
import { auth } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const session = await auth.api.getSession({
        headers: req.headers,
    });

    if (!session?.user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const projects = await prisma.project.findMany({
        where: { userId: session.user.id },
        select: {
            id: true,
            name: true,
            createdAt:true,
            updatedAt:true
        },
    });

    return NextResponse.json(projects, { status: 200 });
}