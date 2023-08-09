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
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useBillboards } from "./use-billboards";
import { useDeleteBillboardsModal } from "./use-delete-billboards-modal";

export const DeleteBillboardsModal = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { ids, isOpen, onClose } = useDeleteBillboardsModal();
  const { deleteBillboards } = useBillboards();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete billboards confirmation</DialogTitle>
          <DialogDescription>
            {ids.length} {ids.length === 1 ? "item" : "items"} will be removed
            permanently
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
              onClick={() => {
                setLoading(true);
                deleteBillboards(ids)
                  .then(() => {
                    router.refresh();
                    onClose();
                  })
                  .finally(() => {
                    setLoading(false);
                  });
              }}
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
