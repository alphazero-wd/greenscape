"use client";
import { useCategoriesStore } from "@/features/categories/context";
import { CreateCategoryButton } from "@/features/categories/create-category";
import { EditCategoryModal } from "@/features/categories/edit-category";
import { Category } from "@/features/categories/types";
import { columns } from "@/features/categories/utils";
import { Input } from "@/features/ui";
import {
  DataTable,
  DataTablePagination,
  DataTableViewOptions,
  DeleteRecordsModal,
  useTable,
} from "@/features/ui/data-table";
import { useEffect } from "react";

interface CategoriesPageClientProps {
  count: number;
  data: Category[];
}

export const CategoriesPageClient: React.FC<CategoriesPageClientProps> = ({
  count: hits,
  data,
}) => {
  const { categories, getCategories, count, deleteCategories } =
    useCategoriesStore();

  const { loading, q, setQ, table } = useTable<Category>(
    columns,
    categories,
    hits,
    getCategories,
    "categories",
  );

  useEffect(() => {
    getCategories(hits, data);
  }, [data, hits]);

  if (loading) return <div>Loading...</div>;

  return (
    <>
      <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
        Categories ({count})
      </h1>

      <div className="mt-3">
        <CreateCategoryButton />
      </div>

      <div className="mt-6 space-y-8">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex flex-1 items-center space-x-2">
              <Input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search categories..."
                className="h-8 w-[250px]"
              />
            </div>
            <DataTableViewOptions table={table} />
          </div>
          <DataTable columns={columns} table={table} />
          <DataTablePagination table={table} />
        </div>
      </div>

      <EditCategoryModal />
      <DeleteRecordsModal entityName="categories" updateUI={deleteCategories} />
    </>
  );
};
