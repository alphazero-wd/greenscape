"use client";

import { Button, Label } from "@/features/ui";
import { useEffect, useMemo, useState } from "react";
import { toast } from "react-hot-toast";
import { useBillboardsStore } from "../contexts";
import { CreateBillboardButton } from "../create-billboard";
import { Billboard } from "../types";
import { groupBillboardsByDates } from "../utils";
import { BillboardModal } from "./billboard-modal";
import { BillboardsViewOptions } from "./billboards-view-options";
import { DeleteBillboardsModal } from "./delete-billboards-modal";
import { GalleryImage } from "./gallery-image";
import { useDeleteBillboardsModal } from "./use-delete-billboards-modal";

interface GalleryProps {
  data: Billboard[];
}

export const Gallery: React.FC<GalleryProps> = ({ data }) => {
  const { onOpen } = useDeleteBillboardsModal();
  const { billboards, selectedBillboardIds, getBillboards } =
    useBillboardsStore();
  const [viewOptions, setViewOptions] = useState({
    featured: true,
    archived: true,
  });

  useEffect(() => {
    toast.dismiss();
    if (selectedBillboardIds.length > 0)
      toast(
        <div className="flex items-center justify-between gap-x-4">
          <span className="font-medium">
            {selectedBillboardIds.length}{" "}
            {selectedBillboardIds.length === 1 ? "billboard" : "billboards"}{" "}
            selected
          </span>
          <Button
            variant="destructive"
            size="sm"
            onClick={() => onOpen(selectedBillboardIds)}
          >
            Delete
          </Button>
        </div>,
      );
  }, [selectedBillboardIds]);

  useEffect(() => {
    getBillboards(data);
  }, [data]);

  const filteredBillboards = useMemo(() => {
    if (!viewOptions.archived) return billboards.filter((b) => b.isFeatured);
    if (!viewOptions.featured) return billboards.filter((b) => !b.isFeatured);
    return billboards;
  }, [billboards, viewOptions]);

  const photosGroups = useMemo(
    () => groupBillboardsByDates(filteredBillboards),
    [filteredBillboards],
  );

  return (
    <>
      <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
        Billboards ({billboards.length})
      </h1>

      <div className="mt-3 flex items-center justify-between">
        <CreateBillboardButton />

        <BillboardsViewOptions
          viewOptions={viewOptions}
          setViewOptions={setViewOptions}
        />
      </div>

      <div className="mt-6">
        {photosGroups.map((group) => (
          <div key={group.date} className="space-y-4">
            <Label>{group.date}</Label>
            <ul className="grid grid-cols-2 gap-8 sm:grid-cols-3">
              {group.billboards.map((billboard) => (
                <GalleryImage key={billboard.id} billboard={billboard} />
              ))}
            </ul>
          </div>
        ))}
      </div>
      <BillboardModal />
      <DeleteBillboardsModal />
    </>
  );
};
