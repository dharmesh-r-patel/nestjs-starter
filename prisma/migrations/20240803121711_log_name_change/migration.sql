/*
  Warnings:

  - You are about to drop the `Log` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "public"."Log";

-- CreateTable
CREATE TABLE "public"."winstonlog" (
    "id_log" UUID NOT NULL DEFAULT gen_random_uuid(),
    "level" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "meta" TEXT,
    "context" TEXT,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "correlationId" TEXT,
    "sourceClass" TEXT,
    "durationMs" INTEGER,
    "stack" TEXT,
    "props" TEXT,

    CONSTRAINT "winstonlog_pkey" PRIMARY KEY ("id_log")
);
