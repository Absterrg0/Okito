import { customSessionClient } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";
import { auth } from "@/lib/auth"; 

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_APP_URL,
  
  // Better caching configuration using better-auth's built-in options
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 7 * 24 * 60 * 60 // 7 days
    },
    updateAge: 24 * 60 * 60, // Update session data every 24 hours
    refetchInterval: false, // Disable automatic refetching
    refetchOnWindowFocus: false, // Don't refetch when window regains focus
    refetchOnMount: false, // Don't refetch on component mount if we have data
  },
  
  plugins: [customSessionClient<typeof auth>()],
});

export const { signIn, signUp, signOut, useSession, getSession, $fetch } = authClient;