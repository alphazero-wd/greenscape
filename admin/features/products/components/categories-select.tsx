"use client";

import { useMemo, useState } from "react";

import { Category } from "@/features/categories/types";
import {
  Button,
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/features/ui";

import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown } from "lucide-react";

interface CategoriesSelectProps {
  categories: Category[];
  categoryId?: number;
  onSelect?: (id: number) => void;
}

export function CategoriesSelect({
  categories,
  categoryId,
  onSelect = () => {},
}: CategoriesSelectProps) {
  const [open, setOpen] = useState(false);
  const category = useMemo(
    () => categories.find((c) => c.id === categoryId),
    [categoryId, categories],
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-full justify-between">
          {!category ? "Select category" : category.name}
          <ChevronsUpDown className="h-4 w-4 text-gray-500" />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-[300px] bg-white p-0">
        <Command>
          <CommandInput placeholder="Search categories..." autoFocus={true} />
          <CommandList>
            <CommandEmpty>No category found.</CommandEmpty>
            <CommandGroup>
              {categories.map((c) => (
                <CommandItem
                  key={c.id}
                  value={c.name}
                  onSelect={() => {
                    setOpen(false);
                    onSelect(c.id);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      categoryId === c.id ? "opacity-100" : "opacity-0",
                    )}
                  />
                  {c.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
