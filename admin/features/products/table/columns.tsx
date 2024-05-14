"use client";
import { CopyButton } from "@/features/common/components";
import {
  DataTableColumnHeader,
  DataTableRowActions,
} from "@/features/common/data-table";
import { useDeleteRecordsModal } from "@/features/common/delete-records";
import { formatPrice } from "@/features/common/utils";
import { Badge } from "@/features/ui/badge";
import { Checkbox } from "@/features/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { generatePaths } from "../../categories/utils";
import { Button } from "../../ui/button";
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
    id: "images",
    accessorKey: "images",
    header: "",
    cell: ({ row }) => (
      <div className="h-16 w-16">
        <Image
          alt="Product image"
          className="aspect-square rounded-md object-cover"
          height="640"
          src={row.original.images[0].file.url}
          width="640"
        />
      </div>
    ),
  },
  {
    id: "name",
    accessorKey: "name",
    header: "Product",
    cell: ({ row }) => (
      <div className="line-clamp-3 whitespace-pre-wrap font-medium">
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
    cell: ({ row }) => {
      return row.original.categories.map((c) => (
        <Button
          asChild
          className="line-clamp-2 h-fit max-w-[128px] whitespace-pre-wrap p-0"
          variant="link"
        >
          <Link
            href={
              "/categories/" +
              generatePaths(c)
                .map((p) => p.slug)
                .join("/")
            }
          >
            {generatePaths(c)
              .map((p) => p.name)
              .join("/")}
          </Link>
        </Button>
      ));
    },
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
    cell: ({ row }) => (
      <div className="mr-3 text-right">{row.original.inStock}</div>
    ),
  },
  {
    id: "orders",
    accessorKey: "orders",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Sales"
        className="justify-end"
      />
    ),
    cell: ({ row }) => (
      <div className="mr-3 text-right">{row.original._count.orders}</div>
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
    id: "actions",
    header: () => <div className="text-right">Actions</div>,
    cell: ({ row }) => {
      const router = useRouter();
      const { onOpen: onDeleteOpen } = useDeleteRecordsModal();
      return (
        <div className="flex justify-end">
          <CopyButton text="Copy product name" content={row.original.name} />
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
