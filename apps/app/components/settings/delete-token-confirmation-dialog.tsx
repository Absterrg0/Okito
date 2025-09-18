import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { HugeiconsIcon } from "@hugeicons/react"
import { Alert01Icon } from "@hugeicons/core-free-icons"
import Loader from "@/components/ui/loader"

interface DeleteTokenConfirmationDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onConfirm: () => void
  isDeleting: boolean
}

export function DeleteTokenConfirmationDialog({
  open,
  onOpenChange,
  onConfirm,
  isDeleting
}: DeleteTokenConfirmationDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] crypto-base border-0">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-destructive brightness-125">
        <HugeiconsIcon icon={Alert01Icon} className="w-5 h-5" />
            Revoke API Token
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            This action cannot be undone. This will permanently revoke your API token and remove it from your project.
          </DialogDescription>
        </DialogHeader>
        
    

        <DialogFooter className="gap-2">
   
          <Button
            variant="destructive"
            onClick={onConfirm}
            disabled={isDeleting}
            className="bg-destructive crypto-button hover:bg-destructive/90"
          >
            {isDeleting ? (
              <>
              <Loader size={0.1}></Loader>
              </>
            ) : (
              <>
                Revoke Token
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
