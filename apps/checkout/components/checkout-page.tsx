"use client"
import { useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { HugeiconsIcon } from '@hugeicons/react'
import { PurseIcon,ShieldBlockchainIcon,SecurityCheckIcon,Clock02Icon,AlertCircleIcon } from '@hugeicons/core-free-icons'
import CustomWallet from "@/components/custom-wallet"
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

const acceptedMethods = [
  { label: "Visa" },
  { label: "Mastercard" },
  { label: "USDC" },
  { label: "USDT" },
]

export default function CheckoutPage() {
  const [isConnected, setIsConnected] = useState(false)
  const [walletAddress, setWalletAddress] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [paymentStatus, setPaymentStatus] = useState<"idle" | "processing" | "success" | "error">("idle")
  const [email, setEmail] = useState("")
  const [promo, setPromo] = useState("")
  const [agree, setAgree] = useState(false)

  // Mock wallet connection - replace with actual Solana wallet adapter
  const connectWallet = async () => {
    setIsProcessing(true)
    // Simulate wallet connection
    setTimeout(() => {
      setIsConnected(true)
      setWalletAddress("7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU")
      setIsProcessing(false)
    }, 2000)
  }

  const processPayment = async () => {
    setPaymentStatus("processing")
    // Simulate payment processing
    setTimeout(() => {
      setPaymentStatus("success")
    }, 3000)
  }

  const subtotal = useMemo(() => mockProducts.reduce((s, p) => s + p.price, 0), [])
  const fees = useMemo(() => mockFees.network + mockFees.platform, [])
  const discount = useMemo(() => (promo.trim().toUpperCase() === "OKITO10" ? 0.1 * subtotal : 0), [promo, subtotal])
  const totalAmount = useMemo(() => Math.max(subtotal + fees - discount, 0), [subtotal, fees, discount])
  const display = (n: number) => `${n.toFixed(3)} ${mockFees.currency}`

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
              <HugeiconsIcon icon={PurseIcon} className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight font-mono">Checkout</h1>
              <p className="text-sm text-muted-foreground">Secure Solana payments</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <CustomWallet />
            <Badge variant="secondary" className="badge-secure">Protected</Badge>
            <div className="hidden md:flex items-center gap-2 text-xs text-muted-foreground">
              <HugeiconsIcon icon={Clock02Icon} className="h-3.5 w-3.5" />
              <span>Session active</span>
            </div>
          </div>
        </header>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Left Column - Order Summary */}
          <div className="space-y-6">
            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 font-mono">
                  <HugeiconsIcon icon={SecurityCheckIcon} className="h-5 w-5 text-primary" />
                  Order Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {mockProducts.map((product) => (
                  <div key={product.id} className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-medium">{product.name}</h3>
                      <p className="text-sm text-muted-foreground">{product.description}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-mono font-medium">{display(product.price)}</p>
                    </div>
                  </div>
                ))}

                <Separator />

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-mono">{display(subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Network Fee</span>
                    <span className="font-mono">{display(mockFees.network)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Platform Fee</span>
                    <span className="font-mono">{display(mockFees.platform)}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-emerald-600 dark:text-emerald-400">
                      <span>Promo (OKITO10)</span>
                      <span className="font-mono">- {display(discount)}</span>
                    </div>
                  )}
                </div>

                <Separator />

                <div className="flex justify-between text-lg font-semibold">
                  <span>Total</span>
                  <span className="font-mono">{display(totalAmount)}</span>
                </div>
              </CardContent>
            </Card>

            {/* Transaction Details */}
            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 font-mono">
                  <HugeiconsIcon icon={Clock02Icon} className="h-5 w-5 text-primary" />
                  Transaction Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Network</span>
                  <span className="font-medium">Solana Mainnet</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Estimated Time</span>
                  <span className="font-medium">~30 seconds</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Security</span>
                  <span className="font-medium text-primary">256-bit encryption</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Accepted</span>
                  <span className="font-medium">
                    {acceptedMethods.map(m => m.label).join(" · ")}
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Payment */}
          <div className="space-y-6 lg:sticky lg:top-8 self-start">
            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 font-mono">
                  <HugeiconsIcon icon={PurseIcon} className="h-5 w-5 text-primary" />
                  Wallet Connection
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {!isConnected ? (
                  <div className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      Connect your Solana wallet to proceed with the payment. We support all major Solana wallets.
                    </p>
                    <Button
                      onClick={connectWallet}
                      disabled={isProcessing}
                      className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium"
                      size="lg"
                    >
                      {isProcessing ? (
                        <div className="flex items-center gap-2">
                          <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                          Connecting...
                        </div>
                      ) : (
                        "Connect Wallet"
                      )}
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="rounded-lg bg-muted p-3">
                      <div className="flex items-center gap-2 mb-2">
                        <HugeiconsIcon icon={SecurityCheckIcon} className="h-4 w-4 text-primary" />
                        <span className="text-sm font-medium">Wallet Connected</span>
                      </div>
                      <p className="text-xs font-mono text-muted-foreground break-all">{walletAddress}</p>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Contact email</label>
                      <Input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        className="crypto-input"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Promo code</label>
                      <div className="flex gap-2">
                        <Input
                          value={promo}
                          onChange={(e) => setPromo(e.target.value)}
                          placeholder="Enter code"
                          className="crypto-input"
                        />
                        <Button
                          type="button"
                          variant="outline"
                          className="crypto-button px-4"
                          onClick={() => setPromo(promo.trim())}
                        >
                          Apply
                        </Button>
                      </div>
                      <p className="text-xs text-muted-foreground">Use OKITO10 for 10% off</p>
                    </div>

                    <div className="flex items-start gap-2">
                      <Checkbox id="terms" checked={agree} onCheckedChange={(v) => setAgree(Boolean(v))} />
                      <label htmlFor="terms" className="text-xs text-muted-foreground leading-relaxed">
                        I agree to the Terms of Service and acknowledge the Refund Policy.
                      </label>
                    </div>

                    {paymentStatus === "idle" && (
                      <Button
                        onClick={processPayment}
                        disabled={!agree || !email}
                        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium"
                        size="lg"
                      >
                        Pay {display(totalAmount)}
                      </Button>
                    )}

                    {paymentStatus === "processing" && (
                      <Button disabled className="w-full" size="lg">
                        <div className="flex items-center gap-2">
                          <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                          Processing Payment...
                        </div>
                      </Button>
                    )}

                    {paymentStatus === "success" && (
                      <div className="space-y-3">
                        <div className="rounded-lg bg-primary/10 border border-primary/20 p-4 text-center">
                          <HugeiconsIcon icon={SecurityCheckIcon} className="h-8 w-8 text-primary mx-auto mb-2" />
                          <h3 className="font-semibold text-primary">Payment Successful!</h3>
                          <p className="text-sm text-muted-foreground mt-1">
                            Your transaction has been confirmed on the Solana blockchain.
                          </p>
                        </div>
                        <Button variant="outline" className="w-full bg-transparent">
                          View Transaction
                        </Button>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Security Notice */}
            <Card className="border-border bg-card">
              <CardContent className="pt-6">
                <div className="flex items-start gap-3">
                  <HugeiconsIcon icon={ShieldBlockchainIcon} className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <div className="space-y-1">
                    <h4 className="text-sm font-medium">Secure Payment</h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Your payment is secured by Solana's blockchain technology. All transactions are encrypted and
                      verified by the network.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Support */}
            <Card className="border-border bg-card">
              <CardContent className="pt-6">
                <div className="flex items-start gap-3">
                  <HugeiconsIcon icon={AlertCircleIcon} className="h-5 w-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                  <div className="space-y-1">
                    <h4 className="text-sm font-medium">Need Help?</h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Contact our support team if you encounter any issues during the payment process.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
