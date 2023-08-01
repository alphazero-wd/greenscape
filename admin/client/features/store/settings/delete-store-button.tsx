"use client";
import { Button, Label } from "@/features/ui";
import { useDeleteStoreModal } from "../hooks";

export const DeleteStoreButton = () => {
  const { onOpen } = useDeleteStoreModal();
  return (
    <div>
      <Label>Delete store</Label>
      <p className="text-gray-500 text-sm">This action cannot be undone.</p>
      <Button onClick={onOpen} variant="destructive" className="mt-3">
        Delete store
      </Button>
    </div>
  );
};
