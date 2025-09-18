'use client'
import { HugeiconsIcon } from '@hugeicons/react'
import {
  Home01Icon,
  DocumentCodeIcon,
  InboxIcon,
  SettingsIcon,
  ShoppingBagIcon,
  ArchiveIcon,
  TruckIcon,
  CreditCardIcon,
  MailIcon,
  Notification01Icon,
} from '@hugeicons/core-free-icons'

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar"
import Image from "next/image"  
import Link from "next/link"
import { UserProfilePopover } from "@/components/dashboard/user-profile-popover"
import ProjectSelector from './project-selector'
import { User } from "better-auth";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { unstable_ViewTransition as ViewTransition, startTransition, unstable_addTransitionType as addTransitionType } from "react";

const menuItems = [
  {
    title: "Home",
    url: "/dashboard/home",
    icon: Home01Icon,
    id: "home",
  },
  {
    title: "Overview",
    url: "/dashboard/overview",
    icon: DocumentCodeIcon,
    id: "overview",
  },
  {
    title: "Events",
    url: "/dashboard/events",
    icon: InboxIcon,
    id: "events",
  },
  {
    title:"Settings",
    url: "/dashboard/settings",
    icon: SettingsIcon,
    id: "settings",
  }
]

const businessItems = [
  {
    title: "Orders",
    url: "/dashboard/orders",
    icon: ShoppingBagIcon,
    id: "orders",
  },
  {
    title: "Products",
    url: "/dashboard/products",
    icon: ArchiveIcon,
    id: "products",
  },
  {
    title: "Shipping",
    url: "/dashboard/shipping",
    icon: TruckIcon,
    id: "shipping",
  },
  {
    title: "Payments",
    url: "/dashboard/payments",
    icon: CreditCardIcon,
    id: "payments",
  },
]

const communicationItems = [
  {
    title: "Messages",
    url: "/dashboard/messages",
    icon: MailIcon,
    id: "messages",
  },
  {
    title: "Notifications",
    url: "/dashboard/notifications",
    icon: Notification01Icon,
    id: "notifications",
  },
  {
    title: "Reports",
    url: "/dashboard/reports",
    icon: DocumentCodeIcon,
    id: "reports",
  },
]

export function AppSidebar({user}:{user:User}) {
  const pathname = usePathname();
  const router = useRouter();

  const handleNavigate = (url: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    startTransition(() => {
      try { 
        addTransitionType("navigation-forward"); 
      } catch {}
      router.push(url);
    });
  };

  return (
      <Sidebar variant="inset">
          <ViewTransition>
          <SidebarHeader>
          <div className="px-2 pt-4 flex items-center justify-center">
            <Image
              src="/Okito-light.png"
              alt="Okito logo"
              width={64}
              height={64}
              className="dark:hidden"
            />
            <Image
              src="/Okito-dark.png"
              alt="Okito logo"
              width={64}
              height={64}
              className="hidden dark:block"
            />
          </div>
        </SidebarHeader>
        
        <SidebarContent>
          <ProjectSelector />
          
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {menuItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton 
                      asChild 
                      className={pathname.startsWith(item.url) ? "relative text-foreground" : undefined}
                    >
                      <Link href={item.url} onClick={handleNavigate(item.url)} className="relative block w-full">
                        {pathname.startsWith(item.url) && (
                          <div 
                            className="absolute inset-0 w-full h-full rounded-md crypto-glass-static pointer-events-none" 
                            style={{ 
                              viewTransitionName: 'sidebar-active',
                              padding: '0',
                              zIndex: 0
                            }}
                          />
                        )}
                        <div className="relative flex items-center gap-2" style={{ zIndex: 1 }}>
                          <HugeiconsIcon icon={item.icon} className="w-4 h-4" />
                          <span>{item.title}</span>
                        </div>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <SidebarGroup>
            <SidebarGroupLabel>Business</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {businessItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton 
                      asChild 
                      className={pathname.startsWith(item.url) ? "relative text-foreground" : undefined}
                    >
                      <Link href={item.url} onClick={handleNavigate(item.url)} className="relative z-0 block w-full">
                        {pathname.startsWith(item.url) && (
                          <div 
                            className="absolute inset-0 z-0 w-full h-full rounded-md crypto-input p-0 pointer-events-none" 
                            style={{ viewTransitionName: 'sidebar-active' }}
                          />
                        )}
                        <div className="relative z-10 flex items-center gap-2">
                          <HugeiconsIcon icon={item.icon} className="w-4 h-4" />
                          <span>{item.title}</span>
                        </div>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <SidebarGroup>
            <SidebarGroupLabel>Communication</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {communicationItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton 
                      asChild 
                      className={pathname.startsWith(item.url) ? "relative text-foreground" : undefined}
                    >
                      <Link href={item.url} onClick={handleNavigate(item.url)} className="relative z-0 block w-full">
                        {pathname.startsWith(item.url) && (
                          <div 
                            className="absolute inset-0 z-0 w-full h-full rounded-md crypto-input p-0 pointer-events-none" 
                            style={{ viewTransitionName: 'sidebar-active' }}
                          />
                        )}
                        <div className="relative z-10 flex items-center gap-2">
                          <HugeiconsIcon icon={item.icon} className="w-4 h-4" />
                          <span>{item.title}</span>
                        </div>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter className="border-t border-sidebar-border p-4">
          <UserProfilePopover user={user} />
        </SidebarFooter>
          </ViewTransition>
      </Sidebar>
  )
}