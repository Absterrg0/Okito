import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import prisma from "@/db"



export const userHasProjects = async () => {
    const session = await auth.api.getSession({
      headers: await headers(),
    });
  
    if (!session?.user) {
      throw new Error("Unauthorized"); // ✅ let caller handle redirect
    }
  
    const projects = await prisma.project.findMany({
      where: { userId: session.user.id },
      select: { id: true }, // more efficient, we only need to know if exists
      take: 1,
    });
  
    return projects.length > 0;
  };
  