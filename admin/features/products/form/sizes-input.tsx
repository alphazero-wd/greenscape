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
import { UseFormReturn } from "react-hook-form";
import { CreateProductDto } from "../types";

interface SizesInputProps {
  form: UseFormReturn<CreateProductDto, any, undefined>;
  sizes: Size[];
}

export const SizesInput: React.FC<SizesInputProps> = ({ form, sizes }) => {
  const [open, setOpen] = useState(false);
  const curSizeIds = useMemo(
    () => form.getValues("sizeIds") || [],
    [form.getValues("sizeIds")],
  );

  const sortedBySelectedSizes = useMemo(
    () =>
      sizes.sort((a, b) => {
        return +curSizeIds.includes(b.id) - +curSizeIds.includes(a.id);
      }),
    [curSizeIds, sizes],
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
          {curSizeIds
            ? `${curSizeIds.length} Sizes selected`
            : "Select Sizes..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0">
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
                    form.setValue(
                      "sizeIds",
                      curSizeIds.includes(size.id)
                        ? curSizeIds.filter((id) => id !== size.id)
                        : [...curSizeIds, size.id],
                    );
                  }}
                >
                  <SizeSelect
                    isSelected={curSizeIds.includes(size.id)}
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
