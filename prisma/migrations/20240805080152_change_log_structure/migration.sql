/*
  Warnings:

  - You are about to drop the column `meta` on the `winstonlog` table. All the data in the column will be lost.
  - You are about to alter the column `level` on the `winstonlog` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(80)`.
  - You are about to alter the column `context` on the `winstonlog` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - The `correlationId` column on the `winstonlog` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to alter the column `sourceClass` on the `winstonlog` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `durationMs` on the `winstonlog` table. The data in that column could be lost. The data in that column will be cast from `Integer` to `SmallInt`.
  - The `props` column on the `winstonlog` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `app` to the `winstonlog` table without a default value. This is not possible if the table is not empty.
  - Added the required column `organization` to the `winstonlog` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."winstonlog" DROP COLUMN "meta",
ADD COLUMN     "app" VARCHAR(40) NOT NULL,
ADD COLUMN     "label" VARCHAR(40),
ADD COLUMN     "organization" VARCHAR(40) NOT NULL,
ALTER COLUMN "level" SET DATA TYPE VARCHAR(80),
ALTER COLUMN "context" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "timestamp" SET DATA TYPE TIMESTAMPTZ(6),
DROP COLUMN "correlationId",
ADD COLUMN     "correlationId" UUID,
ALTER COLUMN "sourceClass" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "durationMs" SET DEFAULT 0,
ALTER COLUMN "durationMs" SET DATA TYPE SMALLINT,
DROP COLUMN "props",
ADD COLUMN     "props" JSONB;
