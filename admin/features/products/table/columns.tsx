"use client";

import { Checkbox, CopyButton } from "@/features/ui";
import {
  DataTableColumnHeader,
  DataTableRowActions,
  useDeleteRecordsModal,
} from "@/features/ui/data-table";
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
      return <DataTableColumnHeader column={column} title="Product" />;
    },
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("name")}</div>
    ),
  },
  {
    id: "price",
    accessorKey: "price",
    header: ({ column }) => {
      return (
        <DataTableColumnHeader
          column={column}
          className="justify-end"
          title="Price"
        />
      );
    },
    cell: ({ row }) => (
      <div className="mr-3 text-right">${row.original.price}</div>
    ),
  },
  {
    id: "category",
    accessorKey: "category",
    header: () => <div>Category</div>,
    cell: ({ row }) => row.original.category.name,
  },
  {
    id: "isPublic",
    accessorKey: "isPublic",
    header: "Status",
    cell: ({ row }) => (
      <div className="flex items-center gap-x-2">{row.original.status}</div>
    ),
  },
  {
    id: "actions",
    header: () => <div className="text-right">Actions</div>,
    cell: ({ row }) => {
      const { onOpen: onDeleteOpen } = useDeleteRecordsModal();
      return (
        <div className="flex justify-end">
          <CopyButton text={row.original.name} />
          <DataTableRowActions
            row={row}
            onEditAction={() => {}}
            onDeleteAction={onDeleteOpen}
          />
        </div>
      );
    },
  },
];
