/*
  Warnings:

  - The primary key for the `OrdersOnProducts` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "OrdersOnProducts" DROP CONSTRAINT "OrdersOnProducts_pkey",
ADD CONSTRAINT "OrdersOnProducts_pkey" PRIMARY KEY ("productId", "orderId");
