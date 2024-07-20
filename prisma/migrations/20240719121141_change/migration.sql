-- AlterTable
ALTER TABLE "public"."countries" ALTER COLUMN "id_country" SET DEFAULT gen_random_uuid();

-- AlterTable
ALTER TABLE "public"."currencies" ALTER COLUMN "country_code" DROP NOT NULL;

-- AlterTable
ALTER TABLE "public"."timezone" ALTER COLUMN "id_timezone" SET DEFAULT gen_random_uuid();
