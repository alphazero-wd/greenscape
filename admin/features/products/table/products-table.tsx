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
import { CategoryGroup, InStockGroup, Product, StatusGroup } from "../types";
import { CategoriesFilter } from "./categories-filter";
import { columns } from "./columns";
import { InStockFilter } from "./in-stock-filter";
import { PriceFilter } from "./price-filter";
import { StatusFilter } from "./status-filter";

interface ProductsTableProps {
  products: Product[];
  count: number;
  categories: Category[];
  statusGroups: StatusGroup[];
  categoryGroups: CategoryGroup[];
  priceRange: [string, string];
  inStockGroups: InStockGroup[];
}

export const ProductsTable: React.FC<ProductsTableProps> = ({
  count,
  products,
  categories,
  statusGroups,
  categoryGroups,
  priceRange,
  inStockGroups,
}) => {
  const { q, setQ, table } = useTable(columns, products, count);

  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <div className="flex flex-col gap-x-2 gap-y-4 lg:flex-1 lg:flex-row lg:items-center">
          <Input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search products..."
            className="h-8 w-[250px]"
          />
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
            <CategoriesFilter
              categoryGroups={categoryGroups}
              categories={categories}
            />
            <StatusFilter statusGroups={statusGroups} />
            <PriceFilter priceRange={priceRange} />
            <InStockFilter inStockGroups={inStockGroups} />
          </div>
        </div>
        <DataTableViewOptions table={table} />
      </div>
      <DataTable columns={columns} table={table} />
      <DataTablePagination table={table} />
    </div>
  );
};
