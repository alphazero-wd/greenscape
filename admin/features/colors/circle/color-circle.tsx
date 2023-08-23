import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/features/ui";
import { cn } from "@/lib/utils";
import { contrastColor } from "contrast-color";
import { GetColorName } from "hex-color-to-color-name";
import { Check } from "lucide-react";
import React from "react";

interface ColorCircleProps {
  color: string;
  isSelected?: boolean;
  className?: string;
}

export const ColorCircle: React.FC<ColorCircleProps> = ({
  color,
  isSelected,
  className,
}) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipContent>{GetColorName(color)}</TooltipContent>
        <TooltipTrigger asChild>
          <div
            className={cn(
              "relative flex h-8 w-8 items-center justify-center rounded-full border border-black border-opacity-10",
              className,
            )}
            style={{ backgroundColor: color }}
          >
            <Check
              className={cn(
                "absolute h-4 w-4",
                isSelected ? "opacity-100" : "opacity-0",
              )}
              style={{ color: contrastColor({ bgColor: color }) }}
            />
          </div>
        </TooltipTrigger>
      </Tooltip>
    </TooltipProvider>
  );
};
