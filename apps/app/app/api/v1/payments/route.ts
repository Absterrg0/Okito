import prisma from "@/db";
import { hashValue } from "@/lib/helpers";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { inputSchema } from "./types";
import { withPaymentRateLimit } from "../rate-limiter/middleware";

async function paymentHandler(req: NextRequest) {
    try{
        const reqHeaders = await headers();
        const apiKey = reqHeaders.get('X-OKITO-KEY');
        const idempotencyKey = reqHeaders.get('Idempotency-Key');
        
    if (!apiKey) {
        return NextResponse.json({ sessionId: null, error: "API key is required" }, { status: 400 })
    }
    
    const body = await req.json();
    const result = await inputSchema.safeParseAsync(body);
    if (!result.success) {
        const errorMessage = result.error.issues.map(i => i.message).join('; ');
        return NextResponse.json({ sessionId: null, error: `Validation error: ${errorMessage}` }, { status: 400 })
    }
    
    const { products, metadata } = result.data;
    const hashedApiToken = hashValue(apiKey);
    
    try {
        const result = await prisma.$transaction(async (tx) => {
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
            
            const eventMetadata: any = (() => {
                const base: any = {};
                if (metadata !== undefined) {
                    if (metadata && typeof metadata === 'object' && !Array.isArray(metadata)) {
                        Object.assign(base, metadata as Record<string, unknown>);
                    } else {
                        base.user = metadata;
                    }
                }
                return base;
            })();
            
            
            // Sum total amount from products (store as micro units)
            const totalMicros = products.reduce((acc, p) => acc + Math.round(p.price * 1_000_000), 0);
            if (!Number.isFinite(totalMicros) || totalMicros <= 0) {
                throw new Error('INVALID_AMOUNT');
            }
            
            const payment = await tx.payment.create({
                data: {
                    projectId: tokenInfo.projectId,
                    tokenId: tokenInfo.id,
                    amount: BigInt(totalMicros),
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
                            type: "PAYMENT",
                            tokenId: tokenInfo.id,
                            metadata: eventMetadata
                        }
                    }
                },
                include: {
                    events: true
                }
            });

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
        
        return NextResponse.json({ sessionId: event.sessionId, error: null })
        
    } catch (error: any) {
        // Handle specific errors
        if (error.message === 'INVALID_API_KEY') {
            return NextResponse.json({ sessionId: null, error: "Invalid or inactive API key" }, { status: 401 })
        }
        
        if (error.message === 'INVALID_AMOUNT') {
            return NextResponse.json({ sessionId: null, error: "Invalid payment amount" }, { status: 400 })
        }
        
        if (error.message === 'Failed to create event with sessionId') {
            return NextResponse.json({ sessionId: null, error: "Failed to create payment session" }, { status: 500 })
        }
        
        if (error.message === 'Existing payment missing event sessionId') {
            return NextResponse.json({ sessionId: null, error: "Existing payment session is invalid" }, { status: 500 })
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
                return NextResponse.json({ sessionId: event.sessionId, error: null })
            }
        }
        
        return NextResponse.json({ sessionId: null, error: "An unexpected error occurred" }, { status: 500 })
    }
}
catch(e){
    console.error(e);
    return NextResponse.json({
        msg:"Internal server error"
    },{
        status:500
    })
}
}

// Export the POST function with rate limiting applied
export const POST = await withPaymentRateLimit(paymentHandler);