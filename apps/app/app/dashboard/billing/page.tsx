import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { HugeiconsIcon } from "@hugeicons/react"
import { CreditCardIcon } from "@hugeicons/core-free-icons"

export default function BillingPage() {
  return (
    <div className="container mx-auto p-6">
      <Card className="crypto-glass-static">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-xl">
            <HugeiconsIcon icon={CreditCardIcon} className="w-6 h-6 text-primary" />
            Billing & Subscription
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-16">
            <div className="p-6 rounded-full crypto-base border-2 border-dashed border-border/30 w-fit mx-auto mb-6">
              <HugeiconsIcon icon={CreditCardIcon} className="w-12 h-12 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-3">Billing Page Coming Soon</h3>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-md mx-auto">
              We're working on a comprehensive billing and subscription management system. 
              This page will allow you to view your usage, manage your subscription, and update payment methods.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
