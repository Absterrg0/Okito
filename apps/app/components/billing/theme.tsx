
"use client"

import * as React from "react"
import { useTheme } from "next-themes"
import { HugeiconsIcon } from '@hugeicons/react'
import { Sun01Icon, Moon02Icon, LaptopIcon } from '@hugeicons/core-free-icons'
import { Button } from "@/components/ui/button"

export function ModeToggle() {
  const { theme, setTheme } = useTheme()

  const active = (value: string) =>
    theme === value || (value === "system" && theme === "system")

  return (
    <div className="fixed bottom-4 left-4 z-40">
      <div className="flex crypto-base items-center bg-background/60 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-background/50 rounded-none">
        <Button
          aria-label="Light theme"
          onClick={() => setTheme("light")}
          variant="ghost"
          size="icon"
          className={`h-8 w-8 rounded-none ${active("light") ? 'bg-primary/15 text-primary' : 'hover:bg-muted/60'}`}
        >
          <HugeiconsIcon icon={Sun01Icon} className="h-4 w-4" />
        </Button>
        <div className="h-8 w-px bg-gradient-to-b from-transparent via-border to-transparent" />
        <Button
          aria-label="Dark theme"
          onClick={() => setTheme("dark")}
          variant="ghost"
          size="icon"
          className={`h-8 w-8 rounded-none ${active("dark") ? 'bg-primary/15 text-primary' : 'hover:bg-muted/60'}`}
        >
          <HugeiconsIcon icon={Moon02Icon} className="h-4 w-4" />
        </Button>
        <div className="h-8 w-px bg-gradient-to-b from-transparent via-border to-transparent" />
        <Button
          aria-label="System theme"
          onClick={() => setTheme("system")}
          variant="ghost"
          size="icon"
          className={`h-8 w-8 rounded-none ${active("system") ? 'bg-primary/15 text-primary' : 'hover:bg-muted/60'}`}
        >
          <HugeiconsIcon icon={LaptopIcon} className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
