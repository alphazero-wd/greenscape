"use client";

import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import { Row } from "@tanstack/react-table";
import { Button } from "../button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../tooltip";

interface DataTableRowActionsProps<TData extends { id: number }> {
  row: Row<TData>;
  onEditAction: (data: TData) => void;
  onDeleteAction: (ids: number[]) => void;
}

export function DataTableRowActions<TData extends { id: number }>({
  row,
  onDeleteAction,
  onEditAction,
}: DataTableRowActionsProps<TData>) {
  return (
    <div className="flex items-center justify-end gap-x-2">
      <TooltipProvider>
        <Tooltip>
          <TooltipContent>Edit</TooltipContent>
          <TooltipTrigger asChild>
            <Button
              onClick={() => {
                onEditAction(row.original);
              }}
              variant="ghost"
              size="icon"
            >
              <PencilSquareIcon className="h-5 w-5" />
            </Button>
          </TooltipTrigger>
        </Tooltip>
      </TooltipProvider>

      <TooltipProvider>
        <Tooltip>
          <TooltipContent>Delete</TooltipContent>
          <TooltipTrigger asChild>
            <Button
              onClick={() => onDeleteAction([row.original.id])}
              variant="destructive"
              size="icon"
            >
              <TrashIcon className="h-5 w-5" />
            </Button>
          </TooltipTrigger>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}
