  
import "@/app/globals.css";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/dashboard/sidebar";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { SessionProvider } from "@/components/providers/session-provider";
import { unstable_ViewTransition as ViewTransition } from "react"

export default async function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const session  = await auth.api.getSession({
    headers: await headers()
  })

const user = session?.user


  return (
        <SessionProvider session={session}>
          <SidebarProvider>
            <ViewTransition>
            {user && <AppSidebar user={user} />}
            </ViewTransition>
            <SidebarInset>
              {children}
            </SidebarInset>
          </SidebarProvider>
        </SessionProvider>
  );
}
