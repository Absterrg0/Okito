"use client"
import { useEffect, useState } from "react"
import React from "react"
import { HugeiconsIcon } from '@hugeicons/react'
import { 
  Clock01Icon,
  CheckmarkCircle01Icon,
  Wallet01Icon,
  ArrowUpRightIcon,
  ZapIcon,
  AlertCircleIcon,
} from '@hugeicons/core-free-icons'
import CustomWallet from "@/components/custom-wallet"
import { useWallet, useConnection } from "@solana/wallet-adapter-react"
import { ModeToggle } from "./ui/theme-toggle"
import Image from "next/image"
import { useTheme } from "next-themes"
import useFetchCheckout from "@/hooks/useFetchCheckout"
import { pay } from "@/lib/pay"
import { useParams } from "next/navigation"
import { CheckoutPageSkeleton } from "./ui/skeleton-loader"

export default function CheckoutPage() {
  const { connected, publicKey, signTransaction } = useWallet()
  const { connection } = useConnection()
  const params = useParams();
  
  const sessionId = params.sessionId as string
  
  const { isLoading, data: event } = useFetchCheckout(sessionId)
  const [paymentStatus, setPaymentStatus] = useState<"idle" | "processing" | "success" | "error">("idle")
  const [sessionExpiry, setSessionExpiry] = useState(15 * 60) // 15 minutes
  const [txSig, setTxSig] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const products = event?.payment?.products ?? []
  const currency = event?.payment?.currency ?? 'USDC'
  const recipient = event?.payment?.recipientAddress ?? ''
  
  const subtotal = products.reduce((sum, item: any) => {
    const price = Number(item.price ?? 0) / 1_000_000
    return sum + price
  }, 0)
  const networkFee = 0.001 // Fixed network fee
  const totalAmount = subtotal + networkFee

  const formatAmount = (amount: number) => `${amount.toFixed(3)} ${currency}`

  // Timer logic based on event occurredAt
  useEffect(() => {
    if (!event?.occurredAt) return

    const occurredAt = new Date(event.occurredAt)
    const expiryTime = new Date(occurredAt.getTime() + 15 * 60 * 1000) // 15 minutes from event creation

    const updateTimer = () => {
      const now = new Date()
      const remaining = Math.max(0, Math.floor((expiryTime.getTime() - now.getTime()) / 1000))
      setSessionExpiry(remaining)
    }

    updateTimer() // Initial update
    const timer = setInterval(updateTimer, 1000)
    
    return () => clearInterval(timer)
  }, [event?.occurredAt])

  const minutes = Math.floor(sessionExpiry / 60)
  const seconds = sessionExpiry % 60



  if (isLoading) {
    return <CheckoutPageSkeleton />
  }

  const handlePay = async () => {
    if (!sessionId || !connected || !publicKey || !signTransaction || !recipient) return
    if (sessionExpiry <= 0) {
      setError('Session expired. Please refresh the page to start a new checkout.')
      setPaymentStatus('error')
      return
    }
    try {
      setError(null)
      setPaymentStatus('processing')
      const signature = await pay(
        connection,
        { publicKey, signTransaction } as any,
        totalAmount,
        currency as 'USDC' | 'USDT',
        recipient,
        sessionId,
        process.env.NEXT_PUBLIC_OKITO_NETWORK === 'mainnet-beta' ? 'mainnet-beta' : 'devnet'
      )
      setTxSig(signature)
      setPaymentStatus('success')
    } catch (e: any) {
      setError(e?.message ?? 'Payment failed')
      setPaymentStatus('error')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-background/95">
      {/* Header */}
      <header className="crypto-glass-static backdrop-blur-xl sticky top-0 z-50 border-b border-primary/10">
        <div className="max-w-7xl mx-auto px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-primary to-primary/80 text-primary-foreground flex items-center justify-center text-lg font-bold shadow-lg ring-2 ring-primary/20">
                <HugeiconsIcon icon={Wallet01Icon} className="h-5 w-5" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
                  Checkout
                </h1>
                <p className="text-sm text-muted-foreground/80 mt-1">Complete your payment securely on-chain</p>
              </div>
            </div>

            <div className="flex items-center gap-6">
              <div className="crypto-base px-4 py-2 rounded-full border border-primary/20">
                <div className="flex items-center gap-2 text-sm font-medium">
                  <HugeiconsIcon icon={Clock01Icon} className="h-4 w-4 text-primary animate-pulse" />
                  <span className="text-foreground font-mono">
                    {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="min-h-[calc(100vh-120px)] flex items-center justify-center">
        <div className="max-w-7xl mx-auto px-8 w-full">
          <div className="grid lg:grid-cols-5 gap-16 items-center">
          {/* Order Summary - Left Column */}
          <div className="lg:col-span-2 space-y-8">
            <div className="space-y-8">
              <div className="text-center lg:text-left">
                <h3 className="text-2xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent mb-2">
                  Order Summary
                </h3>
                <p className="text-sm text-muted-foreground">Review your order details</p>
              </div>
              
              <div className="space-y-8">
                <div className="h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>

                {products.map((item: any, index: number) => {
                  const price = Number(item.price ?? 0) / 1_000_000
                  return (
                    <div key={item.id ?? index} className="group">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="font-medium text-foreground group-hover:text-primary transition-colors duration-200">
                            {item.name}
                          </div>
                          {item.description && (
                            <div className="text-xs text-muted-foreground/80 mt-1 leading-relaxed">
                              {item.description}
                            </div>
                          )}
                        </div>
                        <div className="text-right ml-6">
                          <div className="text-base font-bold text-foreground">
                            {formatAmount(price)}
                          </div>
                        </div>
                      </div>
                      {index < products.length - 1 && (
                        <div className="mt-4 h-px bg-gradient-to-r from-transparent via-muted-foreground/10 to-transparent"></div>
                      )}
                    </div>
                  )
                })}

                <div className="h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>

                {/* Subtotal */}
                <div className="group">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="font-medium text-foreground group-hover:text-primary transition-colors duration-200">
                        Subtotal
                      </div>
                      <div className="text-xs text-muted-foreground/80 mt-1 leading-relaxed">
                        Sum of all selected items
                      </div>
                    </div>
                    <div className="text-right ml-6">
                      <div className="text-base font-bold text-foreground">
                        {formatAmount(subtotal)}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Network Fee */}
                <div className="group">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="font-medium text-foreground group-hover:text-primary transition-colors duration-200">
                        Network Fee
                      </div>
                      <div className="text-xs text-muted-foreground/80 mt-1 leading-relaxed">
                        Blockchain transaction fee
                      </div>
                    </div>
                    <div className="text-right ml-6">
                      <div className="text-base font-bold text-foreground">
                        {formatAmount(networkFee)}
                      </div>
                    </div>
                  </div>
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

          {/* Payment Interface - Right Column */}
          <div className="lg:col-span-2 space-y-8">
            {paymentStatus === "idle" && (
              <div className="space-y-8">
                <div className="text-center lg:text-left">
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent mb-2">
                    Payment Method
                  </h2>
                  <p className="text-muted-foreground">Connect your wallet and select currency</p>
                </div>

                {/* Payment Setup */}
                <div className="crypto-base p-6 rounded-2xl">
                  <div className="space-y-4">
                    <div className="text-sm font-medium text-foreground">Payment Setup</div>
                    
                    <div className="flex items-center gap-4">
                      {/* Currency Display (Fixed based on event) */}
                      <div className="flex gap-2">
                        <div className="relative px-3 py-2 rounded-lg border-2 bg-primary/15 text-primary border-primary/50 shadow-lg shadow-primary/20 crypto-glass-static">
                          <div className="flex items-center gap-2">
                            <div className="relative scale-110">
                              <Image
                                src={currency === "USDC" ? "/usd-coin-usdc-logo.svg" : "/tether-usdt-logo.svg"}
                                alt={currency}
                                width={16}
                                height={16}
                                className="w-4 h-4"
                              />
                            </div>
                            <span className="font-medium text-xs text-primary">
                              {currency}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Divider */}
                      <div className="w-px h-8 bg-gradient-to-b from-transparent via-primary/30 to-transparent"></div>

                      {/* Wallet Connection */}
                      <div className="flex-1">
                        <CustomWallet />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Payment Action */}
            <div className="crypto-base p-6 rounded-2xl">
                <div className="space-y-4">
                  <div className="text-sm font-medium text-foreground">Complete Payment</div>
                  
                  {paymentStatus === "idle" && (
                    <div className="space-y-4">
                      {/* Main Payment Button */}
                      <div className="relative">
                        <button
                          onClick={handlePay}
                          disabled={!connected || isLoading || !sessionId || totalAmount <= 0 || sessionExpiry <= 0}
                          className={`group relative w-full h-16 rounded-2xl font-bold transition-all duration-300 ${
                            connected
                              ? "crypto-glass-static hover:opacity-50"
                              : "crypto-button cursor-not-allowed"
                          }`}
                        >
                          <div className="flex items-center justify-center gap-4 px-6">
                            {connected ? (
                              <>
                                <div className="p-2 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10">
                                  <HugeiconsIcon icon={Wallet01Icon} className="h-6 w-6 text-primary" />
                                </div>
                                <div className="flex flex-col items-start">
                                  <span className="text-lg font-bold text-foreground">Pay {formatAmount(totalAmount)}</span>
                                  <span className="text-xs text-muted-foreground font-normal">Complete your purchase</span>
                                </div>
                                <div className="ml-auto">
                                  <HugeiconsIcon icon={ArrowUpRightIcon} className="h-5 w-5 text-primary" />
                                </div>
                              </>
                            ) : (
                              <>
                                <div className="p-2 rounded-xl bg-muted-foreground/20">
                                  <HugeiconsIcon icon={Wallet01Icon} className="h-6 w-6" />
                                </div>
                                <div className="flex flex-col items-start">
                                  <span className="text-lg font-bold">Connect Wallet to Continue</span>
                                  <span className="text-xs text-muted-foreground font-normal">Required to process payment</span>
                                </div>
                              </>
                            )}
                          </div>
                        </button>
                      </div>
                    </div>
                  )}
           

                  {paymentStatus === "processing" && (
                    <div className="space-y-6">
                      {/* Processing Animation */}
                      <div className="flex flex-col items-center space-y-4 py-6">
                        <div className="relative">
                          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
                            <div className="relative">
                              <div className="w-12 h-12 rounded-full border-4 border-primary/30 animate-spin"></div>
                              <div className="absolute top-1 left-1 w-10 h-10 rounded-full border-4 border-transparent border-t-primary animate-spin" style={{animationDirection: 'reverse', animationDuration: '1.5s'}}></div>
                              <div className="absolute inset-0 flex items-center justify-center">
                                <HugeiconsIcon icon={ZapIcon} className="h-5 w-5 text-primary animate-pulse" />
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="text-center space-y-2">
                          <h3 className="text-lg font-bold text-foreground">Processing Transaction</h3>
                          <p className="text-sm text-muted-foreground">Confirm the transaction in your wallet</p>
                        </div>

                        <div className="flex space-x-2">
                          <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
                          <div className="w-2 h-2 rounded-full bg-primary animate-pulse" style={{animationDelay: '0.2s'}}></div>
                          <div className="w-2 h-2 rounded-full bg-primary animate-pulse" style={{animationDelay: '0.4s'}}></div>
                        </div>
                      </div>

                      {/* Status indicators */}
                   
                    </div>
                  )}

                {paymentStatus === "success" && (
                  <div className="space-y-8">
                    {/* Success Animation Container */}
                    <div className="relative flex flex-col items-center space-y-8 py-8">
                        {/* Animated success icon */}
                        <div className="relative">
                          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-green-500/20 to-green-500/10 flex items-center justify-center">
                            <div className="relative">
                              {/* Success ring animation */}
                              <div className="w-20 h-20 rounded-full border-4 border-green-500/30 animate-pulse"></div>
                              {/* Checkmark with scale animation */}
                              <div className="absolute inset-0 flex items-center justify-center">
                                <HugeiconsIcon 
                                  icon={CheckmarkCircle01Icon} 
                                  className="h-12 w-12 text-green-500 " 
                                  style={{animationDuration: '2s'}}
                                />
                              </div>
                            </div>
                          </div>
                        </div>

                      {/* Success message */}
                      <div className="text-center space-y-3">
                        <h3 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-green-500 bg-clip-text text-transparent">
                          Payment Successful!
                        </h3>
                        <p className="text-muted-foreground max-w-md leading-relaxed">
                          Your transaction has been confirmed on the blockchain and your payment has been processed securely.
                        </p>
                      </div>

                      {/* Transaction details */}
                      <div className="w-full max-w-md space-y-4">
                        {txSig && (
                          <div className="flex items-center justify-between py-3">
                            <span className="text-sm font-medium text-muted-foreground">Transaction ID</span>
                            <div className="flex items-center gap-2">
                              <HugeiconsIcon icon={ArrowUpRightIcon} className="h-4 w-4 text-primary" />
                              <a 
                                href={`https://explorer.solana.com/tx/${txSig}?cluster=${process.env.NEXT_PUBLIC_OKITO_NETWORK === 'mainnet-beta' ? 'mainnet-beta' : 'devnet'}`} 
                                target="_blank" 
                                rel="noreferrer"
                                className="text-sm font-mono text-foreground hover:text-primary transition-colors"
                              >
                                {txSig.slice(0, 8)}...{txSig.slice(-8)}
                              </a>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

         

                  </div>
                )}

                {paymentStatus === 'error' && error && (
                  <div className="text-sm text-red-500">{error}</div>
                )}
                {paymentStatus === 'idle' && sessionExpiry <= 0 && (
                  <div className="text-sm text-red-500">Session expired. Please refresh the page to start a new checkout.</div>
                )}
              </div>

              {/* Gradient Divider */}
              <div className="h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>
              <div className="px-4 py-2 rounded-full justify-center flex w-full">
                  <div className="flex w-fit items-center gap-2 text-sm  text-muted-foreground">
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

              {/* Support */}
            
            </div>
          </div>
        </div>
        </div>
      </main>

    </div>
  )
}