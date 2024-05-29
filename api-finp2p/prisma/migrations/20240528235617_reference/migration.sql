/*
  Warnings:

  - A unique constraint covering the columns `[reference]` on the table `ReferencePayment` will be added. If there are existing duplicate values, this will fail.
  - Changed the type of `reference` on the `ReferencePayment` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "ReferencePayment" DROP COLUMN "reference",
ADD COLUMN     "reference" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "ReferencePayment_reference_key" ON "ReferencePayment"("reference");
