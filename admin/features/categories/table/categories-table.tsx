"use client";
import { DataTable } from "@/features/common/data-table/data-table";
import { DataTablePagination } from "@/features/common/data-table/pagination";
import { useTable } from "@/features/common/data-table/use-table";
import { DataTableViewOptions } from "@/features/common/data-table/view-options";
import { Input } from "@/features/ui/input";
import React from "react";
import { Category } from "../types";
import { columns } from "./columns";

interface CategoriesTableProps {
  categories: Category[];
  count: number;
}

export const CategoriesTable: React.FC<CategoriesTableProps> = ({
  categories,
  count,
}) => {
  const { q, setQ, table } = useTable(columns, categories, count);

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
