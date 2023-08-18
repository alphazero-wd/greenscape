"use client";

import { Checkbox, CopyButton } from "@/features/ui";
import {
  DataTableColumnHeader,
  DataTableRowActions,
  useDeleteRecordsModal,
} from "@/features/ui/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { ColorCircle } from "../circle";
import { useEditColorModal } from "../edit-color";
import { Color } from "../types";

export const columns: ColumnDef<Color>[] = [
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
      return <DataTableColumnHeader column={column} title="Color name" />;
    },
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("name")}</div>
    ),
  },
  {
    id: "hexCode",
    accessorKey: "hexCode",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Hex code" />;
    },
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("hexCode")}</div>
    ),
  },
  {
    id: "color",
    cell: ({ row }) => <ColorCircle color={row.original.hexCode} />,
  },

  {
    id: "actions",
    header: () => <div className="text-right">Actions</div>,
    cell: ({ row }) => {
      const { onOpen: onEditOpen } = useEditColorModal();
      const { onOpen: onDeleteOpen } = useDeleteRecordsModal();
      return (
        <div className="flex justify-end">
          <CopyButton text={row.original.hexCode} />
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
