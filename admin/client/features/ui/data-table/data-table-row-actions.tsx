"use client";

import { TrashIcon } from "@heroicons/react/24/outline";
import { Row } from "@tanstack/react-table";
import { Edit } from "lucide-react";
import { Button } from "../button";

interface DataTableRowActionsProps<TData extends { id: number }> {
  row: Row<TData>;
  onEditAction: (id: number) => void;
  onDeleteAction: (ids: number[]) => void;
}

export function DataTableRowActions<TData extends { id: number }>({
  row,
  onDeleteAction,
  onEditAction,
}: DataTableRowActionsProps<TData>) {
  return (
    <div className="flex items-center gap-x-4">
      <Button
        onClick={() => {
          onEditAction(row.original.id);
        }}
        variant="ghost"
        size="icon"
      >
        <Edit className="h-4 w-4" />
      </Button>

      <Button
        onClick={() => onDeleteAction([row.original.id])}
        variant="destructive"
        size="icon"
      >
        <TrashIcon className="h-4 w-4" />
      </Button>
    </div>
  );
}
