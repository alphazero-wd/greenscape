/*
  Warnings:

  - The primary key for the `File` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `filename` on the `File` table. All the data in the column will be lost.
  - You are about to drop the column `mimetype` on the `File` table. All the data in the column will be lost.
  - You are about to drop the column `path` on the `File` table. All the data in the column will be lost.
  - Added the required column `url` to the `File` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "File" DROP CONSTRAINT "File_productId_fkey";

-- AlterTable
ALTER TABLE "File" DROP CONSTRAINT "File_pkey",
DROP COLUMN "filename",
DROP COLUMN "mimetype",
DROP COLUMN "path",
ADD COLUMN     "url" TEXT NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "File_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "File_id_seq";

-- AddForeignKey
ALTER TABLE "File" ADD CONSTRAINT "File_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
