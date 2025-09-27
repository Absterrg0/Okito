"use client"
import { useEffect, useState } from "react"
import { HugeiconsIcon } from '@hugeicons/react'
import { Clock01Icon } from '@hugeicons/core-free-icons'

interface TimerProps {
  occurredAt?: Date
  onExpire?: () => void
}

export default function Timer({ occurredAt, onExpire }: TimerProps) {
  const [sessionExpiry, setSessionExpiry] = useState(15 * 60) // 15 minutes

  // Timer logic based on event occurredAt
  useEffect(() => {
    if (!occurredAt) return

    const occurredAtDate = new Date(occurredAt)
    const expiryTime = new Date(occurredAtDate.getTime() + 15 * 60 * 1000) // 15 minutes from event creation

    const updateTimer = () => {
      const now = new Date()
      const remaining = Math.max(0, Math.floor((expiryTime.getTime() - now.getTime()) / 1000))
      setSessionExpiry(remaining)
      
      // Call onExpire callback when timer reaches 0
      if (remaining === 0 && onExpire) {
        onExpire()
      }
    }

    updateTimer() // Initial update
    const timer = setInterval(updateTimer, 1000)
    
    return () => clearInterval(timer)
  }, [occurredAt, onExpire])

  const minutes = Math.floor(sessionExpiry / 60)
  const seconds = sessionExpiry % 60

  return (
    <div className="crypto-base px-4 py-2 rounded-full border border-primary/20">
      <div className="flex items-center gap-2 text-sm font-medium">
        <HugeiconsIcon icon={Clock01Icon} className="h-4 w-4 text-primary animate-pulse" />
        <span className="text-foreground font-mono">
          {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
        </span>
      </div>
    </div>
  )
}
