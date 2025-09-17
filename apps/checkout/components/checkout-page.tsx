"use client"
import { useEffect, useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import React from "react"
import { HugeiconsIcon } from '@hugeicons/react'
import { ShieldBlockchainIcon, SecurityCheckIcon, AlertCircleIcon, PurseIcon } from '@hugeicons/core-free-icons'
import CustomWallet from "@/components/custom-wallet"
import { useWallet } from "@solana/wallet-adapter-react"
import { ModeToggle } from "./ui/theme-toggle"
import Image from "next/image"
import { useTheme } from "next-themes"

// Mock data - replace with actual Solana wallet integration
const mockProducts = [
  { id: 1, name: "Pro Plan", price: 0.5, currency: "SOL", description: "Advanced features for power users" },
  { id: 2, name: "API Access", price: 0.2, currency: "SOL", description: "Unlimited API calls" },
]

const mockFees = {
  network: 0.001,
  platform: 0.01,
  currency: "SOL" as const,
}

const acceptedTokens = ["USDC", "USDT"] as const

export default function CheckoutPage() {
  const { connected} = useWallet()
  const [paymentStatus, setPaymentStatus] = useState<"idle" | "processing" | "success" | "error">("idle")
  const [selectedCurrency, setSelectedCurrency] = useState<(typeof acceptedTokens)[number]>("USDC")
  const [remainingSeconds, setRemainingSeconds] = useState(10 * 60)
  const { theme } = useTheme()

  const processPayment = async () => {
    setPaymentStatus("processing")
    // Simulate payment processing
    setTimeout(() => {
      setPaymentStatus("success")
    }, 3000)
  }

  const subtotal = useMemo(() => mockProducts.reduce((sum, product) => sum + product.price, 0), [])
  const fees = useMemo(() => mockFees.network + mockFees.platform, [])
  const totalAmount = useMemo(() => Math.max(subtotal + fees, 0), [subtotal, fees])
  const display = (n: number) => `${n.toFixed(2)} ${selectedCurrency}`

  useEffect(() => {
    const timer = setInterval(() => {
      setRemainingSeconds((s) => (s > 0 ? s - 1 : 0))
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const mm = String(Math.floor(remainingSeconds / 60)).padStart(2, "0")
  const ss = String(remainingSeconds % 60).padStart(2, "0")

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className=" sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <HugeiconsIcon icon={PurseIcon} className="h-4 w-4" />
            </div>
            <div>
              <h1 className="text-lg font-semibold">Checkout</h1>
            </div>
          </div>
          <div className="flex items-center">
            <ModeToggle />
          </div>
        </div>
      </header>

      {/* Expiry pill inside navbar (right side) */}
      <div className="fixed top-4 right-6 z-40 pointer-events-none">
        <div className="px-3 py-1.5 text-xs font-medium bg-amber-500/10 text-amber-700 dark:text-amber-400 shadow-sm">
          Payment link expires in {mm}:{ss}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8 relative">
        <div className="min-h-[calc(100vh-120px)] flex items-center">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center w-full">
          {/* Left Column - Order Summary & Logistics */}
          <div className="space-y-4 lg:pr-8">
            <div className="p-4 space-y-4 rounded-xl bg-background/40 shadow-sm">
              {/* Merchant header */}
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-primary/15 text-primary flex items-center justify-center text-sm font-semibold">O</div>
                <div className="text-sm font-medium">Okito</div>
              </div>

              <div className="space-y-3">
                {mockProducts.map((product, idx) => (
                  <div key={product.id}>
                    <div className="flex items-start justify-between py-2">
                    <div className="flex-1">
                      <h3 className="font-medium">{product.name}</h3>
                      <p className="text-muted-foreground text-sm mt-1">{product.description}</p>
                    </div>
                    <div className="text-right ml-4">
                      <p className="font-semibold">{display(product.price)}</p>
                    </div>
                    </div>
                    {idx < mockProducts.length - 1 && (
                      <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />
                    )}
                  </div>
                ))}
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Subtotal</span>
                  <span className="font-mono">{display(subtotal)}</span>
                </div>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Network fee</span>
                  <span className="font-mono">{display(mockFees.network)}</span>
                </div>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Platform fee</span>
                  <span className="font-mono">{display(mockFees.platform)}</span>
                </div>
                <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent my-2" />
                <div className="flex justify-between text-sm font-semibold">
                  <span>Total due now</span>
                  <span className="font-mono">{display(totalAmount)}</span>
                </div>
              </div>

              {/* Compact context row */}
              <div className="flex flex-wrap items-center gap-2 pt-2 text-xs">
                <span className="px-2 py-1 rounded-md inline-flex items-center gap-1 bg-primary/10 text-primary">
                  <HugeiconsIcon icon={ShieldBlockchainIcon} className="h-3.5 w-3.5" />
                  Solana Mainnet · ~30s
                </span>
              </div>
            </div>
          </div>

          {/* Vertical Gradient Divider */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-border to-transparent"></div>

          {/* Right Column - Payment Interaction */}
          <div className="space-y-4 lg:pl-8">
            <div>
              <h2 className="text-xl font-bold">Pay</h2>
              <p className="text-xs text-muted-foreground">Complete your payment securely on-chain.</p>
            </div>

            <div className="p-5 space-y-4 rounded-xl bg-background/40 shadow-sm">
                {/* Wallet control */}
                <div className="flex items-center justify-center">
                  <CustomWallet />
                </div>

                {/* Token selection mimicking tabs */}
                <div className="grid grid-cols-2 gap-2">
                  {acceptedTokens.map((t) => (
                    <button
                      key={t}
                      onClick={() => setSelectedCurrency(t)}
                      className={`px-3 py-2 rounded-md text-sm transition ${selectedCurrency === t ? 'bg-primary/15 text-primary' : 'bg-muted/40 hover:bg-muted/50'}`}
                    >
                      {t}
                    </button>
                  ))}
                </div>

                {/* Actions */}
                {paymentStatus === "idle" && (
                  <>
                    <Button
                      onClick={processPayment}
                      className="w-full crypto-button"
                      size="lg"
                      disabled={!connected}
                    >
                      Pay {display(totalAmount)}
                    </Button>
                    {!connected && (
                      <p className="text-xs text-muted-foreground text-center">Connect a wallet above to enable payment.</p>
                    )}
                  </>
                )}

                {paymentStatus === "processing" && (
                  <Button disabled className="w-full py-4 text-lg bg-primary text-primary-foreground" size="lg">
                    <div className="flex items-center gap-3">
                      <div className="h-5 w-5 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                      Processing Payment...
                    </div>
                  </Button>
                )}

                {paymentStatus === "success" && (
                  <div className="space-y-4">
                    <div className="text-center bg-primary/10 rounded-lg p-6">
                      <div className="w-16 h-16 mx-auto mb-4 bg-primary/15 rounded-full flex items-center justify-center text-primary">
                        <HugeiconsIcon icon={SecurityCheckIcon} className="h-8 w-8" />
                      </div>
                      <h3 className="font-bold text-lg mb-2 text-foreground">Payment Successful!</h3>
                      <p className="text-sm text-muted-foreground">
                        Your transaction has been confirmed on the Solana blockchain.
                      </p>
                    </div>
                    <Button className="w-full py-3 bg-muted/40 hover:bg-muted/60 text-foreground">
                      View Transaction Details
                    </Button>
                  </div>
                )}
            </div>

            <div className="flex items-start gap-3 p-4 rounded-lg bg-background/50 shadow-sm">
              <HugeiconsIcon icon={AlertCircleIcon} className="h-5 w-5 text-muted-foreground mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="text-sm font-semibold">Need help?</h4>
                <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                  Contact our support team if you encounter any issues during the payment process.
                </p>
              </div>
            </div>

            {/* Powered by Okito */}
            <div className="flex items-center justify-center gap-2 pt-2 opacity-80">
              <span className="text-xs text-muted-foreground">Powered by</span>
              <Image
                src={theme === 'dark' ? '/Okito-light.png' : '/Okito-dark.png'}
                alt="Okito"
                width={72}
                height={16}
                className="h-4 w-auto"
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