"use client";

import { Button, Label } from "@/features/ui";
import { useEffect, useMemo } from "react";
import { toast } from "react-hot-toast";
import { Billboard } from "../types";
import { groupBillboardsByDates } from "../utils";
import { BillboardModal } from "./billboard-modal";
import { DeleteBillboardsModal } from "./delete-billboards-modal";
import { GalleryImage } from "./gallery-image";
import { useBillboards } from "./use-billboards";
import { useDeleteBillboardsModal } from "./use-delete-billboards-modal";

interface GalleryProps {
  data: Billboard[];
}

export const Gallery: React.FC<GalleryProps> = ({ data }) => {
  const { onOpen } = useDeleteBillboardsModal();
  const { billboards, selectedBillboardIds, getBillboards } = useBillboards();

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

  const photosGroups = useMemo(
    () => groupBillboardsByDates(billboards),
    [billboards],
  );

  return (
    <>
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
      <BillboardModal />
      <DeleteBillboardsModal />
    </>
  );
};
