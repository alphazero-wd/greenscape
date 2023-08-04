"use client";
import { Button } from "@/features/ui";
import { PlusIcon } from "@heroicons/react/24/solid";
import { useCreateSizeModal } from "./use-create-size-modal";

export const CreateSizeButton = () => {
  const { onOpen } = useCreateSizeModal();

  return (
    <Button onClick={onOpen} variant="outline">
      <PlusIcon className="mr-2 h-4 w-4" />
      Create new size
    </Button>
  );
};
