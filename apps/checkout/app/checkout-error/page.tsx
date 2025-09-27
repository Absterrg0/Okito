import { HugeiconsIcon } from '@hugeicons/react'
import { AlertCircleIcon, RefreshIcon } from '@hugeicons/core-free-icons'
import Link from "next/link"
import Image from "next/image"

// Server Component - no client-side JavaScript needed
export default function CheckoutErrorPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-background/95 flex items-center justify-center">
      <div className="max-w-md mx-auto px-8 text-center">
        <div className="space-y-8">
          {/* Error Icon */}
          <div className="flex justify-center">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-red-500/20 to-red-500/10 flex items-center justify-center">
              <HugeiconsIcon icon={AlertCircleIcon} className="h-12 w-12 text-red-500" />
            </div>
          </div>

          {/* Error Message */}
          <div className="space-y-4">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-red-600 to-red-500 bg-clip-text text-transparent">
              Checkout Error
            </h1>
            <p className="text-muted-foreground leading-relaxed">
              There was an issue processing your checkout request. The link may be expired, or the session may have already been completed.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="space-y-4">
            
            <div className="text-sm text-muted-foreground">
              Need help? Contact the merchant for assistance.
            </div>
          </div>

          {/* Powered by */}
          <div className="pt-8">
            <div className="w-full h-px bg-gradient-to-r from-transparent via-border/50 to-transparent mb-8"></div>
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <span>Powered by</span>
              <div className="flex items-center gap-1">
                <Image
                  src="/Okito-light.png"
                  alt="Okito"
                  width={70}
                  height={16}
                  className="h-3.5 w-auto dark:hidden"
                  priority
                />
                <Image
                  src="/Okito-dark.png"
                  alt="Okito"
                  width={70}
                  height={16}
                  className="h-3.5 w-auto hidden dark:block"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
