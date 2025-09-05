/*
  Warnings:

  - The values [SUSPENDED] on the enum `token_status` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `apiVersion` on the `event` table. All the data in the column will be lost.
  - You are about to drop the column `data` on the `event` table. All the data in the column will be lost.
  - You are about to drop the column `source` on the `event` table. All the data in the column will be lost.
  - You are about to drop the column `confirmations` on the `payment` table. All the data in the column will be lost.
  - You are about to drop the column `metadata` on the `payment` table. All the data in the column will be lost.
  - You are about to drop the column `webhookUrl` on the `payment` table. All the data in the column will be lost.
  - You are about to drop the column `apiVersion` on the `webhook_endpoint` table. All the data in the column will be lost.
  - You are about to drop the column `lastUsedAt` on the `webhook_endpoint` table. All the data in the column will be lost.
  - The `eventTypes` column on the `webhook_endpoint` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `webhookUrl` to the `event` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `type` on the `event` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `currency` on the `payment` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "public"."AllowedCurrency" AS ENUM ('USDC', 'USDT');

-- CreateEnum
CREATE TYPE "public"."EventType" AS ENUM ('PAYMENT_COMPLETED', 'PAYMENT_FAILED', 'PAYMENT_PENDING');

-- AlterEnum
BEGIN;
CREATE TYPE "public"."token_status_new" AS ENUM ('ACTIVE', 'REVOKED');
ALTER TABLE "public"."api_token" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "public"."api_token" ALTER COLUMN "status" TYPE "public"."token_status_new" USING ("status"::text::"public"."token_status_new");
ALTER TYPE "public"."token_status" RENAME TO "token_status_old";
ALTER TYPE "public"."token_status_new" RENAME TO "token_status";
DROP TYPE "public"."token_status_old";
ALTER TABLE "public"."api_token" ALTER COLUMN "status" SET DEFAULT 'ACTIVE';
COMMIT;

-- AlterTable
ALTER TABLE "public"."event" DROP COLUMN "apiVersion",
DROP COLUMN "data",
DROP COLUMN "source",
ADD COLUMN     "metadata" JSONB,
ADD COLUMN     "webhookUrl" TEXT NOT NULL,
DROP COLUMN "type",
ADD COLUMN     "type" "public"."EventType" NOT NULL;

-- AlterTable
ALTER TABLE "public"."payment" DROP COLUMN "confirmations",
DROP COLUMN "metadata",
DROP COLUMN "webhookUrl",
DROP COLUMN "currency",
ADD COLUMN     "currency" "public"."AllowedCurrency" NOT NULL;

-- AlterTable
ALTER TABLE "public"."webhook_endpoint" DROP COLUMN "apiVersion",
DROP COLUMN "lastUsedAt",
ADD COLUMN     "lastTimeHit" TIMESTAMP(3),
DROP COLUMN "eventTypes",
ADD COLUMN     "eventTypes" "public"."EventType"[];

-- DropEnum
DROP TYPE "public"."userType";

-- CreateIndex
CREATE INDEX "event_projectId_type_createdAt_idx" ON "public"."event"("projectId", "type", "createdAt");
