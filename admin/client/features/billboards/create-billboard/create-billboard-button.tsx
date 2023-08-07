"use client";
import { Button } from "@/features/ui";
import { PlusIcon } from "@heroicons/react/24/solid";
import { useCreateBillboardModal } from "./use-create-billboard-modal";

export const CreateBillboardButton = () => {
  const { onOpen } = useCreateBillboardModal();

  return (
    <Button onClick={onOpen} variant="outline">
      <PlusIcon className="mr-2 h-4 w-4" />
      Create new billboard
    </Button>
  );
};
