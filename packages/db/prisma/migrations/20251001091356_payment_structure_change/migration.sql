/*
  Warnings:

  - The values [PAYMENT_COMPLETED,PAYMENT_FAILED,PAYMENT_PENDING] on the enum `EventType` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `expiresAt` on the `event` table. All the data in the column will be lost.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "public"."EventType_new" AS ENUM ('PAYMENT');
ALTER TABLE "public"."webhook_endpoint" ALTER COLUMN "eventTypes" TYPE "public"."EventType_new"[] USING ("eventTypes"::text::"public"."EventType_new"[]);
ALTER TABLE "public"."event" ALTER COLUMN "type" TYPE "public"."EventType_new" USING ("type"::text::"public"."EventType_new");
ALTER TYPE "public"."EventType" RENAME TO "EventType_old";
ALTER TYPE "public"."EventType_new" RENAME TO "EventType";
DROP TYPE "public"."EventType_old";
COMMIT;

-- AlterTable
ALTER TABLE "public"."event" DROP COLUMN "expiresAt";
