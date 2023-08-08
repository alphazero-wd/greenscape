"use client";

import { Label } from "@/features/ui";
import { useEffect, useMemo, useState } from "react";
import { Billboard } from "../types";
import { groupBillboardsByDates } from "../utils";
import { BillboardModal } from "./billboard-modal";
import { GalleryImage } from "./gallery-image";
import { useBillboard } from "./use-billboard";

interface GalleryProps {
  data: Billboard[];
}

export const Gallery: React.FC<GalleryProps> = ({ data }) => {
  const [mounted, setMounted] = useState(false);
  const { billboards, getBillboards } = useBillboard();

  useEffect(() => {
    getBillboards(data);
  }, [data]);

  useEffect(() => {
    setMounted(true);
  }, []);

  const photosGroups = useMemo(
    () => groupBillboardsByDates(billboards),
    [billboards],
  );

  // add skeleton loading
  if (!mounted) return null;

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
    </>
  );
};
