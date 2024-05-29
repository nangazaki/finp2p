-- CreateEnum
CREATE TYPE "AccountType" AS ENUM ('particular', 'state_owned', 'financial');

-- CreateEnum
CREATE TYPE "ProjectCollectionMethod" AS ENUM ('donation', 'investment');

-- CreateEnum
CREATE TYPE "ProjectStatus" AS ENUM ('progress', 'concluded');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "isAdmin" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "accountType" "AccountType",
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "entities" (
    "id" TEXT NOT NULL,
    "nif" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "ministry" TEXT,
    "userId" TEXT NOT NULL,

    CONSTRAINT "entities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "projects" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "local" TEXT NOT NULL,
    "status" "ProjectStatus" NOT NULL,
    "collectionMethod" "ProjectCollectionMethod" NOT NULL,
    "amountRequired" DOUBLE PRECISION NOT NULL,
    "amountCollected" DOUBLE PRECISION NOT NULL,
    "rejectionReason" TEXT,
    "isApproved" BOOLEAN NOT NULL DEFAULT false,
    "entityId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "projects_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "project_operataions" (
    "id" TEXT NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "projectId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "project_operataions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "investments" (
    "id" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "comporvativo" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "investments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReferencePayment" (
    "id" TEXT NOT NULL,
    "reference" INTEGER NOT NULL,
    "wasPaid" BOOLEAN NOT NULL DEFAULT false,
    "amount" DOUBLE PRECISION NOT NULL,
    "userId" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,

    CONSTRAINT "ReferencePayment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReferencePaymentFromProjectToSystem" (
    "id" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "reference" INTEGER NOT NULL,
    "projectId" TEXT NOT NULL,

    CONSTRAINT "ReferencePaymentFromProjectToSystem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "paymentInstallments" (
    "id" SERIAL NOT NULL,
    "comprovativo" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "referencePaymentFromProjectToSystemId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "paymentInstallments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Feedback" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "message" TEXT NOT NULL,

    CONSTRAINT "Feedback_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "entities_nif_key" ON "entities"("nif");

-- CreateIndex
CREATE UNIQUE INDEX "entities_email_key" ON "entities"("email");

-- CreateIndex
CREATE UNIQUE INDEX "entities_userId_key" ON "entities"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "investments_projectId_key" ON "investments"("projectId");

-- CreateIndex
CREATE UNIQUE INDEX "investments_userId_key" ON "investments"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "ReferencePayment_reference_key" ON "ReferencePayment"("reference");

-- CreateIndex
CREATE UNIQUE INDEX "ReferencePaymentFromProjectToSystem_reference_key" ON "ReferencePaymentFromProjectToSystem"("reference");

-- CreateIndex
CREATE UNIQUE INDEX "ReferencePaymentFromProjectToSystem_projectId_key" ON "ReferencePaymentFromProjectToSystem"("projectId");

-- AddForeignKey
ALTER TABLE "entities" ADD CONSTRAINT "entities_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "projects" ADD CONSTRAINT "projects_entityId_fkey" FOREIGN KEY ("entityId") REFERENCES "entities"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project_operataions" ADD CONSTRAINT "project_operataions_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "projects"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "investments" ADD CONSTRAINT "investments_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "investments" ADD CONSTRAINT "investments_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "projects"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReferencePayment" ADD CONSTRAINT "ReferencePayment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReferencePayment" ADD CONSTRAINT "ReferencePayment_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "projects"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReferencePaymentFromProjectToSystem" ADD CONSTRAINT "ReferencePaymentFromProjectToSystem_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "projects"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "paymentInstallments" ADD CONSTRAINT "paymentInstallments_referencePaymentFromProjectToSystemId_fkey" FOREIGN KEY ("referencePaymentFromProjectToSystemId") REFERENCES "ReferencePaymentFromProjectToSystem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
