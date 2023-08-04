"use client";

import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/features/ui";
import { useDeleteSelectedRows } from "@/features/ui/data-table/use-delete-selected-rows";
import { Loader2 } from "lucide-react";
import { useDeleteSizeModal } from "./use-delete-size-modal";

interface DeleteCategoryModalProps {
  sizeLabel: string;
  sizeId: number;
}

export const DeleteSizeModal: React.FC<DeleteCategoryModalProps> = ({
  sizeLabel,
  sizeId,
}) => {
  const { isOpen, onClose } = useDeleteSizeModal();
  const { loading, deleteSelectedRows } = useDeleteSelectedRows([sizeId]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete size</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete size{" "}
            <strong className="font-bold">{sizeLabel}</strong>?
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
              onClick={async () => await deleteSelectedRows("sizes")}
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
