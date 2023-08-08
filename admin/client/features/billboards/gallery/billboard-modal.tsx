"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/features/ui";
import { Label } from "@radix-ui/react-label";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { FeaturedSwitch } from "../form";
import { useBillboardModal } from "./use-billboard-modal";
import { useBillboards } from "./use-billboards";

export const BillboardModal = () => {
  const { billboards, toggleFeaturedBillboard } = useBillboards();
  const { isOpen, onClose, id } = useBillboardModal();
  const billboard = useMemo(
    () => billboards.find((billboard) => billboard.id === id),
    [id],
  );

  const [isFeatured, setIsFeatured] = useState(false);

  useEffect(() => {
    if (billboard) setIsFeatured(billboard.isFeatured);
  }, [billboard]);

  useEffect(() => {
    // do not make the initial request
    if (billboard && billboard.isFeatured !== isFeatured)
      toggleFeaturedBillboard(billboard.id, isFeatured);
  }, [isFeatured]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Billboard view</DialogTitle>
          <DialogDescription>
            See the billboard in full screen to make your next decision
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-6">
          <div>
            <Label htmlFor="image" className="mb-2 block text-sm font-medium">
              Image
            </Label>
            <div className="relative h-96 rounded-lg">
              <Image
                src={`${process.env.NEXT_PUBLIC_API_URL}/files/${billboard?.imageId}`}
                fill
                alt="Billboard full screen"
                className="absolute inset-0 aspect-square overflow-hidden rounded-lg object-cover"
              />
            </div>
          </div>

          <FeaturedSwitch
            isFeatured={isFeatured}
            setIsFeatured={setIsFeatured}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};
