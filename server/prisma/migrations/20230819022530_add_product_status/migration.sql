-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "isPublic" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Variant" ALTER COLUMN "price" SET DEFAULT 0,
ALTER COLUMN "inStock" SET DEFAULT 0;
