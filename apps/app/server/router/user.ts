import { protectedProcedure, router } from "../trpc";
import {
  confirmWalletSchema,
  confirmWalletSchemaResponse,
  getWalletNonceSchema,
  getWalletNonceSchemaResponse,
} from "@/types/user";
import { verifySignature, generateNonce } from "@/lib/solanaUtils";
import prisma from "@/db";
import { TRPCError } from "@trpc/server";
import { createHelius } from 'helius-sdk'

// Lifetime of a nonce in ms (5 minutes here)
const NONCE_EXPIRY = 5 * 60 * 1000;

const getWalletNonce = protectedProcedure
  .input(getWalletNonceSchema)
  .output(getWalletNonceSchemaResponse)
  .mutation(async ({ input }) => {
    const { publicKey } = input;
    const currentTimestamp = Date.now();
    const message = generateNonce(publicKey, currentTimestamp);

    return {
      message,
      timestamp: currentTimestamp,
    };
  });

const confirmWallet = protectedProcedure
  .input(confirmWalletSchema)
  .output(confirmWalletSchemaResponse)
  .mutation(async ({ input, ctx }) => {
    const { timestamp, signature, publicKey } = input;

    // 1. Expiry check
    if (Date.now() - timestamp > NONCE_EXPIRY) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Nonce expired, please request a new message",
      });
    }

    // 2. Rebuild expected message
    const expectedMessage = generateNonce(publicKey, timestamp);

    // 3. Verify signature
    const isValid = verifySignature(publicKey, signature, expectedMessage);
    if (!isValid) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Invalid signature",
      });
    }

    // 4. Update user
    await prisma.user.update({
      where: { id: ctx.session.user.id },
      data: {
        walletAddress: publicKey,
        verifiedAt: new Date(),
      },
    });


    const apiKey = process.env.HELIUS_API_KEY || "";
    const helius = createHelius({ apiKey });

    try {
      const currentAddressesDev = await helius.webhooks
        .get(process.env.WEBHOOK_DEV_ID!)
        .then((webhook) => webhook.accountAddresses || []);

      if (!currentAddressesDev.includes(publicKey)) {
        const nextAddressesDev = [...currentAddressesDev, publicKey];
        await helius.webhooks.update(process.env.WEBHOOK_DEV_ID!, {
          accountAddresses: nextAddressesDev,
          transactionTypes:['TRANSFER','TRANSFER_PAYMENT'],
          webhookType:'enhanced',
          webhookURL:process.env.WEBHOOK_DEV_URL
        });
      }

      const currentAddressesMain = await helius.webhooks
        .get(process.env.WEBHOOK_MAIN_ID!)
        .then((webhook) => webhook.accountAddresses || []);

      if (!currentAddressesMain.includes(publicKey)) {
        const nextAddressesMain = [...currentAddressesMain, publicKey];
        await helius.webhooks.update(process.env.WEBHOOK_MAIN_ID!, {
          accountAddresses: nextAddressesMain,
          transactionTypes:['TRANSFER','TRANSFER_PAYMENT'],
          webhookType:'enhanced',
          webhookURL:process.env.WEBHOOK_MAIN_URL
        });
      }

    } catch (err) {
      // Log but do not fail user verification if webhook update fails
      console.error("Helius webhook update failed:", err);
    }
    


    return {
      message: "Wallet linked successfully",
    };
  });

export const userRouter = router({
  getWalletNonce,
  confirmWallet,
});
