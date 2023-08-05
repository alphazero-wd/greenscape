"use client";

import { Button, Checkbox, DataTableColumnHeader } from "@/features/ui";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { Edit } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ColorCircle } from "../color-circle";
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
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Color" />
    ),
    cell: ({ row }) => (
      <div className="line-clamp-1 font-medium">{row.getValue("name")}</div>
    ),
  },
  {
    accessorKey: "hexCode",
    header: "Hex code",
    cell: ({ row }) => (
      <div className="flex w-full items-center justify-between gap-x-3">
        {row.getValue("hexCode")}
        <ColorCircle hexCode={row.getValue("hexCode")} />
      </div>
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
      const pathname = usePathname();

      return (
        <Button variant="ghost" size="icon">
          <Link href={pathname + `/${row.original.id}`}>
            <Edit className="h-4 w-4" />
          </Link>
        </Button>
      );
    },
  },
];
