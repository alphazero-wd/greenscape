"use client";
import {
  DataTable,
  DataTablePagination,
  DataTableViewOptions,
  Input,
  useTable,
} from "@/features/ui";
import React from "react";
import { Product } from "../types";
import { columns } from "./columns";

interface ProductsTableProps {
  products: Product[];
  count: number;
}

export const ProductsTable: React.FC<ProductsTableProps> = ({
  count,
  products,
}) => {
  const { q, setQ, table } = useTable(columns, products, count);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex flex-1 items-center space-x-2">
          <Input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search products..."
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
