import { SizeSelect } from "@/features/sizes/form";
import { Size } from "@/features/sizes/types";
import {
  Button,
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/features/ui";
import { CommandGroup } from "cmdk";
import { ChevronsUpDown } from "lucide-react";
import { useMemo, useState } from "react";

interface SizesInputProps {
  sizes: Size[];
  sizeIds?: number[];
  onSelect?: (ids: number[]) => void;
}

export const SizesInput: React.FC<SizesInputProps> = ({
  sizes,
  sizeIds = [],
  onSelect = () => {},
}) => {
  const [open, setOpen] = useState(false);

  const sortedBySelectedSizes = useMemo(
    () =>
      sizes.sort((a, b) => {
        return +sizeIds.includes(b.id) - +sizeIds.includes(a.id);
      }),
    [sizeIds, sizes],
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {sizeIds ? `${sizeIds.length} Sizes selected` : "Select Sizes..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder="Search Sizes..." />
          <CommandEmpty>No sizes found.</CommandEmpty>
          <CommandGroup>
            <div className="grid grid-cols-4 gap-1 p-2">
              {sortedBySelectedSizes.map((size) => (
                <CommandItem
                  className="flex w-full justify-center aria-selected:bg-transparent"
                  key={size.id}
                  value={size.label}
                  onSelect={() => {
                    onSelect(
                      sizeIds.includes(size.id)
                        ? sizeIds.filter((id) => id !== size.id)
                        : [...sizeIds, size.id],
                    );
                  }}
                >
                  <SizeSelect
                    isSelected={sizeIds.includes(size.id)}
                    label={size.label}
                  />
                </CommandItem>
              ))}
            </div>
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
