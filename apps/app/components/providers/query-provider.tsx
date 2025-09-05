'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactNode, useState } from 'react'
import { httpBatchLink } from '@trpc/react-query'
import { trpc } from '@/lib/trpc'
export default function QueryProvider({ children }: { children: ReactNode }) {
  const [client] = useState(() => new QueryClient())
  const [trpcClient] = useState(()=> trpc.createClient({
    links:[
      httpBatchLink({
        url:'/api/trpc'
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
