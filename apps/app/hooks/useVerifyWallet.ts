'use client'

import { trpc } from '@/lib/trpc'

type Params = {
  publicKey: string | null
  connected: boolean
  signMessage?: (message: Uint8Array) => Promise<Uint8Array>
  onSuccess?: () => void
  onError?: (err: any) => void
}

export function useVerifyWallet({ publicKey, connected, signMessage, onSuccess, onError }: Params) {
  const getNonce = trpc.user.getWalletNonce.useMutation()
  const confirmWallet = trpc.user.confirmWallet.useMutation({
    onSuccess,
    onError,
  })

  return {
    mutate: async () => {
      if (!connected || !publicKey) {
        throw new Error('Please connect your wallet first')
      }
      if (!signMessage) {
        throw new Error('Your wallet does not support message signing. Please use a compatible wallet.')
      }

      // Step 1: Request nonce
      const { message, timestamp } = await getNonce.mutateAsync({ publicKey })

      // Step 2: Sign the message
      let signature: Uint8Array
      try {
        signature = await signMessage(new TextEncoder().encode(message))
      } catch {
        throw new Error('Message signing was cancelled or failed')
      }

      // Step 3: Confirm wallet with signature (base58 encoded)
      await confirmWallet.mutateAsync({
        publicKey,
        signature: Array.from(signature), // server expects string
        timestamp,
      })
    },
    isLoading: getNonce.isPending || confirmWallet.isPending,
    error: getNonce.error || confirmWallet.error,
    isSuccess: confirmWallet.isSuccess,
  }
}
