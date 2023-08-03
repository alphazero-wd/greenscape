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
import { Loader2 } from "lucide-react";
import { useDeleteSelectedRows } from "../../ui/data-table/use-delete-selected-rows";
import { useDeleteCategoryModal } from "./use-delete-category-modal";

interface DeleteCategoryModalProps {
  categoryName: string;
  categoryId: number;
}

export const DeleteCategoryModal: React.FC<DeleteCategoryModalProps> = ({
  categoryName,
  categoryId,
}) => {
  const { isOpen, onClose } = useDeleteCategoryModal();
  const { loading, deleteSelectedRows } = useDeleteSelectedRows([categoryId]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete category</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete category{" "}
            <strong className="font-bold">{categoryName}</strong>?
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
              onClick={async () => await deleteSelectedRows("categories")}
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
