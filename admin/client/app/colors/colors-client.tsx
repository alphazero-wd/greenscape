"use client";
import { useColorsStore } from "@/features/colors/context";
import { CreateColorButton } from "@/features/colors/create-color";
import { EditColorModal } from "@/features/colors/edit-color";
import { Color } from "@/features/colors/types";
import { columns } from "@/features/colors/utils";
import { DataTable, DeleteRecordsModal } from "@/features/ui";
import { useEffect } from "react";

interface ColorsPageClientProps {
  data: Color[];
}

export const ColorsPageClient: React.FC<ColorsPageClientProps> = ({ data }) => {
  const { colors, findColors, deleteColors } = useColorsStore();

  useEffect(() => {
    findColors(data);
  }, [data]);

  return (
    <>
      <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
        Colors ({colors.length})
      </h1>

      <div className="mt-3">
        <CreateColorButton />
      </div>

      <div className="mt-6 space-y-8">
        <DataTable entityName="colors" data={colors} columns={columns} />
      </div>

      <DeleteRecordsModal entityName="colors" updateUI={deleteColors} />
      <EditColorModal />
    </>
  );
};
