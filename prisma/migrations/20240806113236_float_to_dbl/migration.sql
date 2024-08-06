/*
  Warnings:

  - You are about to alter the column `durationMs` on the `winstonlog` table. The data in that column could be lost. The data in that column will be cast from `Real` to `Decimal(10,4)`.

*/
-- AlterTable
ALTER TABLE "public"."winstonlog" ALTER COLUMN "durationMs" SET DATA TYPE DECIMAL(10,4);
