"use client";

import { Loader2 } from "lucide-react";
import { Button } from "../button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../dialog";
import { useDeleteRecords } from "./use-delete-records";
import { useDeleteRecordsModal } from "./use-delete-records-modal";

interface DeleteRecordModalProps<TData extends { id: number; name: string }> {
  records: TData[];
  entityName: "categories" | "sizes" | "products" | "colors" | "billboards";
}

export const DeleteRecordsModal = <TData extends { id: number; name: string }>({
  records,
  entityName,
}: DeleteRecordModalProps<TData>) => {
  const { isOpen, onClose } = useDeleteRecordsModal();
  const { loading, deleteSelectedRows } = useDeleteRecords(
    records.map((record) => record.id),
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete records confirmation</DialogTitle>
          <DialogDescription>
            These following records will be removed:
            <div>
              {records.map((record) => (
                <div className="font-bold">{record.name}</div>
              ))}
            </div>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <div className="flex items-center justify-end gap-x-4">
            <Button
              onClick={onClose}
              disabled={loading}
              type="button"
              variant="outline"
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={async () => await deleteSelectedRows(entityName)}
              disabled={loading}
            >
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Confirm
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
