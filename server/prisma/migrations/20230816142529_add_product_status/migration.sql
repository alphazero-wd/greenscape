/*
  Warnings:

  - A unique constraint covering the columns `[name,productId,sizeId,colorId]` on the table `Variation` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Variation_name_productId_key";

-- DropIndex
DROP INDEX "Variation_productId_sizeId_colorId_key";

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "isPublic" BOOLEAN NOT NULL DEFAULT false;

-- CreateIndex
CREATE UNIQUE INDEX "Variation_name_productId_sizeId_colorId_key" ON "Variation"("name", "productId", "sizeId", "colorId");
