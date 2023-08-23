import { ColorCircle } from "@/features/colors/circle";
import { Color } from "@/features/colors/types";
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

interface ColorsInputProps {
  colors: Color[];
  colorIds?: number[];
  onSelect?: (ids: number[]) => void;
}

export const ColorsInput: React.FC<ColorsInputProps> = ({
  colors,
  colorIds = [],
  onSelect = () => {},
}) => {
  const [open, setOpen] = useState(false);

  const sortedBySelectedColors = useMemo(
    () =>
      colors.sort((a, b) => {
        return +colorIds.includes(b.id) - +colorIds.includes(a.id);
      }),
    [colorIds, colors],
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
          {colorIds ? `${colorIds.length} colors selected` : "Select colors..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder="Search colors..." />
          <CommandEmpty>No colors found.</CommandEmpty>
          <CommandGroup>
            <div className="grid grid-cols-4 gap-2 p-2">
              {sortedBySelectedColors.map((color) => (
                <CommandItem
                  className="flex justify-center aria-selected:bg-transparent"
                  key={color.id}
                  value={color.name + color.hexCode}
                  onSelect={() => {
                    onSelect(
                      colorIds.includes(color.id)
                        ? colorIds.filter((id) => id !== color.id)
                        : [...colorIds, color.id],
                    );
                  }}
                >
                  <ColorCircle
                    isSelected={colorIds.includes(color.id)}
                    color={color.hexCode}
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
