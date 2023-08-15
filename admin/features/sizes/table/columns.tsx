"use client";

import { Checkbox, CopyButton } from "@/features/ui";
import {
  DataTableColumnHeader,
  DataTableRowActions,
  useDeleteRecordsModal,
} from "@/features/ui/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { useEditSizeModal } from "../edit-size";
import { Size } from "../types";

export const columns: ColumnDef<Size>[] = [
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
    id: "label",
    accessorKey: "label",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Size" />;
    },
    cell: ({ row }) => (
      <div className="line-clamp-1 font-medium">{row.getValue("label")}</div>
    ),
  },
  {
    id: "actions",
    header: () => <div className="text-right">Actions</div>,
    cell: ({ row }) => {
      const { onOpen: onEditOpen } = useEditSizeModal();
      const { onOpen: onDeleteOpen } = useDeleteRecordsModal();
      return (
        <div className="flex justify-end">
          <CopyButton text={row.original.label} />
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
