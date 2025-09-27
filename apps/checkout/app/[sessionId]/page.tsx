
import { CheckoutPage } from "@/components/checkout"
import { Suspense } from "react"
import { CheckoutPageSkeleton } from "@/components/ui/skeleton-loader"

export default function Checkout(){
  return (
    <Suspense fallback={<CheckoutPageSkeleton />}>
      <CheckoutPage />
    </Suspense>
  )
}