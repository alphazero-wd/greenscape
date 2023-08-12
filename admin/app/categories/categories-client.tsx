"use client";
import { useCategoriesStore } from "@/features/categories/context";
import { CreateCategoryButton } from "@/features/categories/create-category";
import { EditCategoryModal } from "@/features/categories/edit-category";
import { Category } from "@/features/categories/types";
import { columns } from "@/features/categories/utils";
import { DataTable, DeleteRecordsModal } from "@/features/ui";
import { useEffect } from "react";

interface CategoriesPageClientProps {
  data: Category[];
}

export const CategoriesPageClient: React.FC<CategoriesPageClientProps> = ({
  data,
}) => {
  const { categories, findCategories, deleteCategories } = useCategoriesStore();

  useEffect(() => {
    findCategories(data);
  }, [data]);

  return (
    <>
      <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
        Categories ({categories.length})
      </h1>

      <div className="mt-3">
        <CreateCategoryButton />
      </div>

      <div className="mt-6 space-y-8">
        <DataTable
          entityName="categories"
          data={categories}
          columns={columns}
        />
      </div>

      <DeleteRecordsModal entityName="categories" updateUI={deleteCategories} />
      <EditCategoryModal />
    </>
  );
};
