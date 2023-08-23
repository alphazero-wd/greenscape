"use client";

import * as React from "react";

import { Category } from "@/features/categories/types";
import {
  Button,
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/features/ui";

import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown } from "lucide-react";

interface CategoriesInputProps {
  categories: Category[];
  categoryIds?: number[];
  onSelect?: (ids: [number, number, number]) => void;
}

export function CategoriesInput({
  categories,
  categoryIds = [],
  onSelect = () => {},
}: CategoriesInputProps) {
  const [open, setOpen] = React.useState(false);
  const hierarchy = React.useMemo(() => {
    if (categoryIds) {
      const category = categories.find((c) => c.id === categoryIds[0]);
      const subCategory = category?.subCategories.find(
        (sc) => sc.id === categoryIds[1],
      );
      const subSubCategory = subCategory?.subCategories.find(
        (ssc) => ssc.id === categoryIds[2],
      );
      return [category?.name, subCategory?.name, subSubCategory?.name];
    }
  }, [categoryIds]);

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="w-full justify-between">
          {categoryIds.length === 0
            ? "Select category"
            : hierarchy?.join(" / ")}
          <ChevronsUpDown className="h-4 w-4 text-gray-500" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[300px] bg-white">
        <DropdownMenuLabel>Categories</DropdownMenuLabel>
        <DropdownMenuGroup>
          {categories.map((c) => (
            <DropdownMenuSub key={c.id}>
              <DropdownMenuSubTrigger>{c.name}</DropdownMenuSubTrigger>
              <DropdownMenuSubContent className="p-0">
                {c.subCategories.map((sc) => (
                  <DropdownMenuSub key={sc.id}>
                    <DropdownMenuSubTrigger>{sc.name}</DropdownMenuSubTrigger>
                    <DropdownMenuSubContent className="p-0">
                      <Command>
                        <CommandInput
                          placeholder="Search categories..."
                          autoFocus={true}
                        />
                        <CommandList>
                          <CommandEmpty>No category found.</CommandEmpty>
                          <CommandGroup>
                            {sc.subCategories.map((ssc) => (
                              <CommandItem
                                key={ssc.id}
                                value={ssc.name}
                                onSelect={() => {
                                  setOpen(false);
                                  onSelect([c.id, sc.id, ssc.id]);
                                }}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    categoryIds.includes(ssc.id)
                                      ? "opacity-100"
                                      : "opacity-0",
                                  )}
                                />
                                {ssc.name}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </DropdownMenuSubContent>
                  </DropdownMenuSub>
                ))}
              </DropdownMenuSubContent>
            </DropdownMenuSub>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
