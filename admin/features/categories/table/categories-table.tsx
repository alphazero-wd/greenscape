import {
  DataTable,
  DataTablePagination,
  DataTableViewOptions,
  Input,
  useTable,
} from "@/features/ui";
import React from "react";
import { Category } from "../types";
import { columns } from "../utils";

interface CategoriesTableProps {
  categories: Category[];
  hits: number;
  getCategories: (count: number, categories: Category[]) => void;
  pid: number | null;
}

export const CategoriesTable: React.FC<CategoriesTableProps> = ({
  categories,
  hits,
  getCategories,
  pid,
}) => {
  const { loading, q, setQ, table } = useTable<Category>(
    columns,
    categories,
    hits,
    getCategories,
    pid,
  );
  if (loading) return <div>Loading...</div>;
  return (
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
  );
};
