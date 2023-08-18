"use client";

import { Checkbox } from "@/features/ui";
import { DataTableColumnHeader } from "@/features/ui/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { Product } from "../types";

export const columns: ColumnDef<Product>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: "name",
    accessorKey: "name",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Product name" />;
    },
    cell: ({ row }) => (
      <div className="line-clamp-1 font-medium">{row.getValue("name")}</div>
    ),
  },
  {
    id: "desc",
    accessorKey: "desc",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Description" />;
    },
    cell: ({ row }) => (
      <div className="line-clamp-1 font-medium">{row.getValue("name")}</div>
    ),
  },
  {
    id: "price",
    accessorKey: "price",
    header: ({ column }) => {
      return (
        <DataTableColumnHeader
          column={column}
          className="text-right"
          title="Price range"
        />
      );
    },
    cell: ({ row }) => (
      <div className="text-right">
        {row.original.priceRange[0]} - {row.original.priceRange[1]}
      </div>
    ),
  },
];
