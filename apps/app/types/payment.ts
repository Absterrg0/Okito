import { z } from 'zod'

export const paymentSchema = z.object({
    id: z.string(),
    projectId: z.string(),
    tokenId: z.string(),
    amount: z.bigint(),
    currency: z.enum(['USDC', 'USDT']).nullable(),
    recipientAddress: z.string(),
    txHash: z.string().nullable(),
    blockNumber: z.bigint().nullable(),
    status: z.enum(['PENDING', 'CONFIRMED', 'FAILED'])
})

export type Payment = z.infer<typeof paymentSchema>