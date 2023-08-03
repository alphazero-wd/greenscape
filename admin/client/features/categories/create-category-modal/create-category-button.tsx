"use client";
import { Button } from "@/features/ui";
import { PlusIcon } from "@heroicons/react/24/solid";
import { useCreateCategoryModal } from "./use-create-category-modal";

export const CreateCategoryButton = () => {
  const { onOpen } = useCreateCategoryModal();

  return (
    <Button onClick={onOpen} variant="outline">
      <PlusIcon className="mr-2 h-4 w-4" />
      Create new category
    </Button>
  );
};
