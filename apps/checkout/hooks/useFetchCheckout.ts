'use client'

import { trpc } from '@/lib/trpc'

export function useFetchCheckout(sessionId: string) {
  return trpc.events.get.useQuery({ sessionId }, {
    // Cache data for 5 minutes since checkout sessions don't change frequently
    staleTime: 5 * 60 * 1000,
    // Keep data in cache for 10 minutes
    gcTime: 10 * 60 * 1000,
    // Only run query if sessionId exists
    enabled: !!sessionId,
    // Don't retry on error to immediately show error state
    retry: false,
    // Don't refetch on window focus to avoid unnecessary requests
    refetchOnWindowFocus: true,
    // Don't refetch on mount if we have fresh data
    refetchOnMount: false,
    // Don't refetch on reconnect to avoid disrupting user experience
    refetchOnReconnect: true,
    // Network mode for better offline handling
    networkMode: 'online',
    // Add error handling with specific error types
    
  })
}

export default useFetchCheckout


