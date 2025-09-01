"use client"

import { usePathname } from "next/navigation"
import {
  Calendar,
  Home,
  Inbox,
  Search,

  FileText,
  Mail,
  ShoppingCart,
  CreditCard,
  Bell,
  Package,
  Truck,
} from "lucide-react"

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
import { UserProfilePopover } from "./user-profile-popover"
import ProjectSelector from "./project-selector"
const menuItems = [
  {
    title: "Overview",
    url: "/dashboard/home",
    icon: Home,
    id: "home",
  },
  {
    title: "Todo",
    url: "/dashboard/todo",
    icon: Inbox,
    id: "todo",
  },
  {
    title: "Calendar",
    url: "/dashboard/calendar",
    icon: Calendar,
    id: "calendar",
  },
  {
    title: "Search",
    url: "/dashboard/search",
    icon: Search,
    id: "search",
  },
]

const businessItems = [
  {
    title: "Orders",
    url: "/dashboard/orders",
    icon: ShoppingCart,
    id: "orders",
  },
  {
    title: "Products",
    url: "/dashboard/products",
    icon: Package,
    id: "products",
  },
  {
    title: "Shipping",
    url: "/dashboard/shipping",
    icon: Truck,
    id: "shipping",
  },
  {
    title: "Payments",
    url: "/dashboard/payments",
    icon: CreditCard,
    id: "payments",
  },
]

const communicationItems = [
  {
    title: "Messages",
    url: "/dashboard/messages",
    icon: Mail,
    id: "messages",
  },
  {
    title: "Notifications",
    url: "/dashboard/notifications",
    icon: Bell,
    id: "notifications",
  },
  {
    title: "Reports",
    url: "/dashboard/reports",
    icon: FileText,
    id: "reports",
  },
]

export function AppSidebar() {
  const pathname = usePathname()

  return (
    <Sidebar variant="inset">
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
                    isActive={pathname === item.url}
                    className={pathname === item.url ? "!bg-primary/20 !text-primary " : ""}
                  >
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
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
                    isActive={pathname === item.url}
                    className={pathname === item.url ? "!bg-primary/20 !text-primary-foreground border border-primary/30" : ""}
                  >
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
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
                    isActive={pathname === item.url}
                    className={pathname === item.url ? "!bg-primary/20 !text-primary-foreground border border-primary/30" : ""}
                  >
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border p-4">
        <UserProfilePopover></UserProfilePopover>
          </SidebarFooter>
    </Sidebar>
  )
}