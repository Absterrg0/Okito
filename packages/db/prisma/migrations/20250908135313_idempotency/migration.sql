/*
  Warnings:

  - A unique constraint covering the columns `[idempotencyKey]` on the table `payment` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "public"."payment" ADD COLUMN     "idempotencyKey" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "payment_idempotencyKey_key" ON "public"."payment"("idempotencyKey");
