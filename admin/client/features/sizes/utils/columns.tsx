"use client";

import {
  Checkbox,
  DataTableColumnHeader,
  DataTableRowActions,
  useDeleteRecordsModal,
} from "@/features/ui";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { useEditSizeModal } from "../edit-size";
import { Size } from "../types";

export const columns: ColumnDef<Omit<Size, "label"> & { name: string }>[] = [
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
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Label" />
    ),
    cell: ({ row }) => (
      <div className="line-clamp-1 font-medium">{row.getValue("name")}</div>
    ),
  },
  {
    accessorKey: "createdAt",
    header: "Created at",
    cell: ({ row }) => (
      <div className="text-sm text-gray-500">
        {format(new Date(row.getValue("createdAt")), "PP p")}
      </div>
    ),
  },
  {
    accessorKey: "updatedAt",
    header: "Updated at",
    cell: ({ row }) => (
      <div className="text-sm text-gray-500">
        {format(new Date(row.getValue("updatedAt")), "PP p")}
      </div>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const { onOpen: onEditOpen } = useEditSizeModal();
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
