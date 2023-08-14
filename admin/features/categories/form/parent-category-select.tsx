"use client";
import {
  Button,
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  FormControl,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/features/ui";
import { usePaginate } from "@/features/utils";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown } from "lucide-react";
import React, { useEffect, useMemo, useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { useDebouncedCallback } from "use-debounce";
import { Category } from "../types";

interface ParentCategorySelectProps {
  value?: number;
  form: UseFormReturn<
    {
      name: string;
      parentCategoryId?: number | undefined;
    },
    any,
    undefined
  >;
  id?: number;
}

export const ParentCategorySelect: React.FC<ParentCategorySelectProps> = ({
  form,
  value,
  id,
}) => {
  const { paginate } = usePaginate();
  const [q, setQ] = useState("");
  const [otherCategories, setOtherCategories] = useState<Category[]>([]);
  const fetchSearchCategories = useDebouncedCallback(async () => {
    const { data } = await paginate(
      process.env.NEXT_PUBLIC_API_URL + `/categories?limit=5&q=${q}`,
    );
    setOtherCategories(
      (data as Category[]).filter((c) => (id ? c.id !== id : true)),
    );
  }, 500);

  const selectedCategory = useMemo<Category | undefined>(
    () => (value ? otherCategories.find((c) => c.id === value) : undefined),
    [value, otherCategories],
  );

  useEffect(() => {
    fetchSearchCategories();
  }, [q]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <FormControl>
          <Button
            variant="outline"
            role="combobox"
            className={cn("w-full justify-between", !value && "text-gray-500")}
          >
            {selectedCategory ? (
              <div>
                {selectedCategory.parentCategory && (
                  <span className="mr-1 font-normal text-gray-600">
                    {selectedCategory.parentCategory.name} /
                  </span>
                )}
                <span>{selectedCategory.name}</span>
              </div>
            ) : (
              "Select parent category"
            )}

            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </FormControl>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0">
        <Command>
          <CommandInput
            value={q}
            onValueChange={(val) => setQ(val)}
            placeholder="Search categories..."
          />
          <CommandEmpty>No category found.</CommandEmpty>
          <CommandGroup>
            <CommandItem
              value="None"
              onSelect={() => form.setValue("parentCategoryId", undefined)}
            >
              <Check
                className={cn(
                  "mr-2 h-4 w-4",
                  !value ? "opacity-100" : "opacity-0",
                )}
              />
              None
            </CommandItem>
            {otherCategories.map((c) => (
              <CommandItem
                value={c.name}
                key={c.id}
                onSelect={() => form.setValue("parentCategoryId", c.id)}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    c.id === value ? "opacity-100" : "opacity-0",
                  )}
                />
                {c.parentCategory && (
                  <span className="mr-1 text-gray-600">
                    {c.parentCategory.name} /
                  </span>
                )}
                <span className="font-medium">{c.name}</span>
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
