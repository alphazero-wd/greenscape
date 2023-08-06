"use client";

import { Button } from "@/features/ui";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { useCreateStoreModal } from "./use-create-store-modal";

export const CreateStoreButton = () => {
  const { onOpen } = useCreateStoreModal();
  return (
    <Button onClick={onOpen} className="w-full">
      <PlusCircleIcon className="mr-2 h-5 w-5" />
      Create new store
    </Button>
  );
};
