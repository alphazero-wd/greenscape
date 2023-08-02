"use client";

import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { Category } from "../types";

export const columns: ColumnDef<Category>[] = [
  {
    accessorKey: "name",
    header: "Category",
    cell: ({ row }) => (
      <div className="line-clamp-1 font-medium">{row.getValue("name")}</div>
    ),
  },
  {
    accessorKey: "createdAt",
    header: "Created at",
    cell: ({ row }) => (
      <div className="text-sm text-gray-500">
        {format(new Date(row.getValue("createdAt")), "d MMM Y")}
      </div>
    ),
  },
  {
    accessorKey: "updatedAt",
    header: "Updated at",
    cell: ({ row }) => (
      <div className="text-sm text-gray-500">
        {format(new Date(row.getValue("updatedAt")), "d MMM Y")}
      </div>
    ),
  },
];
