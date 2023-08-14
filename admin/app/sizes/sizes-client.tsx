"use client";
import { useSizesStore } from "@/features/sizes/context";
import { CreateSizeButton } from "@/features/sizes/create-size";
import { EditSizeModal } from "@/features/sizes/edit-size";
import { Size } from "@/features/sizes/types";
import { columns } from "@/features/sizes/utils";
import { Input } from "@/features/ui";
import {
  DataTable,
  DataTablePagination,
  DataTableViewOptions,
  DeleteRecordsModal,
  useTable,
} from "@/features/ui/data-table";
import { useEffect } from "react";

interface SizesPageClientProps {
  count: number;
  data: Size[];
}

export const SizesPageClient: React.FC<SizesPageClientProps> = ({
  count: hits,
  data,
}) => {
  const { categories, getSizes, count, deleteSizes } = useSizesStore();

  const { loading, q, setQ, table } = useTable<Size>(
    columns,
    categories,
    hits,
    getSizes,
  );

  useEffect(() => {
    getSizes(hits, data);
  }, [data, hits]);

  if (loading) return <div>Loading...</div>;

  return (
    <>
      <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
        Plants ({count})
      </h1>

      <div className="mt-3">
        <CreateSizeButton />
      </div>

      <div className="mt-6 space-y-8">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex flex-1 items-center space-x-2">
              <Input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search plants..."
                className="h-8 w-[250px]"
              />
            </div>
            <DataTableViewOptions table={table} />
          </div>
          <DataTable columns={columns} table={table} />
          <DataTablePagination table={table} />
        </div>
      </div>

      <EditSizeModal />
      <DeleteRecordsModal entityName="sizes" updateUI={deleteSizes} />
    </>
  );
};
