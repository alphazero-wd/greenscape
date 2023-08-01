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
import { useDeleteStore, useDeleteStoreModal } from "../hooks";

interface DeleteStoreModalProps {
  storeName: string;
  storeId: number;
}

export const DeleteStoreModal: React.FC<DeleteStoreModalProps> = ({
  storeName,
  storeId,
}) => {
  const { loading, deleteStore } = useDeleteStore(storeId);
  const { isOpen, onClose } = useDeleteStoreModal();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete store</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete store{" "}
            <strong className="font-bold">{storeName}</strong>?
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
              onClick={async () => await deleteStore()}
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
