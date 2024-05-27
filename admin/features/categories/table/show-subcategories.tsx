import { Button } from "@/features/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/features/ui/tooltip";
import { ListTree } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface ShowSubcategoriesButtonProps {
  slug: string;
}

export const ShowSubcategoriesButton = ({
  slug,
}: ShowSubcategoriesButtonProps) => {
  const pathname = usePathname();
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipContent>View sub-categories</TooltipContent>
        <TooltipTrigger asChild>
          <Button asChild variant="ghost" size="icon">
            <Link href={pathname + `/${slug}`}>
              <ListTree className="h-5 w-5" />
            </Link>
          </Button>
        </TooltipTrigger>
      </Tooltip>
    </TooltipProvider>
  );
};
