"use client";
import { Button, Label } from "@/features/ui";
import { useDeleteSizeModal } from "./use-delete-size-modal";

export const DeleteSizeButton = () => {
  const { onOpen } = useDeleteSizeModal();
  return (
    <div>
      <Label>Delete size</Label>
      <p className="text-sm text-gray-500">This action cannot be undone.</p>
      <Button onClick={onOpen} variant="destructive" className="mt-3">
        Delete size
      </Button>
    </div>
  );
};
