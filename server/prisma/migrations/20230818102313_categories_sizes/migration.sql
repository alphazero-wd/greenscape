-- CreateTable
CREATE TABLE "_CategoryToSize" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_CategoryToSize_AB_unique" ON "_CategoryToSize"("A", "B");

-- CreateIndex
CREATE INDEX "_CategoryToSize_B_index" ON "_CategoryToSize"("B");

-- AddForeignKey
ALTER TABLE "_CategoryToSize" ADD CONSTRAINT "_CategoryToSize_A_fkey" FOREIGN KEY ("A") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryToSize" ADD CONSTRAINT "_CategoryToSize_B_fkey" FOREIGN KEY ("B") REFERENCES "Size"("id") ON DELETE CASCADE ON UPDATE CASCADE;
