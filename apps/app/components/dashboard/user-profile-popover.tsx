"use client"

import { useState } from "react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { User as UserType } from "better-auth";
import Image from "next/image"
import { ChevronDown, User, LogOut } from "lucide-react"
import { signOut } from "@/lib/auth-client"

export function UserProfilePopover({ user }: { user: UserType }) {
  const [open, setOpen] = useState(false)

  const handleProfileClick = () => {
    setOpen(false)
  }

  const handleSignOut = async () => {
    try {
      await signOut()
    } finally {
      window.location.href = "/signin"
    }
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
              src={user?.image || ""}
              alt="User avatar"
              width={40}
              height={40}
              className="rounded-2xl"
              priority
            />
            <div className="flex flex-col">
              <p className="text-sm font-medium">{user?.name}</p>
              <p className="text-xs text-gray-500">{user?.email}</p>
            </div>
            <ChevronDown fill="#000" strokeWidth={4} className="w-4 h-4" />
          </div>
        </PopoverTrigger>
        <PopoverContent
          className="w-56 crypto-base"
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
            <div
              onClick={handleSignOut}
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
