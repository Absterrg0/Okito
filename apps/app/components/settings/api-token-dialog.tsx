import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogOverlay } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { HugeiconsIcon } from "@hugeicons/react"
import { Copy01Icon } from "@hugeicons/core-free-icons"
import { copyToClipboard } from "@/lib/helpers"
import {toast} from 'sonner'

export function ApiTokenDialog({
  open,
  onOpenChange,
  token,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  token: string | null
}) {

    const handleCloseDialog = ()=>{
        onOpenChange(false)
    }

 
    
  const [isTokenStored, setIsTokenStored] = useState(false)

  if (!token) return null

  return (
    <Dialog open={open} onOpenChange={() => {
        toast.info("Please tick the checkbox to acknowledge token storage")
    }}>
      <DialogOverlay className="backdrop-blur-xs" />
      <DialogContent onAnimationEnd={()=>{
        setIsTokenStored(false);
      }} className="crypto-base max-w-md" showCloseButton={false}>
        <DialogHeader>
          <DialogTitle className="ml-1">API Token</DialogTitle>
          
        </DialogHeader>

        {/* Token Display with Copy */}
        <div className="flex items-center justify-between crypto-base p-3 bg-muted rounded font-mono text-sm break-all">
          <span>
            {token.slice(0, 6)}***********************{token.slice(-4)}
          </span>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => copyToClipboard(token, "API token")}
            className="crypto-button-ghost h-8 w-8 p-0 shrink-0"
          >
            <HugeiconsIcon icon={Copy01Icon} className="w-4 h-4" />
          </Button>
        </div>

       
        {/* Acknowledge + Close */}
        <div className="space-y-6">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="token-stored"
              
              className=""
              checked={isTokenStored}
              onCheckedChange={(checked) => setIsTokenStored(!!checked)}
            />
            <label
              htmlFor="token-stored"
              className="text-sm text-foreground select-none cursor-pointer"
            >
              I have securely stored this token
            </label>
          </div>

          <Button
            onClick={handleCloseDialog}
            disabled={!isTokenStored}
            variant={'secondary'}
            className="w-full crypto-base"
          >
            {isTokenStored ? "Close" : "Please confirm token storage"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
