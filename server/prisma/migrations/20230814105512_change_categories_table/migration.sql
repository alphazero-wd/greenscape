/*
  Warnings:

  - You are about to drop the column `parentCategoryId` on the `Category` table. All the data in the column will be lost.
  - You are about to drop the `_CategoryToProduct` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[name]` on the table `Category` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Category" DROP CONSTRAINT "Category_parentCategoryId_fkey";

-- DropForeignKey
ALTER TABLE "_CategoryToProduct" DROP CONSTRAINT "_CategoryToProduct_A_fkey";

-- DropForeignKey
ALTER TABLE "_CategoryToProduct" DROP CONSTRAINT "_CategoryToProduct_B_fkey";

-- DropIndex
DROP INDEX "Category_parentCategoryId_name_key";

-- AlterTable
ALTER TABLE "Category" DROP COLUMN "parentCategoryId";

-- DropTable
DROP TABLE "_CategoryToProduct";

-- CreateTable
CREATE TABLE "SubCategory" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(60) NOT NULL,
    "categoryId" INTEGER NOT NULL,

    CONSTRAINT "SubCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SubsubCategory" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(60) NOT NULL,
    "subCategoryId" INTEGER NOT NULL,

    CONSTRAINT "SubsubCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ProductToSubsubCategory" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "SubCategory_name_key" ON "SubCategory"("name");

-- CreateIndex
CREATE UNIQUE INDEX "SubsubCategory_name_key" ON "SubsubCategory"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_ProductToSubsubCategory_AB_unique" ON "_ProductToSubsubCategory"("A", "B");

-- CreateIndex
CREATE INDEX "_ProductToSubsubCategory_B_index" ON "_ProductToSubsubCategory"("B");

-- CreateIndex
CREATE UNIQUE INDEX "Category_name_key" ON "Category"("name");

-- AddForeignKey
ALTER TABLE "SubCategory" ADD CONSTRAINT "SubCategory_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubsubCategory" ADD CONSTRAINT "SubsubCategory_subCategoryId_fkey" FOREIGN KEY ("subCategoryId") REFERENCES "SubCategory"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductToSubsubCategory" ADD CONSTRAINT "_ProductToSubsubCategory_A_fkey" FOREIGN KEY ("A") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductToSubsubCategory" ADD CONSTRAINT "_ProductToSubsubCategory_B_fkey" FOREIGN KEY ("B") REFERENCES "SubsubCategory"("id") ON DELETE CASCADE ON UPDATE CASCADE;
