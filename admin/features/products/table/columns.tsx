"use client";

import { displayHierarchy } from "@/features/categories/utils";
import { ColorCircle } from "@/features/colors/circle";
import {
  Checkbox,
  CopyButton,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/features/ui";
import {
  DataTableColumnHeader,
  DataTableRowActions,
  useDeleteRecordsModal,
} from "@/features/ui/data-table";
import { GlobeAltIcon, LockClosedIcon } from "@heroicons/react/24/outline";
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
          title="Price range"
        />
      );
    },
    cell: ({ row }) => (
      <div className="mr-3 text-right">
        ${row.original.priceRange[0].toFixed(2)} - $
        {row.original.priceRange[1].toFixed(2)}
      </div>
    ),
  },
  {
    id: "category",
    accessorKey: "category",
    header: () => <div>Category</div>,
    cell: ({ row }) => displayHierarchy(row.original.category),
  },

  {
    id: "sizes",
    accessorKey: "sizes",
    header: "Sizes",
    cell: ({ row }) => row.original.sizes.map((size) => size.label).join(", "),
  },
  {
    id: "isPublic",
    accessorKey: "isPublic",
    header: "Status",
    cell: ({ row }) => (
      <div className="flex items-center gap-x-2">
        {row.original.isPublic ? (
          <>
            <GlobeAltIcon className="h-4 w-4 text-gray-500" />
            Public
          </>
        ) : (
          <>
            <LockClosedIcon className="h-4 w-4 text-gray-500" />
            Private
          </>
        )}
      </div>
    ),
  },
  {
    id: "colors",
    accessorKey: "colors",
    header: "Colors",
    cell: ({ row }) => (
      <div className="flex gap-x-2">
        {row.original.colors.map((color) => (
          <TooltipProvider key={color.id}>
            <Tooltip>
              <TooltipContent>{color.name}</TooltipContent>
              <TooltipTrigger>
                <ColorCircle color={color.hexCode} />
              </TooltipTrigger>
            </Tooltip>
          </TooltipProvider>
        ))}
      </div>
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
