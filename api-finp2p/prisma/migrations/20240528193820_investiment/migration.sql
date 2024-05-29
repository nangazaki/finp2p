/*
  Warnings:

  - Added the required column `comporvativo` to the `investments` table without a default value. This is not possible if the table is not empty.
  - Made the column `updatedAt` on table `investments` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "investments" ADD COLUMN     "comporvativo" TEXT NOT NULL,
ALTER COLUMN "updatedAt" SET NOT NULL;
