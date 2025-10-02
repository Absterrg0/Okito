/*
  Warnings:

  - You are about to drop the column `subjectId` on the `event` table. All the data in the column will be lost.
  - You are about to drop the column `subjectType` on the `event` table. All the data in the column will be lost.
  - You are about to drop the column `webhookUrl` on the `event` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."event" DROP COLUMN "subjectId",
DROP COLUMN "subjectType",
DROP COLUMN "webhookUrl";

-- AlterTable
ALTER TABLE "public"."payment" ALTER COLUMN "txHash" DROP NOT NULL;
