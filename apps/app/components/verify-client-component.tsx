'use client'
import { useRouter } from 'next/navigation'
import { useWallet } from '@solana/wallet-adapter-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { toast } from 'sonner'
import { useVerifyWallet } from '@/hooks/useVerifyWallet'
import Loader from '@/components/ui/loader'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Info } from 'lucide-react'


export default  function VerifyWalletPage() {
  const router = useRouter()
  const { publicKey, signMessage, connected } = useWallet()


  const { mutate, isLoading } = useVerifyWallet({
    publicKey: publicKey?.toString() ?? null,
    connected,
    signMessage,
    onSuccess: () => {
      toast.success('Wallet verified')
      router.push('/onboarding')
    },
    onError: (err) => {
      const message =
        (err as any)?.message ||
        (err as any)?.data?.message ||
        'Verification failed'
      toast.error(message)
    },
  })


  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" aria-hidden="true" />

      <div className="relative z-10 flex min-h-screen items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2 text-foreground">Verify your wallet</h1>
            <p className="text-muted-foreground text-sm">Confirm ownership by signing a message.</p>
            <div className="mt-3 p-3 rounded-lg crypto-glass-static border-0 bg-amber-50/50 dark:bg-amber-950/20 border-amber-200/30 dark:border-amber-800/30">
              <div className="flex items-center gap-2 justify-center">
                <p className="text-xs text-amber-700 dark:text-amber-300 font-medium">
                  This is a one-time verification. Your wallet cannot be changed afterward.
                </p>
              </div>
            </div>
          </div>

          <Card className="crypto-glass-static border-0 relative overflow-hidden">
            <CardHeader>
              <CardTitle className="text-lg">Currently selected wallet</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-lg crypto-glass-static">
                <span className="text-sm text-muted-foreground">Address</span>
                <span className="text-sm font-medium">{publicKey ? `${publicKey.toString().slice(0, 6)}...${publicKey.toString().slice(-6)}` : 'Not connected'}</span>
              </div>


              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="w-full">
                      <Button
                        className="w-full crypto-button"
                        onClick={()=>{mutate()}}
                        disabled={!connected || !publicKey || !signMessage || isLoading}
                      >
                        {isLoading ?
                        <div className='flex gap-2 items-center'>
                            <Loader size={0.2} ></Loader>
                            <div> Verifying</div>     
                        </div> 
                         : 'Verify wallet'}
                      </Button>
                    </div>
                  </TooltipTrigger>
                  {(!connected || !publicKey || !signMessage) && (
                    <TooltipContent className="max-w-xs bg-foreground ">
                      <div className="flex items-center  gap-2">
                        <Info className="w-4 h-4 text-blue-500" />
                        <div className="text-sm">
                          {!connected ? "Please connect your wallet first" :
                           !publicKey ? "No wallet address detected" :
                           !signMessage ? "Your wallet doesn't support message signing. Try switching to a compatible wallet (e.g. Phantom)." :
                           "Ready to verify"}
                        </div>
                      </div>
                    </TooltipContent>
                  )}
                </Tooltip>
              </TooltipProvider>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}


