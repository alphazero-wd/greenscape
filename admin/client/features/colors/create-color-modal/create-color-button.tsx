"use client";
import { Button } from "@/features/ui";
import { PlusIcon } from "@heroicons/react/24/solid";
import { useCreateColorModal } from "./use-create-color-modal";

export const CreateColorButton = () => {
  const { onOpen } = useCreateColorModal();

  return (
    <Button onClick={onOpen} variant="outline">
      <PlusIcon className="mr-2 h-4 w-4" />
      Create new color
    </Button>
  );
};
