-- AlterTable
ALTER TABLE "public"."project" ADD COLUMN     "acceptedCurrencies" "public"."AllowedCurrency"[],
ADD COLUMN     "eventTypes" "public"."EventType"[],
ADD COLUMN     "notificationEmails" TEXT[];
