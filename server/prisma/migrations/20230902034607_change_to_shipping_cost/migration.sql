/*
  Warnings:

  - You are about to drop the column `shippingOption` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `total` on the `Order` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Order" DROP COLUMN "shippingOption",
DROP COLUMN "total",
ADD COLUMN     "amount" MONEY NOT NULL DEFAULT 0,
ADD COLUMN     "shippingCost" MONEY NOT NULL DEFAULT 0;
