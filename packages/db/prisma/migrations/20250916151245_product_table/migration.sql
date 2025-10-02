/*
  Warnings:

  - A unique constraint covering the columns `[sessionId]` on the table `event` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateTable
CREATE TABLE "public"."product" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "price" BIGINT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "eventId" TEXT NOT NULL,
    "paymentId" TEXT NOT NULL,

    CONSTRAINT "product_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "product_name_idx" ON "public"."product"("name");

-- CreateIndex
CREATE UNIQUE INDEX "event_sessionId_key" ON "public"."event"("sessionId");

-- AddForeignKey
ALTER TABLE "public"."product" ADD CONSTRAINT "product_paymentId_fkey" FOREIGN KEY ("paymentId") REFERENCES "public"."payment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
