// src/auth.ts (or wherever your config is)

import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "@/db/index";
import { oAuthProxy, customSession } from "better-auth/plugins";

export const auth = betterAuth({
  
  appName: "Okito",
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    },
  },
  plugins: [oAuthProxy(),
    customSession(async ({user,session})=>{
      const userInfo = await prisma.user.findUnique({
        where: { id: user.id },
        select: { walletAddress: true, verifiedAt: true },
      })
      return {
        user: {
          ...user,
          walletAddress: userInfo?.walletAddress ?? null,
          verifiedAt: userInfo?.verifiedAt ?? null,
        },
        session: {
          id: session.id,
          userId: session.userId,
          expiresAt: session.expiresAt,
          createdAt: session.createdAt,
          updatedAt: session.updatedAt,
        },
      }
    }),
  ],
  session:{
    cookieCache:{
      enabled:true
    }
  },
  additionalFields:{
    user:{
      fields:{
        walletAddress:true,
        verifiedAt:true
      }
    }
  }
});