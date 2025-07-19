import type { PublicKey } from "@solana/web3.js"
import type { SignerWallet } from "../custom-wallet-adapter"

export type PayProps={
    wallet:SignerWallet,
    network:"mainnet-beta" | "devnet",
    merchantPublicKey:PublicKey,
    token: "USDC" | "USDT",
    amount: number 

}
        

export type PayWithCryptoProps = {
    amount: number;
    onSuccess?: (signature: string) => void;
    onError?: (error: Error) => void;
    className?: string;
    label?: string;
  }


 