/*
  Warnings:

  - Made the column `recipientAddress` on table `payment` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "public"."payment" ALTER COLUMN "recipientAddress" SET NOT NULL;
