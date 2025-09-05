/*
  Warnings:

  - The values [DEVELOPMENT,PRODUCTION] on the enum `token_environment` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "public"."token_environment_new" AS ENUM ('TEST', 'LIVE');
ALTER TABLE "public"."api_token" ALTER COLUMN "environment" DROP DEFAULT;
ALTER TABLE "public"."api_token" ALTER COLUMN "environment" TYPE "public"."token_environment_new" USING ("environment"::text::"public"."token_environment_new");
ALTER TYPE "public"."token_environment" RENAME TO "token_environment_old";
ALTER TYPE "public"."token_environment_new" RENAME TO "token_environment";
DROP TYPE "public"."token_environment_old";
ALTER TABLE "public"."api_token" ALTER COLUMN "environment" SET DEFAULT 'TEST';
COMMIT;

-- AlterTable
ALTER TABLE "public"."api_token" ALTER COLUMN "environment" SET DEFAULT 'TEST';
