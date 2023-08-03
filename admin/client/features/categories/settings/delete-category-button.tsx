"use client";
import { Button, Label } from "@/features/ui";
import { useDeleteCategoryModal } from "./use-delete-category-modal";

export const DeleteCategoryButton = () => {
  const { onOpen } = useDeleteCategoryModal();
  return (
    <div>
      <Label>Delete category</Label>
      <p className="text-sm text-gray-500">This action cannot be undone.</p>
      <Button onClick={onOpen} variant="destructive" className="mt-3">
        Delete category
      </Button>
    </div>
  );
};
