import {
  Button,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/features/ui";
import { ViewfinderCircleIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

interface PreviewButtonProps {
  id: number;
}

export const PreviewButton: React.FC<PreviewButtonProps> = ({ id }) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipContent>Preview</TooltipContent>
        <TooltipTrigger asChild>
          <Button variant="ghost" size="icon">
            <Link href={`/products/${id}/preview`}>
              <ViewfinderCircleIcon className="h-5 w-5" />
            </Link>
          </Button>
        </TooltipTrigger>
      </Tooltip>
    </TooltipProvider>
  );
};
