/*
  Warnings:

  - You are about to drop the column `cardLast4` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `cardType` on the `Order` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Order" DROP COLUMN "cardLast4",
DROP COLUMN "cardType";
