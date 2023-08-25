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
import { useDeleteImage } from "./use-delete-image";
import { useDeleteImageModal } from "./use-delete-image-modal";

interface DeleteImageModalProps {
  productId: number;
}

export const DeleteImageModal: React.FC<DeleteImageModalProps> = ({
  productId,
}) => {
  const { isOpen, onClose, imageId } = useDeleteImageModal();
  const { deleteImage, loading } = useDeleteImage();

  if (!imageId) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete image confirmation</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this image?
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
              onClick={async () => await deleteImage(productId, imageId)}
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
