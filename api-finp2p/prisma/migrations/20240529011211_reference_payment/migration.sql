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
    "amount" DOUBLE PRECISION NOT NULL,
    "referencePaymentFromProjectToSystemId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "paymentInstallments_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ReferencePaymentFromProjectToSystem_reference_key" ON "ReferencePaymentFromProjectToSystem"("reference");

-- CreateIndex
CREATE UNIQUE INDEX "ReferencePaymentFromProjectToSystem_projectId_key" ON "ReferencePaymentFromProjectToSystem"("projectId");

-- AddForeignKey
ALTER TABLE "ReferencePaymentFromProjectToSystem" ADD CONSTRAINT "ReferencePaymentFromProjectToSystem_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "projects"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "paymentInstallments" ADD CONSTRAINT "paymentInstallments_referencePaymentFromProjectToSystemId_fkey" FOREIGN KEY ("referencePaymentFromProjectToSystemId") REFERENCES "ReferencePaymentFromProjectToSystem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
