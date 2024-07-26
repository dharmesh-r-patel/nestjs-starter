-- CreateTable
-- CREATE TABLE "public"."Session" (
--     "id" TEXT NOT NULL,
--     "sessionToken" TEXT NOT NULL,
--     "userId" TEXT NOT NULL,
--     "test" TEXT NOT NULL,
--     "expires" TIMESTAMP(3) NOT NULL,

--     CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
-- );

-- CreateTable
-- CREATE TABLE "public"."VerificationToken" (
--     "identifier" TEXT NOT NULL,
--     "token" TEXT NOT NULL,
--     "expires" TIMESTAMP(3) NOT NULL
-- );

-- CreateTable
-- CREATE TABLE "public"."Token" (
--     "id" TEXT NOT NULL,
--     "name" TEXT NOT NULL,
--     "hashedKey" TEXT NOT NULL,
--     "partialKey" TEXT NOT NULL,
--     "expires" TIMESTAMP(3),
--     "lastUsed" TIMESTAMP(3),
--     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
--     "updatedAt" TIMESTAMP(3) NOT NULL,
--     "userId" TEXT NOT NULL,

--     CONSTRAINT "Token_pkey" PRIMARY KEY ("id")
-- );

-- CreateTable
CREATE TABLE "public"."countries" (
    "id_country" UUID NOT NULL,
    "name" VARCHAR(80),
    "iso" CHAR(2) NOT NULL,
    "nice_name" VARCHAR(80) NOT NULL,
    "iso3" CHAR(3),
    "num_code" VARCHAR(10),
    "dial_code" VARCHAR(10),
    "continent" VARCHAR(20),
    "capital" VARCHAR(40),
    "id_currency" UUID,
    "id_timezone" UUID,
    "status" SMALLINT NOT NULL DEFAULT 1,
    "id_created_by" UUID,
    "id_updated_by" UUID,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6),

    CONSTRAINT "countries_pkey" PRIMARY KEY ("id_country")
);

-- CreateTable
CREATE TABLE "public"."currencies" (
    "id_currency" UUID NOT NULL,
    "code" VARCHAR(10) NOT NULL,
    "name" VARCHAR(80) NOT NULL,
    "name_plural" VARCHAR(80) NOT NULL,
    "symbol" VARCHAR(10) NOT NULL,
    "symbol_native" VARCHAR(10) NOT NULL,
    "decimal_digits" SMALLINT NOT NULL DEFAULT 2,
    "rounding" SMALLINT NOT NULL DEFAULT 0,
    "country_code" VARCHAR(10) NOT NULL,
    "status" SMALLINT NOT NULL DEFAULT 1,

    CONSTRAINT "currencies_pkey" PRIMARY KEY ("id_currency")
);

-- CreateTable
CREATE TABLE "public"."timezone" (
    "id_timezone" UUID NOT NULL,
    "value" VARCHAR(40) NOT NULL,
    "offset" VARCHAR(10) NOT NULL,
    "offset_in_minutes" SMALLINT NOT NULL,
    "abbr" VARCHAR(10) NOT NULL,
    "text" VARCHAR(40) NOT NULL,
    "status" SMALLINT NOT NULL DEFAULT 1,

    CONSTRAINT "timezone_pkey" PRIMARY KEY ("id_timezone")
);

-- -- CreateTable
-- CREATE TABLE "public"."Post" (
--     "id" SERIAL NOT NULL,
--     "title" TEXT NOT NULL,
--     "content" TEXT NOT NULL,
--     "authorId" INTEGER NOT NULL,

--     CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
-- );

-- -- CreateTable
-- CREATE TABLE "public"."User" (
--     "id" TEXT NOT NULL,
--     "name" TEXT,
--     "email" TEXT,
--     "emailVerified" TIMESTAMP(3),
--     "image" TEXT,
--     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
--     "subscribed" BOOLEAN NOT NULL DEFAULT true,
--     "source" TEXT,
--     "defaultWorkspace" TEXT,
--     "dharmesh" TEXT,
--     "patel" TEXT,

--     CONSTRAINT "User_pkey" PRIMARY KEY ("id")
-- );

-- -- CreateTable
-- CREATE TABLE "public"."Account" (
--     "id" TEXT NOT NULL,
--     "userId" TEXT NOT NULL,
--     "type" TEXT NOT NULL,
--     "provider" TEXT NOT NULL,
--     "providerAccountId" TEXT NOT NULL,
--     "refresh_token" TEXT,
--     "refresh_token_expires_in" INTEGER,
--     "access_token" TEXT,
--     "expires_at" INTEGER,
--     "token_type" TEXT,
--     "scope" TEXT,
--     "id_token" TEXT,
--     "session_state" TEXT,

--     CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
-- );

-- -- CreateIndex
-- CREATE UNIQUE INDEX "Session_sessionToken_key" ON "public"."Session"("sessionToken");

-- -- CreateIndex
-- CREATE INDEX "Session_userId_idx" ON "public"."Session"("userId");

-- -- CreateIndex
-- CREATE UNIQUE INDEX "VerificationToken_token_key" ON "public"."VerificationToken"("token");

-- -- CreateIndex
-- CREATE UNIQUE INDEX "VerificationToken_identifier_token_key" ON "public"."VerificationToken"("identifier", "token");

-- -- CreateIndex
-- CREATE UNIQUE INDEX "Token_hashedKey_key" ON "public"."Token"("hashedKey");

-- -- CreateIndex
-- CREATE INDEX "Token_userId_idx" ON "public"."Token"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "countries_name_key" ON "public"."countries"("name");

-- CreateIndex
CREATE INDEX "idx_name_btree" ON "public"."countries"("name");

-- -- CreateIndex
-- CREATE UNIQUE INDEX "User_email_key" ON "public"."User"("email");

-- -- CreateIndex
-- CREATE INDEX "User_source_idx" ON "public"."User"("source");

-- -- CreateIndex
-- CREATE INDEX "User_defaultWorkspace_idx" ON "public"."User"("defaultWorkspace");

-- -- CreateIndex
-- CREATE INDEX "Account_userId_idx" ON "public"."Account"("userId");

-- -- CreateIndex
-- CREATE UNIQUE INDEX "Account_provider_providerAccountId_key" ON "public"."Account"("provider", "providerAccountId");

-- -- AddForeignKey
-- ALTER TABLE "public"."Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- -- AddForeignKey
-- ALTER TABLE "public"."Token" ADD CONSTRAINT "Token_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- -- AddForeignKey
-- ALTER TABLE "public"."Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
