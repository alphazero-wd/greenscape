/*
  Warnings:

  - You are about to alter the column `name` on the `Store` table. The data in that column could be lost. The data in that column will be cast from `VarChar(64)` to `VarChar(30)`.

*/
-- AlterTable
ALTER TABLE "Store" ALTER COLUMN "name" SET DATA TYPE VARCHAR(30);

-- CreateTable
CREATE TABLE "Size" (
    "id" SERIAL NOT NULL,
    "label" VARCHAR(20) NOT NULL,
    "desc" TEXT,
    "storeId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Size_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Color" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(20) NOT NULL,
    "hexCode" VARCHAR(7) NOT NULL,
    "storeId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Color_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Size_storeId_label_key" ON "Size"("storeId", "label");

-- CreateIndex
CREATE UNIQUE INDEX "Color_storeId_hexCode_name_key" ON "Color"("storeId", "hexCode", "name");

-- AddForeignKey
ALTER TABLE "Size" ADD CONSTRAINT "Size_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "Store"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Color" ADD CONSTRAINT "Color_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "Store"("id") ON DELETE CASCADE ON UPDATE CASCADE;
