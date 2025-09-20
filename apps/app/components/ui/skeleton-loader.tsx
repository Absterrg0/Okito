"use client"

import { cn } from "@/lib/utils"

interface SkeletonProps {
  className?: string
  children?: React.ReactNode
}

export function Skeleton({ className, children, ...props }: SkeletonProps) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-md bg-gradient-to-r from-muted/50 via-muted/30 to-muted/50 bg-[length:200%_100%]",
        className
      )}
      style={{
        animation: "shimmer 2s infinite linear",
      }}
      {...props}
    >
      {children}
    </div>
  )
}

// Specific skeleton components for billing page
export function ProjectHeaderSkeleton() {
  return (
    <div className="flex items-center gap-4">
      <Skeleton className="h-12 w-12 rounded-2xl" />
      <div className="space-y-2">
        <Skeleton className="h-6 w-32" />
        <Skeleton className="h-4 w-48" />
      </div>
    </div>
  )
}

export function TimerSkeleton() {
  return (
    <div className="crypto-base px-4 py-2 rounded-full border border-primary/20">
      <div className="flex items-center gap-2">
        <Skeleton className="h-4 w-4 rounded" />
        <Skeleton className="h-4 w-12" />
      </div>
    </div>
  )
}

export function BillingItemSkeleton() {
  return (
    <div className="group">
      <div className="flex items-start justify-between">
        <div className="flex-1 space-y-2">
          <Skeleton className="h-5 w-24" />
          <Skeleton className="h-3 w-full max-w-xs" />
        </div>
        <div className="text-right ml-6">
          <Skeleton className="h-5 w-16" />
        </div>
      </div>
    </div>
  )
}

export function PaymentButtonSkeleton() {
  return (
    <div className="relative w-full h-16 rounded-2xl crypto-glass-static">
      <div className="flex items-center justify-center gap-4 px-6 h-full">
        <Skeleton className="h-10 w-10 rounded-xl" />
        <div className="flex flex-col items-start space-y-1">
          <Skeleton className="h-5 w-32" />
          <Skeleton className="h-3 w-24" />
        </div>
        <div className="ml-auto">
          <Skeleton className="h-5 w-5" />
        </div>
      </div>
    </div>
  )
}

export function BillingPageSkeleton() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-background/95">
      {/* Header Skeleton */}
      <header className="crypto-glass-static backdrop-blur-xl sticky top-0 z-50 border-b border-primary/10">
        <div className="max-w-7xl mx-auto px-8 py-6">
          <div className="flex items-center justify-between">
            <ProjectHeaderSkeleton />
            <TimerSkeleton />
          </div>
        </div>
      </header>

      <main className="min-h-[calc(100vh-120px)] flex items-center justify-center">
        <div className="max-w-7xl mx-auto px-8 w-full">
          <div className="grid lg:grid-cols-5 gap-16 items-center">
            {/* Left Column - Order Summary Skeleton */}
            <div className="lg:col-span-2 space-y-8">
              <div className="space-y-8">
                <div className="text-center lg:text-left space-y-2">
                  <Skeleton className="h-8 w-32 mx-auto lg:mx-0" />
                  <Skeleton className="h-4 w-48 mx-auto lg:mx-0" />
                </div>
                
                <div className="space-y-8">
                  <div className="h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>
                  
                  {/* Billing items skeleton */}
                  {[1, 2].map((i) => (
                    <div key={i}>
                      <BillingItemSkeleton />
                      {i < 2 && (
                        <div className="mt-4 h-px bg-gradient-to-r from-transparent via-muted-foreground/10 to-transparent"></div>
                      )}
                    </div>
                  ))}

                  <div className="h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>

                  {/* Subtotal and Network Fee */}
                  <div className="space-y-6">
                    <BillingItemSkeleton />
                    <BillingItemSkeleton />
                  </div>
                </div>
              </div>
            </div>

            {/* Vertical Gradient Separator */}
            <div className="hidden lg:flex justify-center items-center h-full min-h-[600px] relative">
              <div className="w-px h-full bg-gradient-to-b from-transparent via-primary/30 to-transparent"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-primary/10 border-2 border-primary/20 flex items-center justify-center">
                <div className="w-3 h-3 rounded-full bg-primary/40 animate-pulse"></div>
              </div>
            </div>

            {/* Right Column - Payment Interface Skeleton */}
            <div className="lg:col-span-2 space-y-8">
              <div className="space-y-8">
                <div className="text-center lg:text-left space-y-2">
                  <Skeleton className="h-8 w-40 mx-auto lg:mx-0" />
                  <Skeleton className="h-4 w-56 mx-auto lg:mx-0" />
                </div>

                {/* Payment Setup Skeleton */}
                <div className="crypto-base p-6 rounded-2xl space-y-4">
                  <Skeleton className="h-5 w-24" />
                  <div className="flex items-center gap-4">
                    <div className="flex gap-2">
                      <Skeleton className="h-8 w-16 rounded-lg" />
                      <Skeleton className="h-8 w-16 rounded-lg" />
                    </div>
                    <div className="w-px h-8 bg-gradient-to-b from-transparent via-primary/30 to-transparent"></div>
                    <div className="flex-1">
                      <Skeleton className="h-10 w-full" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Action Skeleton */}
              <div className="crypto-base p-6 rounded-2xl space-y-4">
                <Skeleton className="h-5 w-32" />
                <PaymentButtonSkeleton />
              </div>

              {/* Footer skeleton */}
              <div className="h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>
              <div className="px-4 py-2 rounded-full justify-center flex w-full">
                <div className="flex w-fit items-center gap-2 text-sm text-muted-foreground">
                  <span>Powered by</span>
                  <Skeleton className="h-3.5 w-16" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer skeleton */}
      <div className="fixed bottom-4 left-4 z-40">
        <div className="flex crypto-base items-center bg-background/60 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-background/50 rounded-none">
          <Skeleton className="h-8 w-8 rounded-none" />
          <div className="h-8 w-px bg-gradient-to-b from-transparent via-border to-transparent" />
          <Skeleton className="h-8 w-8 rounded-none" />
          <div className="h-8 w-px bg-gradient-to-b from-transparent via-border to-transparent" />
          <Skeleton className="h-8 w-8 rounded-none" />
        </div>
      </div>
    </div>
  )
}

// Add shimmer animation to global styles
const shimmerKeyframes = `
@keyframes shimmer {
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
}
`

// Inject styles
if (typeof document !== 'undefined') {
  const style = document.createElement('style')
  style.textContent = shimmerKeyframes
  document.head.appendChild(style)
}
