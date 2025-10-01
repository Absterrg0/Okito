import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/db";
import { deliverWebhookToAllEndpoints, WebhookEventPayload } from "@/app/api/helius/webhook/webhook-delivery";
import { emailService } from "@/lib/email-service";
import { EmailTemplateType } from "@/lib/email-templates";
import { getNetworkFromTokenEnvironment, parseMemoDataIntoString } from "./helpers";
import { getMintAddress } from "@/app/api/v1/payments/helpers";

export async function POST(req: NextRequest) {
  const headersList = await headers();

  const authHeader = headersList.get('Authorization');

  if (!authHeader) {
    return NextResponse.json(
      {
        msg: "Unauthorized",
      },
      {
        status: 403,
      }
    );
  }

  if (authHeader !== process.env.AUTH_HEADER) {
    return NextResponse.json(
      {
        msg: "Invalid auth header found",
      },
      {
        status: 403,
      }
    );
  }

  const webhookData = await req.json();

  console.log(webhookData);

  for (const transaction of webhookData) {
    try {
      if (transaction.transactionError) {
        continue;
      }

      // Skip if no token transfers (not a payment)
      if (!transaction.tokenTransfers || transaction.tokenTransfers.length === 0) {
        continue;
      }

      // Parse memo data to get session information
      const memoData = parseMemoDataIntoString(transaction.instructions);

      if (!memoData || !memoData.sessionId) {
        continue;
      }

      // Idempotency check: Skip if this transaction has already been processed
      const existingPayment = await prisma.payment.findFirst({
        where: { txHash: transaction.signature },
      });

      if (existingPayment) {
        continue;
      }

      // Find the event by session ID
      const event = await prisma.event.findFirst({
        where: { sessionId: memoData.sessionId },
        include: {
          payment: {
            include: {
              products: true,
              token: true,
            },
          },
          project: true,
          token: true,
        },
      });

      if (!event) {
        continue;
      }

      // Verify the payment amount matches
      const expectedAmount = parseFloat(memoData.amount);
      const actualAmount = transaction.tokenTransfers[0]?.tokenAmount;

      if (Math.abs(expectedAmount - actualAmount) > 0.000001) {
        // Allow for small floating point differences
        continue;
      }

      // Detect currency symbol from related token info, fallback to existing currency
      // Try to infer currency from transfer mint and project token environment
      const transfer = transaction.tokenTransfers?.[0]
      const transferMint: string | undefined = transfer?.mint
      const envForNetwork = event.payment?.token?.environment || event.token?.environment
      const network = getNetworkFromTokenEnvironment(envForNetwork)
      type SolanaNetwork = 'mainnet-beta' | 'devnet'
      const networkForHelper: SolanaNetwork = network === 'devnet' ? 'devnet' : 'mainnet-beta'
      let resolvedCurrency: 'USDC' | 'USDT' | null = null
      try {
        if (transferMint) {
          const usdcMint = getMintAddress('USDC', networkForHelper).toBase58()
          const usdtMint = getMintAddress('USDT', networkForHelper).toBase58()
          if (transferMint === usdcMint) resolvedCurrency = 'USDC'
          else if (transferMint === usdtMint) resolvedCurrency = 'USDT'
        }
      } catch {}

      // Update the payment status to confirmed (and persist currency if detected)
      await prisma.payment.update({
        where: { id: event.payment!.id },
        data: {
          status: "CONFIRMED",
          txHash: transaction.signature,
          blockNumber: BigInt(transaction.slot),
          confirmedAt: new Date(transaction.timestamp * 1000), // Convert Unix timestamp to Date
          updatedAt: new Date(),
          ...(resolvedCurrency ? { currency: resolvedCurrency } : {}),
        },
      });

      // Build context from existing event/payment after payment update (no event mutation)
      const context = await prisma.event.findFirst({
        where: { id: event.id },
        include: {
          payment: {
            include: {
              products: true,
              token: true,
            },
          },
          project: true,
          token: true,
        },
      });

      if (!context || !context.payment) {
        return NextResponse.json(
          {
            msg: "Payment not found",
          },
          {
            status: 500,
          }
        );
      }

      // Determine network from token environment
      const tokenEnvironment =
        context.payment!.token?.environment || context.token?.environment;
      const networkContext = getNetworkFromTokenEnvironment(tokenEnvironment);

      // Create webhook payload
      const webhookPayload: WebhookEventPayload = {
        id: context.id,
        type: "PAYMENT_CONFIRMED",
        createdAt: context.createdAt.toISOString(),
        data: {
          sessionId: context.sessionId,
          paymentId: context.payment.id,
          amount: Number(context.payment.amount) / 1000000, // Convert from lamports to token amount
          currency: context.payment.currency ?? "USDC",
          network: networkContext,
          status: "CONFIRMED",
          metadata: event.metadata ?? {},
          walletAddress: context.payment.recipientAddress,
          tokenMint: memoData.token,
          transactionSignature: transaction.signature,
          blockNumber: transaction.slot,
          confirmedAt: new Date(transaction.timestamp * 1000).toISOString(),
          products:
            context.payment.products?.map((product) => ({
              id: product.id,
              name: product.name,
              price: Number(product.price) / 1000000, // Convert from lamports to token amount
              metadata: product.metadata,
            })) || [],
        },
      };

      // Deliver webhooks to all configured endpoints
      try {
        await deliverWebhookToAllEndpoints(
          context.id,
          context.projectId,
          "PAYMENT_CONFIRMED",
          webhookPayload
        );
      } catch (webhookError) {
        // Don't fail the main transaction processing if webhook delivery fails
      }

      // Send email notification
      try {
        await emailService.sendNotification({
          projectId: context.projectId,
          templateType: EmailTemplateType.SALE_NOTIFICATION,
          templateProps: {
            projectName: context.project.name,
            customerWalletAddress: context.payment.recipientAddress,
            amount: Number(context.payment.amount) / 1000000, // Convert from micro units
            currency: context.payment.currency ?? "USDC",
            transactionSignature: transaction.signature,
            products:
              context.payment.products?.map((product) => ({
                name: product.name,
                price: Number(product.price) / 1000000, // Convert from micro units
                quantity: 1, // You might want to add quantity to your product schema
              })) || [],
            network: network,
            confirmedAt: new Date(transaction.timestamp * 1000).toISOString(),
          },
        });
      } catch (emailError) {
        // Don't fail the main transaction processing if email sending fails
      }
    } catch (error) {
      // Continue processing other transactions even if one fails
    }
  }

  return NextResponse.json(
    {
      msg: "OK",
    },
    {
      status: 200,
    }
  );
}