 'use client'

 import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { HugeiconsIcon } from '@hugeicons/react'
import { EyeIcon, Copy01Icon } from '@hugeicons/core-free-icons'
import { formatAmount6Decimals, getStatusClass } from './helpers'
import { useGetEventDetails } from '@/hooks/event/useGetEventDetails'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
 

type EventDetailsSheetProps = {
  eventId: string
  onCopy?: (text: string, label: string) => void
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

export function EventDetailsSheet({ eventId, onCopy, open, onOpenChange }: EventDetailsSheetProps) {
  const [internalOpen, setInternalOpen] = useState(false)
  const [hoveredProductIndex, setHoveredProductIndex] = useState<number | null>(null)
  const isOpen = typeof open === 'boolean' ? open : internalOpen
  // Use the provided hook; only enable it when sheet is open so fetch happens on click
  const { data: details, isLoading, error } = useGetEventDetails(isOpen ? eventId : '')
  const errorMessage = (() => {
    if (!error) return null
    try {
      return (error as unknown as { message?: string }).message || String(error)
    } catch {
      return 'Failed to load event details'
    }
  })()

  const handleCopy = async (text: string, label: string) => {
    if (onCopy) return onCopy(text, label)
    try { await navigator.clipboard.writeText(text) } catch {}
  }
  return (
    <>
      <Button
        variant="ghost"
        size="sm"
        className="crypto-button-ghost h-8 w-8 p-0"
        onClick={() => (onOpenChange ? onOpenChange(true) : setInternalOpen(true))}
        title="View details"
      >
        <HugeiconsIcon icon={EyeIcon} className="w-4 h-4" />
      </Button>

      <Sheet open={isOpen} onOpenChange={(next) => (onOpenChange ? onOpenChange(next) : setInternalOpen(next))}>
        <SheetContent side="right" className="w-full crypto-base sm:max-w-xl">
          <SheetHeader>
            <div className="flex items-center justify-between gap-2 px-4 py-6">
              <SheetTitle className="truncate">{`Event ${eventId.slice(0, 8)}…`}</SheetTitle>
              <div className="flex items-center gap-2">
                {!!details?.type && <Badge variant="secondary">{details.type}</Badge>}
                {!!details?.payment?.status && (
                  <Badge variant="outline" className={getStatusClass(details.payment.status)}>
                    {details.payment.status}
                  </Badge>
                )}
              </div>
            </div>
          </SheetHeader>
          <div className="mt-4 space-y-4 overflow-y-auto max-h-[calc(100vh-120px)]">
            {errorMessage && (
              <div className="p-4 rounded crypto-input bg-red-500/10 text-red-500 text-sm">
                {errorMessage}
              </div>
            )}

            {/* When loading or no details, show basic placeholders */}
            <div className="p-4 space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-3 text-sm">
                  <div className="text-muted-foreground">Session ID</div>
                  <div className="flex items-center gap-2">
                    <Button
                    variant='ghost'
                      className="crypto-button hover:underline"
                      onClick={() => details?.sessionId && handleCopy(details?.sessionId as string, 'Session ID')}
                      title="Click to copy session ID"
                    >
                        <div> 
                      {details?.sessionId ?? '—'}
                        </div>
                    </Button>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-3 text-sm">
                  <div className="text-muted-foreground">Amount</div>
                  <div className="flex items-center gap-2">
                    <div className="font-mono text-sm bg-muted px-2 py-1 rounded flex  gap-4">
                      {details?.payment?.amount !== undefined && details?.payment?.amount !== null
                        ? formatAmount6Decimals(details?.payment?.amount as unknown as string)
                        : '—'}
                    {!!details?.payment?.currency && (
                      <span className="text-muted-foreground">{details?.payment?.currency}</span>
                    )}
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Products */}
              <div className="space-y-2">
                <div className="text-sm font-medium">Products</div>
                {!details?.payment?.products || details.payment.products.length === 0 ? (
                  <div className="p-4 rounded crypto-input bg-muted/50 text-center">
                    <p className="text-sm text-muted-foreground">No products</p>
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {details.payment.products.map((product, idx) => {
                      const hasMetadata = !!product.metadata && Object.keys(product.metadata).length > 0
                      const priceValue = typeof (product as any).price !== 'undefined' && (product as any).price !== null
                        ? Number((product as any).price) / 1_000_000
                        : null
                      const priceDisplay = priceValue !== null
                        ? priceValue.toLocaleString(undefined, { maximumFractionDigits: 6 })
                        : '-'
                      const isOpen = hoveredProductIndex === idx
                      return (
                        <Popover key={idx} open={isOpen}>
                          <PopoverTrigger asChild>
                            <button
                              className="px-2 py-1 rounded crypto-input text-sm hover:underline cursor-default"
                              onMouseEnter={() => setHoveredProductIndex(idx)}
                              onMouseLeave={() => setHoveredProductIndex((current) => (current === idx ? null : current))}
                            >
                              {product.name ?? 'Product'}
                            </button>
                          </PopoverTrigger>
                          <PopoverContent
                            side="top"
                            align="start"
                            className="w-72 crypto-base"
                            onMouseEnter={() => setHoveredProductIndex(idx)}
                            onMouseLeave={() => setHoveredProductIndex((current) => (current === idx ? null : current))}
                          >
                            <div className="space-y-2 text-sm">
                              <div className="flex items-center justify-between">
                                <div className="font-medium truncate">{product.name ?? 'Product'}</div>
                                <div className="font-mono text-xs">{priceDisplay}</div>
                              </div>
                              <div>
                                <div className="text-xs text-muted-foreground mb-1">Metadata</div>
                                {!hasMetadata ? (
                                  <div className="text-xs">-</div>
                                ) : (
                                  <div className="p-2 rounded crypto-input bg-muted max-h-60 overflow-auto">
                                    <pre className="text-xs whitespace-pre-wrap">{JSON.stringify(product.metadata, null, 2)}</pre>
                                  </div>
                                )}
                              </div>
                            </div>
                          </PopoverContent>
                        </Popover>
                      )
                    })}
                  </div>
                )}
              </div>

              {/* Metadata Section */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium">Metadata</div>
                  {details?.metadata && Object.keys(details?.metadata ?? {}).length > 0 && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="crypto-button h-7"
                      onClick={() => handleCopy(JSON.stringify(details?.metadata, null, 2), 'Metadata')}
                    >
                      <HugeiconsIcon icon={Copy01Icon} className="w-3 h-3 mr-1" /> Copy
                    </Button>
                  )}
                </div>
                {!details?.metadata || Object.keys(details?.metadata ?? {}).length === 0 ? (
                  <div className="p-4 rounded crypto-input bg-muted/50 text-center">
                    <p className="text-sm text-muted-foreground">
                      {isLoading ? 'Loading metadata…' : 'No metadata available'}
                    </p>
                  </div>
                ) : (
                  <div className="p-3 rounded crypto-input bg-muted overflow-auto max-h-96">
                    <pre className="text-xs whitespace-pre-wrap">{JSON.stringify(details?.metadata, null, 2)}</pre>
                  </div>
                )}
              </div>

              <Separator />

              {/* Webhook Delivery Attempts */}
              <div className="space-y-2">
                <div className="text-sm font-medium">Webhook Delivery Attempts</div>
                {!details?.deliveries || details?.deliveries.length === 0 ? (
                  <div className="p-4 rounded crypto-input bg-muted/50 text-center">
                    <p className="text-sm text-muted-foreground">
                      {isLoading ? 'Loading deliveries…' : 'No delivery attempts yet'}
                    </p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {details.deliveries.map((d, i) => (
                      <div key={i} className="p-3 rounded crypto-input bg-muted">
                        <div className="flex items-center justify-between text-xs">
                          <div className="font-mono break-all">{d.endpoint.url}</div>
                          <Badge variant="outline">{d.deliveryStatus}</Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  )
}


