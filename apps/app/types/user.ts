import { PublicKey } from '@solana/web3.js'
import { z } from 'zod'

export const publicKeySchema = z.preprocess((val) => {
    try {
      if (typeof val === "string") {
        return new PublicKey(val).toBase58(); 
      }
      return undefined;
    } catch {
      return undefined;
    }
  }, z.string().min(1, "Wallet address is required"));


export const userSchema = z.object({
    id: z.string(),
    name: z.string(),
    email: z.string(),
    image: z.string(),
    walletAddress: publicKeySchema.optional(),
    verifiedAt: z.date().optional(),
})


export const getWalletNonceSchema = z.object({
    publicKey:publicKeySchema,
})

export const getWalletNonceSchemaResponse = z.object({
    message:z.string(),
    timestamp:z.number(),
})


export const confirmWalletSchema = z.object({
    publicKey:publicKeySchema,
    signature:z.array(z.number()),
    timestamp:z.number({message:"Timestamp is required"}),
})


export const confirmWalletSchemaResponse = z.object({
    message:z.string(),
})




export type User = z.infer<typeof userSchema>
export type GetWalletNonceInput = z.infer<typeof getWalletNonceSchema>