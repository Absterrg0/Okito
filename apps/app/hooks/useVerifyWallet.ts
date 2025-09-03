'use client'

import { useMutation } from '@tanstack/react-query'
import axios from 'axios'

type Params = {
  publicKey: string | null
  connected: boolean
  signMessage?: (message: Uint8Array) => Promise<Uint8Array>
  onSuccess?: () => void
  onError?: (err: any) => void
}

async function requestWalletNonce(publicKey: string) {
  const res = await axios.post('/api/auth/link-wallet', { publicKey })
  return res.data as { message: string; timestamp: number }
}

async function verifyWalletSignature(input: {
  publicKey: string
  signature: number[]
  timestamp: number
}) {
  const res = await axios.post('/api/auth/link-wallet', input)
  return res.data
}

export function useVerifyWallet({ publicKey, connected, signMessage, onSuccess, onError }: Params) {
  return useMutation({
    mutationFn: async () => {
      if (!connected || !publicKey) {
        throw new Error('Please connect your wallet first')
      }
      if (!signMessage) {
        throw new Error('Your wallet does not support message signing. Please use a compatible wallet.')
      }

      const { message, timestamp } = await requestWalletNonce(publicKey)

      const encodedMessage = new TextEncoder().encode(message)
      let signature: Uint8Array
      try {
        signature = await signMessage(encodedMessage)
      } catch {
        throw new Error('Message signing was cancelled or failed')
      }

      await verifyWalletSignature({
        publicKey,
        signature: Array.from(signature),
        timestamp,
      })
    },
    onSuccess,
    onError,
  })

}


