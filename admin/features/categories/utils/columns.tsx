"use client";

import { Button, Checkbox } from "@/features/ui";
import {
  DataTableColumnHeader,
  DataTableRowActions,
  useDeleteRecordsModal,
} from "@/features/ui/data-table";
import { EyeIcon } from "@heroicons/react/24/outline";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { useEditCategoryModal } from "../edit-category";
import { Category } from "../types";

export const columns: ColumnDef<Category>[] = [
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
      return <DataTableColumnHeader column={column} title="Category" />;
    },
    cell: ({ row }) => (
      <div className="line-clamp-1 font-medium">{row.original.name}</div>
    ),
  },
  {
    id: "products",
    accessorKey: "products",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        className="justify-end"
        title="Products"
      />
    ),
    cell: ({ row }) => (
      <div className="text-right">{row.original._count.products}</div>
    ),
  },
  {
    id: "subCategories",
    accessorKey: "subCategories",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        className="justify-end"
        title="Sub-categories"
      />
    ),
    cell: ({ row }) => (
      <div className="text-right">{row.original._count.subCategories}</div>
    ),
  },
  {
    id: "actions",
    header: () => <div className="text-right">Actions</div>,
    cell: ({ row }) => {
      const { onOpen: onEditOpen } = useEditCategoryModal();
      const { onOpen: onDeleteOpen } = useDeleteRecordsModal();
      return (
        <div className="flex items-center justify-end">
          {row.original._count.subCategories > 0 && (
            <Button variant="ghost" size="icon">
              <Link href={`/categories/${row.original.id}`}>
                <EyeIcon className="h-5 w-5" />
              </Link>
            </Button>
          )}
          <DataTableRowActions
            row={row}
            onEditAction={onEditOpen}
            onDeleteAction={onDeleteOpen}
          />
        </div>
      );
    },
  },
];
