import prisma from "@/db";
import { hashValue } from "@/lib/helpers";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";
import { getMintAddress } from "./helpers";

const inputSchema = z.object({
    amount: z.number().gt(0, { message: 'amount must be > 0' }),
    token: z.enum(['USDC','USDT']),
    network: z.enum(['mainnet-beta','devnet']).default('mainnet-beta'),
    metadata: z.json().optional()
})

export async function POST(req: NextRequest) {
    const reqHeaders = await headers();
    const apiKey = reqHeaders.get('X-OKITO-KEY');
    const idempotencyKey = reqHeaders.get('Idempotency-Key');

    if (!apiKey) {
        return NextResponse.json({
            msg: "API KEY is missing from the headers"
        }, {
            status: 401
        })
    }

    // Parse and validate request body early
    const body = await req.json();
    console.log(body);
    const result = await inputSchema.safeParseAsync(body);
    if (!result.success) {
      // console.log(result.error);
        return NextResponse.json({
            msg: "Invalid request body"
        }, {
            status: 400
        })
    }

    const { amount, token, network, metadata } = result.data;
    const hashedApiToken = hashValue(apiKey);
    const mintAddress = getMintAddress(token, network);

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
                        }
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

            // 4. Create payment with event in single operation
            const payment = await tx.payment.create({
                data: {
                    projectId: tokenInfo.projectId,
                    tokenId: tokenInfo.id,
                    amount: BigInt(Math.round(amount * Math.pow(10, 6))),
                    currency: token,
                    idempotencyKey: idempotencyKey ?? null,
                    events: {
                        create: {
                            projectId: tokenInfo.projectId,
                            type: "PAYMENT_PENDING",
                            tokenId: tokenInfo.id,
                            metadata: eventMetadata
                        }
                    }
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

        // Format response
        const responseData = {
            msg: result.isExisting ? "Payment intent reused" : "Payment intent created successfully",
            paymentId: result.payment.id,
            sessionId: result.payment.id,
            walletAddress: result.walletAddress,
            tokenMint: mintAddress.toBase58(),
            amount,
            currency: token,
            network,
            status: "PENDING"
        };

        return NextResponse.json(responseData, { status: 200 });

    } catch (error: any) {
        // Handle specific errors
        if (error.message === 'INVALID_API_KEY') {
            return NextResponse.json({
                msg: "The provided API KEY is invalid or revoked"
            }, {
                status: 403
            });
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
                    }
                }
            });

            if (existingPayment) {
                return NextResponse.json({
                    msg: "Payment intent reused",
                    paymentId: existingPayment.id,
                    sessionId: existingPayment.id,
                    walletAddress: existingPayment.project.user.walletAddress ?? null,
                    tokenMint: mintAddress.toBase58(),
                    amount,
                    currency: token,
                    network,
                    status: "PENDING"
                }, { status: 200 });
            }
        }

        return NextResponse.json({
            msg: "Internal server error"
        }, {
            status: 500
        });
    }
}