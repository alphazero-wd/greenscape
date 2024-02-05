"use client";
import {
  Badge,
  Checkbox,
  CopyButton,
  DataTableColumnHeader,
  DataTableRowActions,
  useDeleteRecordsModal,
} from "@/features/ui";
import { formatPrice } from "@/features/utils";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { Product } from "../types";
import { PreviewButton } from "./preview-button";

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
    header: "Product",
    cell: ({ row }) => (
      <div className="line-clamp-2 max-w-xs font-medium">
        {row.getValue("name")}
      </div>
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
      <div className="mr-3 text-right">{formatPrice(row.original.price)}</div>
    ),
  },
  {
    id: "category",
    accessorKey: "category",
    header: () => <div>Category</div>,
    cell: ({ row }) => row.original.category.name,
  },
  {
    id: "inStock",
    accessorKey: "inStock",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="In Stock"
        className="justify-end"
      />
    ),
    cell: ({ row }) => <div className="text-right">{row.original.inStock}</div>,
  },
  {
    id: "orders",
    accessorKey: "orders",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Orders"
        className="justify-end"
      />
    ),
    cell: ({ row }) => (
      <div className="text-right">{row.original._count.orders}</div>
    ),
  },
  {
    id: "status",
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <Badge
        variant={row.original.status === "Active" ? "default" : "secondary"}
      >
        {row.original.status}
      </Badge>
    ),
  },

  {
    id: "createdAt",
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Created at" />
    ),
    cell: ({ row }) => (
      <div>{format(new Date(row.original.createdAt), "Pp")}</div>
    ),
  },
  {
    id: "updatedAt",
    accessorKey: "updatedAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Updated at" />
    ),
    cell: ({ row }) => (
      <div>{format(new Date(row.original.updatedAt), "Pp")}</div>
    ),
  },
  {
    id: "actions",
    header: () => <div className="text-right">Actions</div>,
    cell: ({ row }) => {
      const router = useRouter();
      const { onOpen: onDeleteOpen } = useDeleteRecordsModal();
      return (
        <div className="flex justify-end">
          <CopyButton text="Copy product name" content={row.original.name} />
          <PreviewButton id={row.original.id} />
          <DataTableRowActions
            row={row}
            onEditAction={() =>
              router.push(`/products/${row.original.id}/settings`)
            }
            onDeleteAction={onDeleteOpen}
          />
        </div>
      );
    },
  },
];
