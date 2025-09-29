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
    products:z.array(z.object({
        id:z.string(),
        name:z.string(),
        price:z.number(),
        metadata:z.record(z.string(),z.any()).optional(),
    })),
    metadata:z.record(z.string(),z.any()).optional(),
    apiKey:z.string(),
})


export type PaymentInputSchemaType = z.infer<typeof PaymentInputSchema>




// Response schema for validation
export const PaymentSessionResponseSchema = z.object({
    sessionId: z.string().nullable(),
    error:z.string().nullable()
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
