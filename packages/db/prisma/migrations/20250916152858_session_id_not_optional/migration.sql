/*
  Warnings:

  - You are about to drop the column `eventId` on the `product` table. All the data in the column will be lost.
  - Made the column `sessionId` on table `event` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "public"."event" ALTER COLUMN "sessionId" SET NOT NULL;

-- AlterTable
ALTER TABLE "public"."product" DROP COLUMN "eventId";
