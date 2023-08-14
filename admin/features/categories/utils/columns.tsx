"use client";

import { Checkbox } from "@/features/ui";
import {
  DataTableColumnHeader,
  DataTableRowActions,
  useDeleteRecordsModal,
} from "@/features/ui/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { useCategoriesStore } from "../context";
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
    id: "Category",
    accessorKey: "name",
    header: ({ column }) => {
      const { getCategories } = useCategoriesStore();
      return (
        <DataTableColumnHeader
          getData={getCategories}
          column={column}
          title="Category"
        />
      );
    },
    cell: ({ row }) => (
      <>
        <div className="line-clamp-1 font-medium">
          {row.original.parentCategory && (
            <span className="font-normal text-gray-500">
              {row.original.parentCategory.name} /
            </span>
          )}{" "}
          {row.original.name}
        </div>
        <ul className="ml-2 mt-2 space-y-3 text-gray-600">
          {row.original.subCategories.map((c) => (
            <li>- {c.name}</li>
          ))}
        </ul>
      </>
    ),
  },
  {
    id: "Products",
    accessorKey: "products",
    header: () => <div className="text-right">Products</div>,
    cell: ({ row }) => (
      <div className="text-right">{row.original._count.products}</div>
    ),
  },
  {
    id: "Sub-categories",
    accessorKey: "subCategories",
    header: () => <div className="text-right">Sub-categories</div>,
    cell: ({ row }) => (
      <div className="text-right">{row.original._count.subCategories}</div>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const { onOpen: onEditOpen } = useEditCategoryModal();
      const { onOpen: onDeleteOpen } = useDeleteRecordsModal();
      return (
        <DataTableRowActions
          row={row}
          onEditAction={onEditOpen}
          onDeleteAction={onDeleteOpen}
        />
      );
    },
  },
];
