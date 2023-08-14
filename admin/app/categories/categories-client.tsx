"use client";
import { useCategoriesStore } from "@/features/categories/context";
import { CreateCategoryButton } from "@/features/categories/create-category";
import { EditCategoryModal } from "@/features/categories/edit-category";
import { CategoriesTable } from "@/features/categories/table";
import { Category } from "@/features/categories/types";
import { DeleteRecordsModal } from "@/features/ui/data-table";
import { useEffect } from "react";

interface CategoriesPageClientProps {
  count: number;
  data: Category[];
}

export const CategoriesPageClient: React.FC<CategoriesPageClientProps> = ({
  count: hits,
  data,
}) => {
  const { categories, getCategories, count } = useCategoriesStore();

  useEffect(() => {
    getCategories(hits, data);
  }, [data, hits]);

  return (
    <>
      <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
        Categories ({count})
      </h1>

      <div className="mt-3">
        <CreateCategoryButton />
      </div>

      <div className="mt-6 space-y-8">
        <CategoriesTable
          categories={categories}
          pid={null}
          hits={count}
          getCategories={getCategories}
        />
      </div>

      <EditCategoryModal />
      <DeleteRecordsModal entityName="categories" />
    </>
  );
};
