'use client'

import { createContext, useContext, ReactNode } from 'react'
import type { auth } from '@/lib/auth'

type RawSession = Awaited<ReturnType<typeof auth.api.getSession>>
type RawUser = RawSession extends null ? never : NonNullable<RawSession>['user']
type RawInternalSession = RawSession extends null ? never : NonNullable<RawSession>['session']

export type ExtendedUser = RawUser & {
  verifiedAt?: string | Date | null
  walletAddress?: string | null
}

export type ExtendedSession = RawSession extends null
  ? null
  : { user: ExtendedUser; session: RawInternalSession }

interface SessionContextType {
  session: ExtendedSession | null
}

const SessionContext = createContext<SessionContextType | undefined>(undefined)

export function SessionProvider({ children, session }: { children: ReactNode; session: ExtendedSession | null }) {
  return (
    <SessionContext.Provider value={{ session }}>
      {children}
    </SessionContext.Provider>
  )
}

export function useSessionContext() {
  const context = useContext(SessionContext)
  if (context === undefined) {
    throw new Error('useSessionContext must be used within a SessionProvider')
  }
  return context
}
