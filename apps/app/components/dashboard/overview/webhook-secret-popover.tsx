'use client'
import { useState } from "react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Shield, Eye, EyeOff, Copy, AlertTriangle } from "lucide-react"
import { useWebhookSecretFetch } from "@/hooks/webhook/useWebhookSecretFetch"
import { copyToClipboard } from "@/lib/helpers"

interface WebhookSecretPopoverProps {
  webhookId: string
}

export default function WebhookSecretPopover({ webhookId }: WebhookSecretPopoverProps) {
  const [showSecretValue, setShowSecretValue] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const { data: secretData, isLoading: isLoadingSecret } = useWebhookSecretFetch(webhookId)

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button 
          variant="ghost" 
          size="sm" 
          className="crypto-button h-8 w-8 p-0"
          title="View webhook secret"
        >
          <Shield className="w-4 h-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent 
        className="w-[400px] p-4 crypto-base border-0" 
        align="center"
        side="top"
      >
        <div className="space-y-4">
          <div className="space-y-2">
          <div className="p-3 rounded-lg crypto-base border border-amber-200 dark:border-amber-800">
            <div className="flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400 mt-0.5 shrink-0" />
              <div className="space-y-1">
                <p className="text-xs text-amber-700 dark:text-amber-300">
                  This secret is used to verify that webhooks are coming from Okito. Store it securely and use it to validate incoming webhook signatures.
                </p>
              </div>
            </div>
          </div>
            <div className="relative">
              <div
                className="crypto-button pr-10 p-2  font-mono text-sm overflow-hidden"
              >
                {showSecretValue ? secretData?.secret.slice(0,32)+'...' : '•'.repeat(36)}
              </div>
              
              {!isLoadingSecret && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 p-0"
                  onClick={() => setShowSecretValue(!showSecretValue)}
                >
                  {showSecretValue ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </Button>
              )}
            </div>
          </div>
          
          
          
          <div className="flex justify-end gap-2">
            <Button
              onClick={() => {
                if (secretData?.secret) {
                  copyToClipboard(secretData.secret, 'Webhook secret')
                }
              }}
              disabled={isLoadingSecret || !secretData?.secret}
              className="crypto-button"
              size="sm"
            >
              <Copy className="w-4 h-4 mr-2" />
              Copy Secret
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
