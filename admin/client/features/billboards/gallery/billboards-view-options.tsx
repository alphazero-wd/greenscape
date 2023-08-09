"use client";
import { MixerHorizontalIcon } from "@radix-ui/react-icons";
import {
  Button,
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../ui";

interface ViewOptions {
  featured: boolean;
  archived: boolean;
}

interface BillboardsViewOptionsProps {
  viewOptions: ViewOptions;
  setViewOptions: React.Dispatch<ViewOptions>;
}

export const BillboardsViewOptions: React.FC<BillboardsViewOptionsProps> = ({
  viewOptions,
  setViewOptions,
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="ml-auto hidden h-8 lg:flex"
        >
          <MixerHorizontalIcon className="mr-2 h-4 w-4" />
          View
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[150px]">
        <DropdownMenuLabel>View options</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem
          checked={viewOptions.featured}
          onCheckedChange={(checked) =>
            setViewOptions({ ...viewOptions, featured: checked })
          }
        >
          Featured
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={viewOptions.archived}
          onCheckedChange={(checked) =>
            setViewOptions({ ...viewOptions, archived: checked })
          }
        >
          Archived
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
