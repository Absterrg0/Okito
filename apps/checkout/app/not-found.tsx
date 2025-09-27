import { HugeiconsIcon } from '@hugeicons/react'
import { AlertCircleIcon } from '@hugeicons/core-free-icons'
import Link from "next/link"
import Image from "next/image"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-background/95 flex items-center justify-center">
      <div className="max-w-md mx-auto px-8 text-center">
        <div className="space-y-8">
          {/* 404 Icon */}
          <div className="flex justify-center">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500/20 to-blue-500/10 flex items-center justify-center">
              <HugeiconsIcon icon={AlertCircleIcon} className="h-12 w-12 text-blue-500" />
            </div>
          </div>

          {/* Error Message */}
          <div className="space-y-4">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent">
              404
            </h1>
            <h2 className="text-xl font-semibold text-foreground">
              Page Not Found
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              The page you're looking for doesn't exist. This could be an invalid checkout link or the page has been moved.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="space-y-4">
            <Link 
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-primary to-primary/80 text-primary-foreground font-medium hover:from-primary/90 hover:to-primary/70 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Go Home
            </Link>
            
            <div className="text-sm text-muted-foreground">
              Need help? Contact the merchant for assistance.
            </div>
          </div>

          {/* Powered by */}
          <div className="pt-8 border-t border-border/50">
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

