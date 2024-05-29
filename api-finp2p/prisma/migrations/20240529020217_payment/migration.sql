/*
  Warnings:

  - Added the required column `comprovativo` to the `paymentInstallments` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "paymentInstallments" ADD COLUMN     "comprovativo" TEXT NOT NULL;
