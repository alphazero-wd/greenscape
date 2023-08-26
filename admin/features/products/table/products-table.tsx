"use client";
import { Category } from "@/features/categories/types";
import {
  DataTable,
  DataTablePagination,
  DataTableViewOptions,
  Input,
  useTable,
} from "@/features/ui";
import React from "react";
import { CategoryGroup, Product, StatusGroup } from "../types";
import { CategoriesFilter } from "./categories-filter";
import { columns } from "./columns";
import { StatusFilter } from "./status-filter";

interface ProductsTableProps {
  products: Product[];
  count: number;
  categories: Category[];
  statusGroups: StatusGroup[];
  categoryGroups: CategoryGroup[];
}

export const ProductsTable: React.FC<ProductsTableProps> = ({
  count,
  products,
  categories,
  statusGroups,
  categoryGroups,
}) => {
  const { q, setQ, table } = useTable(columns, products, count);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex flex-1 items-center gap-x-2">
          <Input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search products..."
            className="h-8 w-[250px]"
          />
          <div className="flex items-center gap-x-3">
            <CategoriesFilter
              categoryGroups={categoryGroups}
              categories={categories}
            />
            <StatusFilter statusGroups={statusGroups} />
          </div>
        </div>
        <DataTableViewOptions table={table} />
      </div>
      <DataTable columns={columns} table={table} />
      <DataTablePagination table={table} />
    </div>
  );
};
