"use client";

import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
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

interface DeleteRecordModalProps {
  entityName: "categories" | "sizes" | "colors";
}

export const DeleteRecordsModal = ({ entityName }: DeleteRecordModalProps) => {
  const router = useRouter();
  const { isOpen, onClose, ids } = useDeleteRecordsModal();
  const { loading, deleteRecords } = useDeleteRecords();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete records confirmation</DialogTitle>
          <DialogDescription>
            {ids.length} items will be deleted
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
              onClick={() =>
                deleteRecords(entityName).then(() => router.refresh())
              }
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
