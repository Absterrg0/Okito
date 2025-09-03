-- AlterTable
ALTER TABLE "public"."user" ADD COLUMN     "verifiedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "walletAddress" TEXT;
