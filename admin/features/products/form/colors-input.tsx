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
import { UseFormReturn } from "react-hook-form";
import { CreateProductDto } from "../types";

interface ColorsInputProps {
  form: UseFormReturn<CreateProductDto, any, undefined>;
  colors: Color[];
}

export const ColorsInput: React.FC<ColorsInputProps> = ({ form, colors }) => {
  const [open, setOpen] = useState(false);
  const curColorIds = useMemo(
    () => form.getValues("colorIds") || [],
    [form.getValues("colorIds")],
  );

  const sortedBySelectedColors = useMemo(
    () =>
      colors.sort((a, b) => {
        return +curColorIds.includes(b.id) - +curColorIds.includes(a.id);
      }),
    [curColorIds, colors],
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {curColorIds
            ? `${curColorIds.length} colors selected`
            : "Select colors..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
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
                    form.setValue(
                      "colorIds",
                      curColorIds.includes(color.id)
                        ? curColorIds.filter((id) => id !== color.id)
                        : [...curColorIds, color.id],
                    );
                  }}
                >
                  <ColorCircle
                    isSelected={curColorIds.includes(color.id)}
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
