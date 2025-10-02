"use client"
import { useState } from "react"
import React from "react"
  import { useConnection, useWallet } from "@solana/wallet-adapter-react"
import { ModeToggle } from "../ui/theme-toggle"
import useFetchCheckout from "@/hooks/useFetchCheckout"
import { trpc } from "@/lib/trpc"
import { VersionedTransaction } from "@solana/web3.js"
import { redirect, useParams, useSearchParams } from "next/navigation"
import { CheckoutPageSkeleton } from "../ui/skeleton-loader"
import Header from "./Header"
import OrderSummary from "./OrderSummary"
import PaymentInterface from "./PaymentInterface"
import { toast } from "sonner"

export default function CheckoutPage() {
  const { connected, publicKey, signTransaction } = useWallet()
  const {connection} = useConnection();
  const params = useParams();
  const searchParams = useSearchParams();

  const sessionId = params.sessionId as string

  const { isLoading, data: event, error: fetchError } = useFetchCheckout(sessionId)
  const callbackUrl = searchParams.get('callback') || (event?.payment as any)?.callbackUrl || ''
  const buildPayment = trpc.transaction.buildPayment.useMutation({
    mutationKey:['transaction.buildPayment',sessionId]
  });
  const submitPayment = trpc.transaction.submitPayment.useMutation({
    mutationKey:['transaction.submitPayment',sessionId]
  });
  const [paymentStatus, setPaymentStatus] = useState<"idle" | "processing" | "success" | "error">("idle")
  const [txSig, setTxSig] = useState<string | null>(null)

  const products = event?.payment?.products ?? []
  const projectAllowedCurrencies = ((event?.project?.acceptedCurrencies ?? []) as ("USDC" | "USDT")[])
  console.log(projectAllowedCurrencies);
  const [selectedCurrency, setSelectedCurrency] = useState<"USDC" | "USDT">(((event?.project?.acceptedCurrencies ?? ['USDC', 'USDT'])[0] as "USDC" | "USDT"))
  
  const subtotal = products.reduce((sum, item: any) => {
    const price = Number(item.price ?? 0) / 1_000_000
    return sum + price
  }, 0)
  const networkFee = 0.001 // Fixed network fee
  const totalAmount = subtotal + networkFee



  // Handle errors by redirecting to generic error page
  if (fetchError) {
    // Redirect to generic error page
    redirect('/checkout-error');
  }

  if (isLoading) {
    return <CheckoutPageSkeleton />
  }

  const handlePay = async () => {
    if (!sessionId || !connected || !publicKey || !signTransaction) {
      toast.error("Please connect your wallet to continue")
      return
    }

    // Prevent multiple simultaneous payment attempts
    if (paymentStatus === 'processing') {
      toast.warning("Payment already in progress", {
        description: "Please wait for the current payment to complete"
      })
      return
    }
    
    try {
      setPaymentStatus('processing')
      
      // Show loading toast
      toast.loading("Preparing your payment...", { id: 'payment-prep' })
      const { serializedTx } = await buildPayment.mutateAsync({
        sessionId,
        payerPublicKey: publicKey.toBase58(),
        token: selectedCurrency,
      })

      // Dismiss loading toast and show wallet prompt
      toast.dismiss('payment-prep')
      toast.loading("Please confirm the transaction in your wallet...", { id: 'wallet-confirm' })

      const tx = VersionedTransaction.deserialize(Buffer.from(serializedTx, 'base64'))
      const signedTx = await signTransaction(tx)
      
      // Dismiss wallet toast and show transaction processing
      toast.dismiss('wallet-confirm')
      toast.loading("Processing transaction on blockchain...", { id: 'tx-processing' })
      
      // Send signed transaction to backend for submission
      const signedTransactionBase64 = Buffer.from(signedTx.serialize()).toString('base64')
      const { signature } = await submitPayment.mutateAsync({
        sessionId,
        signedTransaction: signedTransactionBase64,
      })
      
      // Success
      toast.dismiss('tx-processing')
      toast.success("Payment completed successfully!", {
        description: `Transaction: ${signature.slice(0, 8)}...${signature.slice(-8)}`
      })
      
      setTxSig(signature)
      setPaymentStatus('success')
    } catch (e: any) {
      // Dismiss any loading toasts
      toast.dismiss('payment-prep')
      toast.dismiss('wallet-confirm')
      toast.dismiss('tx-processing')

      
      let errorMessage = 'Payment failed. Please try again.'
      
      // Handle specific error cases
      if (e.message?.includes('already been processed')) {
        errorMessage = 'This transaction has already been processed. Please check your wallet for the transaction status.'
      } else if (e.message?.includes('User rejected')) {
        errorMessage = 'Transaction was cancelled by user.'
      } else if (e.message?.includes('Insufficient funds')) {
        errorMessage = 'Insufficient funds to complete the transaction.'
      } else if (e.message?.includes('timeout')) {
        errorMessage = 'Transaction confirmation timed out. Please check your wallet for the transaction status.'
      } else if (e.message) {
        errorMessage = e.message
      }
      
      // Show error toast
      toast.error("Payment Failed", {
        description: errorMessage,
        duration: 5000, // Show longer for important errors
      })
      
      setPaymentStatus('idle')
    }
  }


  const handleCurrencyChange = (currency: "USDC" | "USDT") => {
    setSelectedCurrency(currency)
    toast.info(`Selected ${currency}`, {
      description: `Make sure you have sufficient ${currency} balance in your wallet`,
      duration: 3000,
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-background/95">
      <Header 
        project={event?.project}
        occurredAt={event?.createdAt}
      />

      <main className="min-h-[calc(100vh-120px)] flex items-center justify-center">
        <div className="max-w-7xl mx-auto px-8 w-full">
          <div className="grid lg:grid-cols-5 gap-16 items-center">
            <OrderSummary
              products={products}
              selectedCurrency={selectedCurrency}
              subtotal={subtotal}
              networkFee={networkFee}
              totalAmount={totalAmount}
            />

            {/* Vertical Gradient Separator */}
            <div className="hidden lg:flex justify-center items-center h-full min-h-[600px] relative">
              <div className="w-px h-full bg-gradient-to-b from-transparent via-primary/30 to-transparent"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-primary/10 border-2 border-primary/20 flex items-center justify-center">
                <div className="w-3 h-3 rounded-full bg-primary/40 animate-pulse"></div>
              </div>
            </div>

            <PaymentInterface
              paymentStatus={paymentStatus}
              connected={connected}
              isLoading={isLoading}
              sessionId={sessionId}
              totalAmount={totalAmount}
              selectedCurrency={selectedCurrency}
              projectAllowedCurrencies={projectAllowedCurrencies}
              txSig={txSig}
              onPay={handlePay}
              onCurrencyChange={handleCurrencyChange}
              networkEnvironment={event?.token?.environment ?? undefined}
              callbackUrl={callbackUrl}
            />
          </div>
        </div>
      </main>
      <ModeToggle />
    </div>
  )
}