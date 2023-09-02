/*
  Warnings:

  - You are about to drop the column `shippingCost` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `subtotal` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `tax` on the `Order` table. All the data in the column will be lost.
  - Added the required column `shippingOption` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Order" DROP COLUMN "shippingCost",
DROP COLUMN "subtotal",
DROP COLUMN "tax",
ADD COLUMN     "shippingOption" TEXT NOT NULL;
