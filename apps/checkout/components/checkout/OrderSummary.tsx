"use client"

interface Product {
  id: string
  name: string
  description?: string
  price: bigint
}

interface OrderSummaryProps {
  products: Product[]
  selectedCurrency: "USDC" | "USDT"
  subtotal: number
  networkFee: number
  totalAmount: number
}

export default function OrderSummary({ 
  products, 
  selectedCurrency, 
  subtotal, 
  networkFee, 
  totalAmount 
}: OrderSummaryProps) {
  const formatAmount = (amount: number) => `${amount.toFixed(3)} ${selectedCurrency}`

  return (
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

          {products.map((item, index) => {
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
  )
}
