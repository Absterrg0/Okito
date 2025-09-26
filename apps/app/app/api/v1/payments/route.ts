import prisma from "@/db";
import { hashValue } from "@/lib/helpers";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";
import { getMintAddress } from "./helpers";

const inputSchema = z.object({
    products: z.array(z.object({
        id: z.string(),
        name: z.string(),
        price: z.number().gt(0), // unit amount (e.g., 1.23)
        metadata: z.record(z.string(), z.any()).optional(),
    })).nonempty({ message: 'products must contain at least one item' }),
    network: z.enum(['mainnet-beta','devnet']).default('mainnet-beta'),
    metadata: z.record(z.string(), z.any()).optional(),
})

export async function POST(req: NextRequest) {
    const reqHeaders = await headers();
    const apiKey = reqHeaders.get('X-OKITO-KEY');
    const idempotencyKey = reqHeaders.get('Idempotency-Key');

    if (!apiKey) {
        return NextResponse.json({ sessionId: null })
    }

    // Parse and validate request body early
    const body = await req.json();
    const result = await inputSchema.safeParseAsync(body);
    if (!result.success) {
        return NextResponse.json({ sessionId: null })
    }

    const { products, network, metadata } = result.data;
    const hashedApiToken = hashValue(apiKey);

    // Single transaction to handle authentication, idempotency, and payment creation
    try {
        const result = await prisma.$transaction(async (tx) => {
            // 1. Authenticate and get project info in one query
            const tokenInfo = await tx.apiToken.findFirst({
                where: {
                    tokenHash: hashedApiToken,
                    status: 'ACTIVE'
                },
                include: { 
                    project: {
                        include: {
                            user: {
                                select: { walletAddress: true }
                            }
                        }
                    }
                }
            });

            if (!tokenInfo) {
                throw new Error('INVALID_API_KEY');
            }

            // 2. Check for existing payment with idempotency key (if provided)
            if (idempotencyKey) {
                const existingPayment = await tx.payment.findUnique({
                    where: { idempotencyKey },
                    include: {
                        project: {
                            include: {
                                user: {
                                    select: { walletAddress: true }
                                }
                            }
                        },
                        events: true
                    }
                });

                if (existingPayment) {
                    return {
                        isExisting: true,
                        payment: existingPayment,
                        walletAddress: existingPayment.project.user.walletAddress
                    };
                }
            }

            // 3. Build event metadata
            const eventMetadata: any = (() => {
                const base: any = {};
                if (metadata !== undefined) {
                    if (metadata && typeof metadata === 'object' && !Array.isArray(metadata)) {
                        Object.assign(base, metadata as Record<string, unknown>);
                    } else {
                        base.user = metadata;
                    }
                }
                if (idempotencyKey) base.idempotencyKey = idempotencyKey;
                return base;
            })();

            // Determine currency from project's acceptedCurrencies (fallback to USDC)
            const defaultCurrency = (tokenInfo.project.acceptedCurrencies?.[0] ?? 'USDC') as 'USDC' | 'USDT';

            // Sum total amount from products (store as micro units)
            const totalMicros = products.reduce((acc, p) => acc + Math.round(p.price * 1_000_000), 0);
            if (!Number.isFinite(totalMicros) || totalMicros <= 0) {
                throw new Error('INVALID_AMOUNT');
            }

            // 4. Create payment with products and event in single operation
            const payment = await tx.payment.create({
                data: {
                    projectId: tokenInfo.projectId,
                    tokenId: tokenInfo.id,
                    amount: BigInt(totalMicros),
                    currency: defaultCurrency,
                    idempotencyKey: idempotencyKey ?? null,
                    recipientAddress: tokenInfo.project.user.walletAddress!,
                    products: {
                        create: products.map((p) => ({
                            name: p.name,
                            price: BigInt(Math.round(p.price * 1_000_000)),
                            metadata: p.metadata ? (p.metadata as any) : undefined,
                        })),
                    },
                    events: {
                        create: {
                            projectId: tokenInfo.projectId,
                            type: "PAYMENT_PENDING",
                            tokenId: tokenInfo.id,
                            metadata: eventMetadata
                        }
                    }
                },
                include: {
                    events: true
                }
            });

            // 5. Update token usage metrics (in same transaction)
            await tx.apiToken.update({
                where: { id: tokenInfo.id },
                data: { 
                    lastUsedAt: new Date(), 
                    requestCount: { increment: 1 } 
                }
            });

            return {
                isExisting: false,
                payment,
                walletAddress: tokenInfo.project.user.walletAddress
            };
        });

        // Ensure we have an event with sessionId
        const event = result.payment.events[0];
        if (!event?.sessionId) {
            throw new Error('Failed to create event with sessionId');
        }

        return NextResponse.json({ 
            sessionId: event.sessionId
        })

    } catch (error: any) {
        // Handle specific errors
        if (error.message === 'INVALID_API_KEY') {
            return NextResponse.json({ sessionId: null })
        }

        if (error.message === 'INVALID_AMOUNT') {
            return NextResponse.json({ sessionId: null })
        }

        if (error.message === 'Failed to create event with sessionId') {
            return NextResponse.json({ sessionId: null })
        }

        if (error.message === 'Existing payment missing event sessionId') {
            return NextResponse.json({ sessionId: null })
        }

        // Handle unique constraint violations (race condition fallback)
        if (error.code === 'P2002' && error.meta?.target?.includes('idempotencyKey') && idempotencyKey) {
            // Fallback: fetch the existing payment that was created
            const existingPayment = await prisma.payment.findUnique({
                where: { idempotencyKey },
                include: {
                    project: {
                        include: {
                            user: {
                                select: { walletAddress: true }
                            }
                        }
                    },
                    events: true
                }
            });

            if (existingPayment) {
                const event = existingPayment.events[0];
                if (!event?.sessionId) {
                    throw new Error('Existing payment missing event sessionId');
                }
                return NextResponse.json({ 
                    sessionId: event.sessionId
                })
            }
        }

        return NextResponse.json({ sessionId: null })
    }
}