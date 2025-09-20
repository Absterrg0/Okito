"use client"
import { useEffect, useState } from "react"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  Clock01Icon,
  CheckmarkCircle01Icon,
  Wallet01Icon,
  ArrowUpRightIcon,
  ZapIcon,
} from "@hugeicons/core-free-icons"
import CustomWallet from "../ui/custom-wallet"
import { useWallet } from "@solana/wallet-adapter-react"
import Image from "next/image"
import { ModeToggle } from "./theme"
import { useSelectedProjectStore } from "@/store/projectStore"
import { useProjectFetchDetails } from "@/hooks/projects/useProjectDetailsFetch"
import BillingCustomizerWidget from "./customizer-widget"
import { BillingPageSkeleton, ProjectHeaderSkeleton, TimerSkeleton } from "../ui/skeleton-loader"

interface BillingItem {
  id: string
  name: string
  description: string
  price: number
}

interface BillingData {
  products: BillingItem[]
}

const defaultBillingData: BillingData = {
  products: [
    {
      id: "1",
      name: "Pro Plan",
      description: "Advanced features and unlimited API access",
      price: 0.5,
    },
    {
      id: "2",
      name: "Premium Support",
      description: "Priority support and dedicated account manager",
      price: 0.2,
    },
  ],
}

const supportedTokens = ["USDC", "USDT"] as const

export default function ProfessionalCheckout() {
  const { connected} = useWallet()
  const [paymentStatus, setPaymentStatus] = useState<"idle" | "processing" | "success" | "error">("idle")
  const [selectedToken, setSelectedToken] = useState<(typeof supportedTokens)[number]>("USDC")
  const [sessionExpiry, setSessionExpiry] = useState(15 * 60) // 15 minutes
  const [billingData, setBillingData] = useState<BillingData>(defaultBillingData)
  const [isInitialLoad, setIsInitialLoad] = useState(true)

  // Fetch project details
  const selectedProject = useSelectedProjectStore((s) => s.selectedProject)
  const { data: project, isLoading } = useProjectFetchDetails(selectedProject?.id!)

  const processPayment = async () => {
    setPaymentStatus("processing")
    setTimeout(() => {
      setPaymentStatus("success")
    }, 4000)
  }

  const subtotal = billingData.products.reduce((sum, item) => sum + item.price, 0)
  const networkFee = 0.001 // Fixed network fee
  const totalAmount = subtotal + networkFee

  // Handle billing data changes from customizer
  const handleBillingDataChange = (newData: { products: BillingItem[] }) => {
    setBillingData({ ...billingData, products: newData.products })
  }

  const formatAmount = (amount: number) => `${amount.toFixed(3)} ${selectedToken}`

  // Timer logic
  useEffect(() => {
    const timer = setInterval(() => {
      setSessionExpiry((prev) => {
        if (prev <= 0) {
          clearInterval(timer)
          return 0
        }
        return prev - 1
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const minutes = Math.floor(sessionExpiry / 60)
  const seconds = sessionExpiry % 60

  // Handle initial load state
  useEffect(() => {
    if (!isLoading && selectedProject?.id) {
      const timer = setTimeout(() => {
        setIsInitialLoad(false)
      }, 800) // Small delay to prevent flash
      return () => clearTimeout(timer)
    }
  }, [isLoading, selectedProject?.id])

  // Show skeleton during initial load or when loading project data
  const shouldShowSkeleton = isInitialLoad || (selectedProject?.id && isLoading)

  if (shouldShowSkeleton) {
    return <BillingPageSkeleton />
  }


  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-background/95">
      {/* Header */}
      <header className="crypto-glass-static backdrop-blur-xl sticky top-0 z-50 border-b border-primary/10">
        <div className="max-w-7xl mx-auto px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {project?.logoUrl ? (
                <div className="h-12 w-12 rounded-2xl overflow-hidden shadow-lg ring-2 ring-primary/20">
                  <Image
                    src={project.logoUrl}
                    alt={project.name || "Project"}
                    width={48}
                    height={48}
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : project?.name ? (
                <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-primary to-primary/80 text-primary-foreground flex items-center justify-center text-lg font-bold shadow-lg ring-2 ring-primary/20">
                  {project.name.charAt(0).toUpperCase()}
                </div>
              ) : (
                <ProjectHeaderSkeleton />
              )}
              {project ? (
                <div>
                  <h1 className="text-xl font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
                    {project.name}
                  </h1>
                  <p className="text-sm text-muted-foreground/80 mt-1">
                    {project.description ? 
                      project.description.slice(0, 40) + (project.description.length > 40 ? "..." : "") : 
                      ""
                    }
                  </p>
                </div>
              ) : null}
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
                  Billing Details
                </h3>
                <p className="text-sm text-muted-foreground">Review your order summary</p>
              </div>
              
              <div className="space-y-8">
                <div className="h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>

                {billingData.products.map((item, index) => (
                  <div key={item.id} className="group">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="font-medium text-foreground group-hover:text-primary transition-colors duration-200">
                          {item.name}
                        </div>
                        <div className="text-xs text-muted-foreground/80 mt-1 leading-relaxed">
                          {item.description}
                        </div>
                      </div>
                      <div className="text-right ml-6">
                        <div className="text-base font-bold text-foreground">
                          {formatAmount(item.price)}
                        </div>
                      </div>
                    </div>
                    {index < billingData.products.length - 1 && (
                      <div className="mt-4 h-px bg-gradient-to-r from-transparent via-muted-foreground/10 to-transparent"></div>
                    )}
                  </div>
                ))}

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
                      {/* Currency Selection */}
                      <div className="flex gap-2">
                        {supportedTokens.map((token) => (
                          <button
                            key={token}
                            onClick={() => setSelectedToken(token)}
                            className={`relative px-3 py-2 rounded-lg transition-all duration-300 border-2 ${
                              selectedToken === token
                                ? "bg-primary/15 text-primary border-primary/50 shadow-lg shadow-primary/20 crypto-glass-static scale-105"
                                : "crypto-glass-static border-transparent hover:border-primary/30 hover:bg-primary/5 hover:scale-105"
                            }`}
                          >
                            <div className="flex items-center gap-2">
                              <div className={`relative transition-transform duration-300 ${
                                selectedToken === token ? "scale-110" : ""
                              }`}>
                                <Image
                                  src={token === "USDC" ? "/usd-coin-usdc-logo.svg" : "/tether-usdt-logo.svg"}
                                  alt={token}
                                  width={16}
                                  height={16}
                                  className="w-4 h-4"
                                />
                              </div>
                              <span className={`font-medium text-xs ${
                                selectedToken === token ? "text-primary" : "text-foreground"
                              }`}>
                                {token}
                              </span>
                            </div>
                          </button>
                        ))}
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
                          onClick={processPayment}
                          disabled={!connected}
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
                        <div className="flex items-center justify-between py-3">
                          <span className="text-sm font-medium text-muted-foreground">Transaction ID</span>
                          <div className="flex items-center gap-2">
                            <HugeiconsIcon icon={ArrowUpRightIcon} className="h-4 w-4 text-primary" />
                            <span className="text-sm font-mono text-foreground">abc123...def456</span>
                          </div>
                        </div>
                        
                        
                
                     
                      </div>
                    </div>

         

                  </div>
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

      {/* Footer */}
      <ModeToggle />

      {/* Billing Customizer Widget */}
      <BillingCustomizerWidget 
        onBillingDataChange={handleBillingDataChange}
        initialData={billingData}
      />

    </div>
   
  )
}