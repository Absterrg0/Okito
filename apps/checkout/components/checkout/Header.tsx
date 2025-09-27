"use client"
import { HugeiconsIcon } from '@hugeicons/react'
import { Wallet01Icon } from '@hugeicons/core-free-icons'
import Image from "next/image"
import Timer from "./Timer"

interface Project {
  name: string
  description?: string | null
  logoUrl?: string | null
}

interface HeaderProps {
  project?: Project
  occurredAt?: Date
  onTimerExpire?: () => void
}

export default function Header({ project, occurredAt, onTimerExpire }: HeaderProps) {
  return (
    <header className="crypto-glass-static backdrop-blur-xl sticky top-0 z-50 border-b border-primary/10">
      <div className="max-w-7xl mx-auto px-8 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-primary to-primary/80 text-primary-foreground flex items-center justify-center text-lg font-bold shadow-lg ring-2 ring-primary/20 overflow-hidden">
              {project?.logoUrl ? (
                <Image
                  src={project.logoUrl}
                  alt={project.name}
                  width={48}
                  height={48}
                  className="w-full h-full object-cover"
                />
              ) : (
                <HugeiconsIcon icon={Wallet01Icon} className="h-5 w-5" />
              )}
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
                {project?.name}
              </h1>
              <p className="text-sm text-muted-foreground/80 mt-1">
                {project?.description || 'Complete your payment securely on-chain'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <Timer occurredAt={occurredAt} onExpire={onTimerExpire} />
          </div>
        </div>
      </div>
    </header>
  )
}
