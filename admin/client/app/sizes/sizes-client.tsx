"use client";
import { useSizesStore } from "@/features/sizes/context";
import { CreateSizeButton } from "@/features/sizes/create-size";
import { EditSizeModal } from "@/features/sizes/edit-size";
import { Size } from "@/features/sizes/types";
import { columns } from "@/features/sizes/utils";
import { DataTable, DeleteRecordsModal } from "@/features/ui";
import { useEffect } from "react";

interface SizesPageClientProps {
  data: Size[];
}

export const SizesPageClient: React.FC<SizesPageClientProps> = ({ data }) => {
  const { sizes, findSizes, deleteSizes } = useSizesStore();

  useEffect(() => {
    findSizes(data);
  }, [data]);

  return (
    <>
      <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
        Sizes ({sizes.length})
      </h1>

      <div className="mt-3">
        <CreateSizeButton />
      </div>

      <div className="mt-6 space-y-8">
        <DataTable
          entityName="sizes"
          data={sizes.map((size) => ({ ...size, name: size.label }))}
          columns={columns}
        />
      </div>

      <DeleteRecordsModal entityName="sizes" updateUI={deleteSizes} />
      <EditSizeModal />
    </>
  );
};
