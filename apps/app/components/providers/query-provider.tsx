'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React, { useState } from 'react'
import { httpBatchLink } from '@trpc/react-query'
import { trpc } from '@/lib/trpc'
import superjson from 'superjson'
export default function QueryProvider({ children }: { children: React.ReactNode }) {
  const [client] = useState(() => new QueryClient())
  const [trpcClient] = useState(()=> trpc.createClient({
    links:[
      httpBatchLink({
        url:'/api/trpc',
        transformer:superjson
      })
    ]
  }))
  return (
    <trpc.Provider client={trpcClient} queryClient={client}>
    <QueryClientProvider client={client}>
      {children}
    </QueryClientProvider>
    </trpc.Provider>
  )
}
