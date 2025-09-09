"use client"

import  { createContext, useMemo} from "react"
import { useContext } from "react"
import {
  ConnectionProvider,
  WalletProvider
} from "@solana/wallet-adapter-react"
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui'
import { z } from 'zod'
export const OkitoConfigSchema = z.object({
    network:z.enum(["mainnet-beta","devnet"]),
    rpcUrl:z.url("Invalid RPC URL format"),
})

export type OkitoConfig = z.infer<typeof OkitoConfigSchema>

const OkitoConfigContext = createContext<OkitoConfig | null>(null)

/**
 * OkitoProvider
 * Provides Solana connection, wallet, and Okito config context to the app.
 */
export default function OkitoProvider({
  children,
  config,
}: {
  children: React.ReactElement
  config: OkitoConfig
}) {
  const validatedConfig = useMemo(() => {
    try {
      return OkitoConfigSchema.parse(config);
    } catch (error) {
      throw new Error(`Invalid Okito configuration: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }, [config]);
  
  const endpoint = validatedConfig.rpcUrl;

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={[]} autoConnect>
        <WalletModalProvider>
        <OkitoConfigContext.Provider value={validatedConfig}>
          {children}
        </OkitoConfigContext.Provider>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  )
}

/**
 * Hook to access Okito configuration
 */
export function useOkitoConfig(): OkitoConfig {
    const ctx = useContext(OkitoConfigContext)
    if (!ctx) throw new Error("useOkitoConfig must be used within an OkitoProvider")
    return ctx
}
