/*
  Warnings:

  - You are about to drop the `SubCategory` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SubsubCategory` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ProductToSubsubCategory` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[parentCategoryId,name]` on the table `Category` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "SubCategory" DROP CONSTRAINT "SubCategory_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "SubsubCategory" DROP CONSTRAINT "SubsubCategory_subCategoryId_fkey";

-- DropForeignKey
ALTER TABLE "_ProductToSubsubCategory" DROP CONSTRAINT "_ProductToSubsubCategory_A_fkey";

-- DropForeignKey
ALTER TABLE "_ProductToSubsubCategory" DROP CONSTRAINT "_ProductToSubsubCategory_B_fkey";

-- DropIndex
DROP INDEX "Category_name_key";

-- AlterTable
ALTER TABLE "Category" ADD COLUMN     "parentCategoryId" INTEGER;

-- DropTable
DROP TABLE "SubCategory";

-- DropTable
DROP TABLE "SubsubCategory";

-- DropTable
DROP TABLE "_ProductToSubsubCategory";

-- CreateTable
CREATE TABLE "_CategoryToProduct" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_CategoryToProduct_AB_unique" ON "_CategoryToProduct"("A", "B");

-- CreateIndex
CREATE INDEX "_CategoryToProduct_B_index" ON "_CategoryToProduct"("B");

-- CreateIndex
CREATE UNIQUE INDEX "Category_parentCategoryId_name_key" ON "Category"("parentCategoryId", "name");

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_parentCategoryId_fkey" FOREIGN KEY ("parentCategoryId") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryToProduct" ADD CONSTRAINT "_CategoryToProduct_A_fkey" FOREIGN KEY ("A") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryToProduct" ADD CONSTRAINT "_CategoryToProduct_B_fkey" FOREIGN KEY ("B") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
