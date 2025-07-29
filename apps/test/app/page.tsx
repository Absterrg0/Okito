'use client'
import { useConnection } from "@solana/wallet-adapter-react";
import {  useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { AirdropRecipient, estimateAirdropFee, estimateTokenCreationFee,  type TokenLaunchData } from "@okito/sdk";
import { getMintAddress } from "@okito/sdk";
import { estimateTokenTransferFee } from "@okito/sdk";
import { Keypair } from "@solana/web3.js";
import { estimateBurnFee } from "@okito/sdk";

import { createNewToken } from "@okito/sdk";

const tokenData:TokenLaunchData ={
  name:"TEST",
  symbol:"TST",
  imageUrl:"https://example.com/image.png",
  initialSupply:1000000000,
  decimals:6,
  freezeAuthority:true,
} 

export default async function Home() {
  const wallet = useWallet();
  
  const {connection} = useConnection();

  const token = await createNewToken({wallet,connection.tokenData})

  return (
    <div className="w-full h-screen flex justify-center items-center ">
      <WalletMultiButton></WalletMultiButton>
    </div>
  );
}
