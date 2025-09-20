  
import "@/app/globals.css";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/dashboard/sidebar";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { SessionProvider } from "@/components/providers/session-provider";
import { unstable_ViewTransition as ViewTransition } from "react"
import { User } from "better-auth";

export default async function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const session  = await auth.api.getSession({
    headers: await headers()
  })

const user = session?.user as User


  return (
    <ViewTransition>
    
    <SessionProvider session={session}>
          <SidebarProvider>
            <AppSidebar user={user} />
            <SidebarInset>
              {children}
            </SidebarInset>
          </SidebarProvider>
        </SessionProvider>
    </ViewTransition>
  );
}
