/*
  Warnings:

  - You are about to drop the column `occurredAt` on the `event` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."event" DROP COLUMN "occurredAt",
ADD COLUMN     "expiresAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
