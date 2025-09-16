'use client'

import { useEffect, useMemo } from 'react'
import { useSearchParams } from 'next/navigation'
import { trpc } from '@/lib/trpc'

type UseFetchCheckoutResult = {
  sessionId: string | null
  isLoading: boolean
  error: { message?: string } | null
  event: ReturnType<typeof trpc.events.get.useMutation>['data']
  refetch: () => void
}

export function useFetchCheckout(): UseFetchCheckoutResult {
  const params = useSearchParams()
  const sessionId = params.get('sessionId')

  const getEvent = trpc.events.get.useMutation()

  useEffect(() => {
    if (sessionId) {
      getEvent.mutate({ sessionId })
    }
  }, [sessionId])

  const result = useMemo<UseFetchCheckoutResult>(() => ({
    sessionId,
    isLoading: getEvent.isPending,
    error: (getEvent.error as unknown as { message?: string } | null) ?? null,
    event: getEvent.data,
    refetch: () => {
      if (sessionId) getEvent.mutate({ sessionId })
    },
  }), [sessionId, getEvent.isPending, getEvent.error, getEvent.data])

  return result
}

export default useFetchCheckout


