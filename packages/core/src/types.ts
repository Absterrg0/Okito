export interface PaymentRequest {
  amount: number;
  currency: 'SOL' | 'USDC' | string;
  recipient: string;
  callbackUrl?: string;
  metadata?: Record<string, any>;
  apiKey: string;
}

export interface PaymentConfig {
  environment?: 'development' | 'production';
  apiBaseUrl?: string; 
}

export interface PaymentResult {
  success: boolean;
  txHash?: string;
  error?: string;
  sessionId: string;
}

import {z} from 'zod'
export const PaymentInputSchema = z.object({
    amount:z.number().positive(),
    token:z.enum(['USDC','USDT']),
    metadata:z.record(z.string(),z.any()).optional(),
    network:z.enum(['mainnet-beta','devnet']),
    apiKey:z.string(),
})


export type PaymentInputSchemaType = z.infer<typeof PaymentInputSchema>




// Response schema for validation
export const PaymentSessionResponseSchema = z.object({
    msg: z.string(),
    paymentId: z.string(),
    sessionId: z.string(),
    walletAddress: z.string(),
    tokenMint: z.string(),
    amount: z.number(),
    token: z.enum(['USDC', 'USDT']),
    network: z.enum(['mainnet-beta', 'devnet']),
});

export type PaymentSessionResponse = z.infer<typeof PaymentSessionResponseSchema>;




export const PaymentCheckoutInputSchema = z.object({
    amount:z.number().positive(),
    mint:z.string(),
    walletAddress:z.string(),
    sessionId:z.string(),
    paymentId:z.string(),
})



export const PaymentCheckoutResponseSchema = z.object({
    success:z.boolean(),
    msg:z.string(),
    txHash:z.string()    
})



export type PaymentCheckoutInputSchemaType = z.infer<typeof PaymentCheckoutInputSchema>


export type PaymentCheckoutResponse = z.infer<typeof PaymentCheckoutResponseSchema>


export type OkitoToken = "USDC" | "USDT";
export type OkitoNetwork = "mainnet-beta" | "devnet";
