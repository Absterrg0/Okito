'use client'
import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react";
import { clusterApiUrl } from "@solana/web3.js";

export default function Wallet({children}: {children: React.ReactNode}) {
    const endpoint = clusterApiUrl('devnet')
    

    return (
        <ConnectionProvider endpoint={endpoint}>
            <WalletProvider wallets={[]} autoConnect>
                {children}
            </WalletProvider>
        </ConnectionProvider>
    )
}