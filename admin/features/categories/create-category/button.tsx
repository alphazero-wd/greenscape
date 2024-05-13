"use client";
import { Button } from "@/features/ui/button";
import { PlusIcon } from "@heroicons/react/24/solid";
import { useCreateCategoryModal } from "./use-modal";

export const CreateCategoryButton = () => {
  const { onOpen } = useCreateCategoryModal();

  return (
    <Button onClick={onOpen}>
      <PlusIcon className="mr-2 h-4 w-4" />
      Add
    </Button>
  );
};
