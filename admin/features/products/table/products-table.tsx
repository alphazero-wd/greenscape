"use client";
import { Category } from "@/features/categories/types";
import {
  Button,
  DataTable,
  DataTablePagination,
  DataTableViewOptions,
  Input,
  useTable,
} from "@/features/ui";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";
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
  inStockGroups: InStockGroup[];
}

export const ProductsTable: React.FC<ProductsTableProps> = ({
  count,
  products,
  categories,
  statusGroups,
  categoryGroups,
  inStockGroups,
}) => {
  const { q, setQ, table } = useTable(columns, products, count);
  const searchParams = useSearchParams();
  const router = useRouter();
  const reset = () => {
    const currentQuery = qs.parse(searchParams.toString());
    delete currentQuery.price;
    delete currentQuery.inStock;
    delete currentQuery.categoryIds;
    delete currentQuery.status;
    delete currentQuery.q;
    table.resetPageIndex();
    const resetQuery = qs.stringifyUrl({
      url: "/products",
      query: currentQuery,
    });
    router.push(resetQuery);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <div className="flex flex-col items-center gap-x-2 gap-y-4 lg:flex-1 lg:flex-row">
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
              table={table}
            />
            <StatusFilter table={table} statusGroups={statusGroups} />
            <PriceFilter table={table} />
            <InStockFilter table={table} inStockGroups={inStockGroups} />
            {(searchParams.get("price") ||
              searchParams.get("inStock") ||
              searchParams.get("categoryIds") ||
              searchParams.get("q") ||
              searchParams.get("status")) && (
              <Button
                variant="ghost"
                onClick={reset}
                className="h-8 px-2 lg:px-3"
              >
                Reset
                <XMarkIcon className="ml-2 h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
        <DataTableViewOptions table={table} />
      </div>
      <DataTable columns={columns} table={table} />
      <DataTablePagination table={table} />
    </div>
  );
};
