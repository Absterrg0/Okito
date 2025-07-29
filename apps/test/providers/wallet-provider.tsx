'use client'
import { ConnectionProvider,WalletProvider } from "@solana/wallet-adapter-react";
import {clusterApiUrl} from "@solana/web3.js";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
 
require('@solana/wallet-adapter-react-ui/styles.css');
 
export default function Wallet({children}: {children: React.ReactNode}) {
 
    const endpoint = clusterApiUrl('devnet')  // mainnet-beta || devnet || testnet
 
    return (
       <ConnectionProvider endpoint={endpoint}> 
        <WalletProvider wallets={[]} autoConnect>
            <WalletModalProvider>
                {children}
            </WalletModalProvider>
        </WalletProvider>
       </ConnectionProvider>
    )
} 