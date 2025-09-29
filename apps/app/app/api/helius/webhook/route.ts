import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/db";
import bs58 from "bs58";
import { deliverWebhookToAllEndpoints, WebhookEventPayload } from "@/lib/webhook-delivery";

const MEMO_PROGRAM_ID = "MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr";

// Helper function to determine network based on token environment
function getNetworkFromTokenEnvironment(tokenEnvironment?: string): string {
  if (tokenEnvironment === 'TEST') {
    return 'devnet';
  } else if (tokenEnvironment === 'LIVE') {
    return 'mainnet-beta';
  }
  // Default fallback - could also check environment variables
  return process.env.NODE_ENV === 'production' ? 'mainnet-beta' : 'devnet';
}

interface MemoData {
  sessionId: string;
  amount: string;
  token: string;
  timestamp: number;
  projectId: string;
}

function parseMemoDataIntoString(instruction: any[]): MemoData | null {
  const memoInstruction = instruction.find((ix) => ix.programId === MEMO_PROGRAM_ID);

  if (!memoInstruction) return null;

  try {
    let decodedData: string;
    
    // Try base58 first (most common for Solana webhook data)
    try {
      const decodedBytes = bs58.decode(memoInstruction.data);
      decodedData = Buffer.from(decodedBytes).toString('utf-8');
      console.log('Successfully decoded with base58:', decodedData);
    } catch (base58Error) {
      console.log('Base58 decode failed, trying base64:', memoInstruction.data);
      
      // Fallback to base64
      try {
        decodedData = Buffer.from(memoInstruction.data, 'base64').toString('utf-8');
        console.log('Successfully decoded with base64:', decodedData);
      } catch (base64Error) {
        console.error('Both base58 and base64 decode failed:', { base58Error, base64Error });
        return null;
      }
    }
    
    return JSON.parse(decodedData) as MemoData;
  } catch (error) {
    console.error('Failed to parse memo data:', error);
    return null;
  }
}




export async function POST(req:NextRequest){

        const headersList = await headers();

        const authHeader = headersList.get('Authorization');

        if(!authHeader){
            return NextResponse.json({
                msg:"Unauthorized"
            },{
                status:403
            })
        }

        if(authHeader !== process.env.AUTH_HEADER){
            return NextResponse.json({
                msg:"Invalid auth header found"
            },{
                status:403
            })
        }

        const webhookData = await req.json();
        console.log('Webhook received:', JSON.stringify(webhookData, null, 2));

        // Process each transaction in the webhook
        for (const transaction of webhookData) {
          try {
            // Skip failed transactions
            if (transaction.transactionError) {
              console.log('Skipping failed transaction:', transaction.signature);
              continue;
            }

            // Skip if no token transfers (not a payment)
            if (!transaction.tokenTransfers || transaction.tokenTransfers.length === 0) {
              console.log('Skipping transaction with no token transfers:', transaction.signature);
              continue;
            }

            // Parse memo data to get session information
            const memoData = parseMemoDataIntoString(transaction.instructions);
            
            if (!memoData || !memoData.sessionId) {
              console.log('Skipping transaction without valid memo data:', transaction.signature);
              continue;
            }

            console.log('Processing payment for session:', memoData.sessionId, 'with memo data:', memoData);

            // Find the event by session ID
            const event = await prisma.event.findFirst({
              where: { sessionId: memoData.sessionId },
              include: {
                payment: {
                  include: {
                    products: true,
                    token: true
                  }
                },
                project: true,
                token: true
              }
            });

            if (!event) {
              console.log('No event found for session:', memoData.sessionId);
              continue;
            }

            // Verify the payment amount matches
            const expectedAmount = parseFloat(memoData.amount);
            const actualAmount = transaction.tokenTransfers[0]?.tokenAmount;
            
            if (Math.abs(expectedAmount - actualAmount) > 0.000001) { // Allow for small floating point differences
              console.log(`Amount mismatch for session ${memoData.sessionId}: expected ${expectedAmount}, got ${actualAmount}`);
              continue;
            }

            // Update the payment status to confirmed
            await prisma.payment.update({
              where: { id: event.payment!.id },
              data: {
                status: 'CONFIRMED',
                txHash: transaction.signature,
                blockNumber: BigInt(transaction.slot),
                confirmedAt: new Date(transaction.timestamp * 1000), // Convert Unix timestamp to Date
                updatedAt: new Date()
              }
            });

            // Update the event type to PAYMENT_COMPLETED
            const updatedEvent = await prisma.event.update({
              where: { id: event.id },
              data: {
                type: 'PAYMENT_COMPLETED',
                metadata: {
                  ...(typeof event.metadata === 'object' && event.metadata !== null ? event.metadata : {}),
                  transactionSignature: transaction.signature,
                  confirmedAt: new Date(transaction.timestamp * 1000),
                  blockNumber: transaction.slot,
                  amount: actualAmount,
                  token: memoData.token
                }
              },
              include: {
                payment: {
                  include: {
                    products: true,
                    token: true
                  }
                },
                project: true,
                token: true
              }
            });

            // Determine network from token environment
            const tokenEnvironment = updatedEvent.payment!.token?.environment || updatedEvent.token?.environment;
            const network = getNetworkFromTokenEnvironment(tokenEnvironment);
            

            if(!updatedEvent.payment){
              return NextResponse.json({
                msg:"Payment not found"
              },{
                status:500
              })
            }
            // Create webhook payload
            const webhookPayload: WebhookEventPayload = {
              id: updatedEvent.id,
              type: 'PAYMENT_CONFIRMED',
              createdAt: updatedEvent.createdAt.toISOString(),
              data: {
                sessionId: updatedEvent.sessionId,
                paymentId: updatedEvent.payment.id,
                amount: Number(updatedEvent.payment.amount) / 1000000, // Convert from lamports to token amount
                currency: updatedEvent.payment.currency ?? 'USDC',
                network: network,
                status: 'CONFIRMED',
                metadata: updatedEvent.metadata,
                walletAddress: updatedEvent.payment.recipientAddress,
                tokenMint: memoData.token,
                transactionSignature: transaction.signature,
                blockNumber: transaction.slot,
                confirmedAt: new Date(transaction.timestamp * 1000).toISOString(),
                products: updatedEvent.payment.products?.map(product => ({
                  id: product.id,
                  name: product.name,
                  price: Number(product.price) / 1000000, // Convert from lamports to token amount
                  metadata: product.metadata
                })) || []
              }
            };

            // Deliver webhooks to all configured endpoints
            try {
              await deliverWebhookToAllEndpoints(
                updatedEvent.id,
                updatedEvent.projectId,
                'PAYMENT_CONFIRMED',
                webhookPayload
              );
              console.log(`Webhooks delivered for payment completion: ${updatedEvent.sessionId}`);
            } catch (webhookError) {
              console.error('Failed to deliver webhooks:', webhookError);
              // Don't fail the main transaction processing if webhook delivery fails
            }

          } catch (error) {
            console.error('Error processing transaction:', transaction.signature, error);
            // Continue processing other transactions even if one fails
          }
        }

        return NextResponse.json({
          msg: "OK"
        }, {
          status: 200
        })

}