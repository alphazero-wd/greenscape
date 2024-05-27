/*
  Warnings:

  - Added the required column `cardLast4` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cardType` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tax` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "cardLast4" TEXT NOT NULL,
ADD COLUMN     "cardType" TEXT NOT NULL,
ADD COLUMN     "tax" INTEGER NOT NULL;
