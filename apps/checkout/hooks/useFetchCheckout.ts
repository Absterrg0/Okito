'use client'

import { trpc } from '@/lib/trpc'



export function useFetchCheckout(sessionId: string) {
  return trpc.events.get.useQuery({ sessionId },{
    staleTime:15*1000,
    enabled:!!sessionId
  })


}

export default useFetchCheckout


