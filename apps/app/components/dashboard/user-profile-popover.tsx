"use client"

import { useState, lazy, Suspense } from "react"
import { Popover,PopoverContent,PopoverTrigger } from "@/components/ui/popover"

import Image from "next/image"
import { ChevronDown, User, HelpCircle, LogOut } from "lucide-react"
import { signOut, useSession } from "@/lib/auth-client"

export function UserProfilePopover() {
  const [open, setOpen] = useState(false)
  const [profileDialogOpen, setProfileDialogOpen] = useState(false)
  const {data:session} = useSession()
  const handleProfileClick = () => {
    setOpen(false) // Close the popover
    setProfileDialogOpen(true) // Open the profile dialog
  }

  if (!session) {
    return (
      <div className="flex items-center gap-4 w-full justify-center">
        <div className="relative flex h-4 w-4">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary/100"></span>
          <span className="relative inline-flex rounded-full h-4 w-4 bg-gradient-to-br from-primary to-accent shadow-sm"></span>
        </div>
        <div className="flex flex-col gap-1.5">
          <div className="h-3 w-20 animate-pulse rounded-md bg-accent/80"></div>
          <div className="h-2.5 w-16 animate-pulse rounded-md bg-accent/60"></div>
        </div>
        <div className="w-4 h-4 animate-pulse rounded-sm ml-auto bg-accent"></div>
      </div>
    )
  }
  return (
    <>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <div
            className="flex items-center text-start gap-4 cursor-pointer"
            onMouseEnter={() => setOpen(true)}
            onMouseLeave={() => setOpen(false)}
          >
            <Image
              src={session?.user?.image || ""}
              alt="User avatar"
              width={40}
              height={40}
              className="rounded-2xl"
              priority
            />
            <div className="flex flex-col">
              <p className="text-sm font-medium">{session?.user?.name}</p>
              <p className="text-xs text-gray-500">{session?.user?.email}</p>
            </div>
            <ChevronDown fill="#000" strokeWidth={4} className="w-4 h-4" />
          </div>
        </PopoverTrigger>
        <PopoverContent
          className="w-56"
          sideOffset={5}
          onMouseEnter={() => setOpen(true)}
          onMouseLeave={() => setOpen(false)}
        >
          <div className="flex flex-col gap-2">
            <div 
              className="flex items-center gap-2 p-2 hover:bg-accent rounded-md cursor-pointer"
              onClick={handleProfileClick}
            >
              <User className="w-4 h-4" />
              <span className="text-sm">Profile</span>
            </div>
            <div className="h-px bg-border" />
            <div className="flex items-center gap-2 p-2 hover:bg-accent rounded-md cursor-pointer">
              <HelpCircle className="w-4 h-4" />
              <span className="text-sm">Help</span>
            </div>
            <div className="h-px bg-border" />
            <div
              onClick={() => signOut()}
              className="flex items-center gap-2 p-2 hover:bg-accent rounded-md cursor-pointer text-red-500">
              <LogOut className="w-4 h-4" />
              <span className="text-sm">Log out</span>
            </div>
          </div>
        </PopoverContent>
      </Popover>

 
    </>
  )
}
