"use client"
import { useState, useEffect } from "react"
import { HugeiconsIcon } from '@hugeicons/react'
import { 
  Wallet01Icon,
  ArrowUpRightIcon,
  ZapIcon,
  CheckmarkCircle01Icon,
} from '@hugeicons/core-free-icons'
import Image from "next/image"
import CustomWallet from "@/components/custom-wallet"
import { toast } from "sonner"

interface PaymentInterfaceProps {
  paymentStatus: "idle" | "processing" | "success" | "error"
  connected: boolean
  isLoading: boolean
  sessionId?: string
  totalAmount: number
  selectedCurrency: "USDC" | "USDT"
  projectAllowedCurrencies: ("USDC" | "USDT")[]
  txSig?: string | null
  onPay: () => void
  onCurrencyChange: (currency: "USDC" | "USDT") => void
  networkEnvironment?: string
  callbackUrl?: string
}

export default function PaymentInterface({
  paymentStatus,
  connected,
  isLoading,
  sessionId,
  totalAmount,
  selectedCurrency,
  projectAllowedCurrencies,
  txSig,
  onPay,
  onCurrencyChange,
  networkEnvironment,
  callbackUrl
}: PaymentInterfaceProps) {
  const formatAmount = (amount: number) => `${amount.toFixed(3)} ${selectedCurrency}`

  const [countdown, setCountdown] = useState(5)

  useEffect(() => {
    if (paymentStatus === "success" && callbackUrl) {
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            window.location.href = callbackUrl
            return 0
          }
          return prev - 1
        })
      }, 1000)

      return () => clearInterval(timer)
    }
  }, [paymentStatus, callbackUrl])

  const handlePayClick = () => {
    if (!connected) {
      toast.error("Wallet Not Connected", {
        description: "Please connect your wallet to continue with the payment",
        duration: 4000,
      })
      return
    }
    onPay()
  }

  return (
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
                {/* Currency Selection (based on allowedCurrencies) */}
                <div className="flex gap-2">
                  {projectAllowedCurrencies && projectAllowedCurrencies.length > 1 ? (
                    (["USDC", "USDT"] as const)
                      .filter((c) => projectAllowedCurrencies.includes(c))
                      .map((token) => (
                        <button
                          key={token}
                          onClick={() => onCurrencyChange(token)}
                          className={`relative px-3 py-2 rounded-lg transition-all duration-300 border-2 ${
                            selectedCurrency === token
                              ? "bg-primary/15 text-primary border-primary/50 shadow-lg shadow-primary/20 crypto-glass-static scale-105"
                              : "crypto-glass-static border-transparent hover:border-primary/30 hover:bg-primary/5"
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <div className="relative">
                              <Image
                                src={token === "USDC" ? "/usd-coin-usdc-logo.svg" : "/tether-usdt-logo.svg"}
                                alt={token}
                                width={16}
                                height={16}
                                className="w-4 h-4"
                              />
                            </div>
                            <span className={`font-medium text-xs ${
                              selectedCurrency === token ? "text-primary" : "text-foreground"
                            }`}>
                              {token}
                            </span>
                          </div>
                        </button>
                      ))
                  ) : (
                    <div className="relative px-3 py-2 rounded-lg border-2 bg-primary/15 text-primary border-primary/50 shadow-lg shadow-primary/20 crypto-glass-static">
                      <div className="flex items-center gap-2">
                        <div className="relative scale-110">
                          <Image
                            src={selectedCurrency === "USDC" ? "/usd-coin-usdc-logo.svg" : "/tether-usdt-logo.svg"}
                            alt={selectedCurrency}
                            width={16}
                            height={16}
                            className="w-4 h-4"
                          />
                        </div>
                        <span className="font-medium text-xs text-primary">
                          {selectedCurrency}
                        </span>
                      </div>
                    </div>
                  )}
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
                          onClick={handlePayClick}
                          disabled={isLoading || !sessionId || totalAmount <= 0}
                  className={`group relative w-full h-16 rounded-2xl font-bold transition-all duration-300 ${
                    connected
                      ? "crypto-glass-static hover:bg-primary/10 hover:shadow-lg hover:shadow-primary/20 hover:ring-1 hover:ring-primary/30"
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
                          className="h-12 w-12 text-green-500" 
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
                    <div>
                      <div className="flex items-center justify-between py-3">
                      <span className="text-sm font-medium text-muted-foreground">Transaction ID</span>
                      <div className="flex items-center gap-2">
                        <HugeiconsIcon icon={ArrowUpRightIcon} className="h-4 w-4 text-primary" />
                        <a 
                          href={`https://explorer.solana.com/tx/${txSig}?cluster=${networkEnvironment === 'TEST' ? 'devnet' : 'mainnet-beta'}`} 
                          target="_blank" 
                          rel="noreferrer"
                          className="text-sm font-mono text-foreground hover:text-primary transition-colors"
                        >
                          {txSig.slice(0, 8)}...{txSig.slice(-8)}
                        </a>
                      </div>
                    </div>
                    {/* Redirect Countdown */}
                    <div className="w-full max-w-md mt-6">
                      <div className="crypto-base p-4 rounded-2xl border border-primary/20 bg-gradient-to-r from-primary/5 to-primary/10">
                        <div className="flex flex-col items-center space-y-3">
                         
                          {/* Countdown Text */}
                          <div className="text-center space-y-1">
                            <p className="text-sm font-medium text-muted-foreground">
                              Redirecting to callback URL
                            </p>
                            <div className="flex items-center justify-center space-x-2">
                              <span className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                                {countdown}
                              </span>
                              <span className="text-sm text-muted-foreground">
                                second{countdown !== 1 ? 's' : ''}
                              </span>
                            </div>
                          </div>

                          {/* Progress Bar */}
                          <div className="w-full bg-primary/10 rounded-full h-1.5 overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-primary to-primary/80 rounded-full transition-all duration-1000 ease-linear"
                              style={{ width: `${((5 - countdown) / 5) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                    </div>

                  )}
                </div>
              </div>
            </div>
          )}

        

        </div>

        {/* Gradient Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>
        <div className="px-4 py-2 rounded-full justify-center flex w-full">
          <div className="flex w-fit items-center gap-2 text-sm text-muted-foreground">
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
  )
}
