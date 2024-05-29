-- CreateTable
CREATE TABLE "ReferencePayment" (
    "id" TEXT NOT NULL,
    "reference" TEXT NOT NULL,
    "wasPaid" BOOLEAN NOT NULL DEFAULT false,
    "userId" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,

    CONSTRAINT "ReferencePayment_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ReferencePayment" ADD CONSTRAINT "ReferencePayment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReferencePayment" ADD CONSTRAINT "ReferencePayment_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "projects"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
