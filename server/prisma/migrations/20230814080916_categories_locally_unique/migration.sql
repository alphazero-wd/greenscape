/*
  Warnings:

  - A unique constraint covering the columns `[parentCategoryId,name]` on the table `Category` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Category_name_key";

-- CreateIndex
CREATE UNIQUE INDEX "Category_parentCategoryId_name_key" ON "Category"("parentCategoryId", "name");
