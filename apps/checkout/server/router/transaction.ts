import { protectedProcedure, router } from "../trpc";
import { z } from "zod";
import prisma from "@/db";
import { Connection, PublicKey, TransactionInstruction, TransactionMessage, VersionedTransaction } from "@solana/web3.js";
import {
  TOKEN_PROGRAM_ID,
  createAssociatedTokenAccountInstruction,
  createTransferInstruction,
  getAssociatedTokenAddress,
  getMint,
  getAccount,
} from "@solana/spl-token";

function createMemoInstruction(memo: string): TransactionInstruction {
  const MEMO_PROGRAM_ID = new PublicKey("MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr");
  return new TransactionInstruction({
    keys: [],
    programId: MEMO_PROGRAM_ID,
    data: Buffer.from(memo, "utf8"),
  });
}


function getMintAddress(token: string, network: "mainnet-beta" | "devnet"): PublicKey {
  if (token === "USDC") {
    return network === "mainnet-beta" 
      ? new PublicKey("EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v") // Mainnet USDC
      : new PublicKey("4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU"); // Devnet USDC
  } else if (token === "USDT") {
    return network === "mainnet-beta" 
      ? new PublicKey("Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB") // Mainnet USDT
      : new PublicKey("C8dV1ujnpVaUYZBLsD1fGkx9pVnUo4LxGC7hB9NRWnfa"); // Devnet USDT
  }
  throw new Error(`Unsupported token: ${token}`);
}

export const transactionRouter = router({
  buildPayment: protectedProcedure
    .input(
      z.object({
        sessionId: z.string(),
        payerPublicKey: z.string(),
        token: z.enum(["USDC", "USDT"]),
      })
    )
    .output(
      z.object({
        serializedTx: z.string(),
        recentBlockhash: z.string(),
        lastValidBlockHeight: z.number(),
        network: z.enum(["mainnet-beta", "devnet"]),
      })
    )
    .mutation(async ({ input }) => {
      const { sessionId, payerPublicKey, token } = input;

      try {
        // 1. Validate session and event
        const event = await prisma.event.findFirst({
          where: { sessionId },
          include: {
            payment: { include: { products: true } },
            token: { select: { environment: true } },
          },
        });

        if (!event) {
          throw new Error("Invalid session. Please refresh and try again.");
        }

        if (!event.payment) {
          throw new Error("Payment information not found. Please contact support.");
        }

        // 2. Validate session expiry
        const sessionAge = Date.now() - new Date(event.occurredAt).getTime();
        const sessionExpired = sessionAge > 15 * 60 * 1000; // 15 minutes
        
        if (sessionExpired) {
          throw new Error("Session expired. Please refresh the page and try again.");
        }

        // 3. Setup network and connection
        const network = event.token?.environment === "TEST" ? "devnet" as const : "mainnet-beta" as const;
        const connection = new Connection(
          network === "mainnet-beta" ? process.env.MAINNET_RPC_URL! : process.env.DEVNET_RPC_URL!
        );

        // 4. Calculate amounts
        const subtotal = event.payment.products.reduce((sum, p) => sum + Number(p.price ?? 0) / 1_000_000, 0);
        const networkFee = 0.001;
        const totalAmount = subtotal + networkFee;

        if (totalAmount <= 0) {
          throw new Error("Invalid payment amount. Please contact support.");
        }

        // 5. Validate public keys
        let payer: PublicKey;
        let destinationPubkey: PublicKey;
        
        try {
          payer = new PublicKey(payerPublicKey);
          destinationPubkey = new PublicKey(event.payment.recipientAddress);
        } catch (error) {
          throw new Error("Invalid wallet address. Please connect a valid wallet.");
        }

        // 6. Get mint information (USDC/USDT are original tokens, use TOKEN_PROGRAM_ID only)
        const mintAddress = getMintAddress(token, network);
        let mintInfo;
        
        try {
          mintInfo = await getMint(connection, mintAddress, "confirmed", TOKEN_PROGRAM_ID);
        } catch (error) {
          throw new Error(`Failed to fetch ${token} token information. Please try again.`);
        }

        const decimals = mintInfo.decimals;
        const rawAmount = BigInt(Math.floor(totalAmount * Math.pow(10, decimals)));

        // 7. Get token account addresses
        const sourceTokenAccountAddress = await getAssociatedTokenAddress(
          mintAddress, 
          payer, 
          false, 
          TOKEN_PROGRAM_ID
        );
        
        const destinationTokenAccountAddress = await getAssociatedTokenAddress(
          mintAddress,
          destinationPubkey,
          false,
          TOKEN_PROGRAM_ID
        );

        // 8. Check if payer's token account exists
        let sourceAccountInfo;
        try {
          sourceAccountInfo = await getAccount(connection, sourceTokenAccountAddress, "confirmed", TOKEN_PROGRAM_ID);
        } catch (error) {
          throw new Error(`You don't have a ${token} token account. Please acquire some ${token} tokens first.`);
        }

        // 9. Check if payer has sufficient balance
        if (sourceAccountInfo.amount < rawAmount) {
          const requiredBalance = Number(rawAmount) / Math.pow(10, decimals);
          const currentBalance = Number(sourceAccountInfo.amount) / Math.pow(10, decimals);
          
          throw new Error(
            `Insufficient ${token} balance. Required: ${requiredBalance.toFixed(6)} ${token}, ` +
            `Current: ${currentBalance.toFixed(6)} ${token}. Please add more ${token} to your wallet.`
          );
        }

        // 10. Check if destination account exists, create if needed
        const destinationAccountInfo = await connection.getAccountInfo(destinationTokenAccountAddress);
        
        const instructions: TransactionInstruction[] = [];
        
        // Add memo instruction
        instructions.push(
          createMemoInstruction(
            JSON.stringify({ 
              sessionId, 
              amount: totalAmount.toString(), 
              token, 
              timestamp: Date.now(),
              projectId: event.projectId 
            })
          )
        );

        // Create destination account if it doesn't exist
        if (destinationAccountInfo === null) {
          instructions.push(
            createAssociatedTokenAccountInstruction(
              payer,
              destinationTokenAccountAddress,
              destinationPubkey,
              mintAddress,
              TOKEN_PROGRAM_ID
            )
          );
        }

        // Add transfer instruction
        instructions.push(
          createTransferInstruction(
            sourceTokenAccountAddress,
            destinationTokenAccountAddress,
            payer,
            rawAmount,
            [],
            TOKEN_PROGRAM_ID
          )
        );

        // 11. Get latest blockhash and create transaction
        const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash();

        const messageV0 = new TransactionMessage({
          payerKey: payer,
          recentBlockhash: blockhash,
          instructions,
        }).compileToV0Message();

        const transaction = new VersionedTransaction(messageV0);
        const serializedTx = Buffer.from((transaction as any).serialize({ requireAllSignatures: false, verifySignatures: false })).toString("base64");

        return {
          serializedTx,
          recentBlockhash: blockhash,
          lastValidBlockHeight,
          network,
        };

      } catch (error) {
        console.error("Transaction build error:", error);
        
        // Re-throw known errors with user-friendly messages
        if (error instanceof Error) {
          throw error;
        }
        
        // Handle unknown errors
        throw new Error("Failed to prepare transaction. Please try again or contact support.");
      }
    }),
});