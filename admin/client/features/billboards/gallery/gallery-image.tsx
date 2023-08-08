"use client";
import {
  Button,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/features/ui";
import {
  ArrowsPointingOutIcon,
  EyeIcon,
  EyeSlashIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import { useMemo } from "react";
import { Billboard } from "../types";
import { useBillboard } from "./use-billboard";
import { useBillboardModal } from "./use-billboard-modal";

interface GalleryImageProps {
  billboard: Billboard;
}

export const GalleryImage: React.FC<GalleryImageProps> = ({ billboard }) => {
  const { onOpen } = useBillboardModal();
  const { toggleFeaturedBillboard } = useBillboard();

  const actions = useMemo(
    () =>
      [
        {
          name: !billboard.isFeatured ? "Feature" : "Unfeature",
          icon: !billboard.isFeatured ? EyeIcon : EyeSlashIcon,
          variant: !billboard.isFeatured ? "secondary" : "default",
          onClick: async () =>
            await toggleFeaturedBillboard(billboard.id, !billboard.isFeatured),
        },
        {
          name: "Show image on full screen",
          icon: ArrowsPointingOutIcon,
          variant: "secondary",
          onClick: () => onOpen(billboard.id),
        },
        {
          name: "Remove billboard",
          icon: TrashIcon,
          variant: "destructive",
          onClick: () => {},
        },
      ] as const,
    [billboard],
  );

  return (
    <li className="group relative cursor-pointer">
      <div className="lg:aspect-none aspect-[4/3] w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:h-80">
        <Image
          alt="Billboard image"
          fill
          src={`${process.env.NEXT_PUBLIC_API_URL}/files/${billboard.imageId}`}
          className="h-full w-full rounded-md object-cover object-center shadow-lg lg:h-full lg:w-full"
        />
      </div>
      <div className="absolute inset-0 z-20 flex items-center justify-center gap-x-4 opacity-0 group-hover:opacity-100">
        {actions.map((action) => (
          <TooltipProvider key={action.name}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant={action.variant}
                  size="icon"
                  className="rounded-full"
                  onClick={action.onClick}
                >
                  <action.icon className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>{action.name}</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ))}
      </div>
    </li>
  );
};
