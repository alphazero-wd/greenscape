"use client";
import { Category } from "@/features/categories/types";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/features/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/features/ui/popover";
import { cn } from "@/lib/utils";
import { PlusCircledIcon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";
import { CheckIcon } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";
import { useEffect, useState } from "react";
import { Badge } from "../../ui/badge";
import { Button } from "../../ui/button";
import { Separator } from "../../ui/separator";
import { CategoryGroup, Product } from "../types";

interface CategoriesFilterProps {
  categoryGroups: CategoryGroup[];
  categories: Category[];
  table: Table<Product>;
}

export const CategoriesFilter: React.FC<CategoriesFilterProps> = ({
  categories,
  categoryGroups,
  table,
}) => {
  const [selectedCategoryIds, setSelectedCategoryIds] = useState<number[]>([]);
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const categoryIds = searchParams.get("categoryIds");
    if (!categoryIds) setSelectedCategoryIds([]);
    else setSelectedCategoryIds(categoryIds.split(",").map((id) => +id));
  }, [searchParams.get("categoryIds")]);

  useEffect(() => {
    const currentQuery = qs.parse(searchParams.toString());
    if (selectedCategoryIds.length > 0) {
      currentQuery.categoryIds = selectedCategoryIds.join(",");
    } else delete currentQuery.categoryIds;
    table.resetPageIndex();
    const urlWithCategoryIdsQuery = qs.stringifyUrl({
      url: pathname,
      query: currentQuery,
    });
    router.push(urlWithCategoryIdsQuery, { scroll: false });
  }, [selectedCategoryIds, router]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="h-8 border-dashed">
          <PlusCircledIcon className="mr-2 h-4 w-4" />
          Categories
          {selectedCategoryIds.length > 0 && (
            <>
              <Separator orientation="vertical" className="mx-2 h-4" />
              <Badge
                variant="secondary"
                className="rounded-sm px-1 font-normal lg:hidden"
              >
                {selectedCategoryIds.length}
              </Badge>
              <div className="hidden space-x-1 lg:flex">
                {selectedCategoryIds.length > 2 ? (
                  <Badge
                    variant="secondary"
                    className="rounded-sm px-1 font-normal"
                  >
                    {selectedCategoryIds.length} selected
                  </Badge>
                ) : (
                  categories
                    .filter((c) => selectedCategoryIds.includes(c.id))
                    .map((c) => (
                      <Badge
                        variant="secondary"
                        key={c.id}
                        className="rounded-sm px-1 font-normal"
                      >
                        {c.name}
                      </Badge>
                    ))
                )}
              </div>
            </>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0" align="start">
        <Command>
          <CommandInput placeholder="Categories" />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              {categories.map((c) => {
                const isSelected = selectedCategoryIds.includes(c.id);
                return (
                  <CommandItem
                    key={c.id}
                    onSelect={() => {
                      if (isSelected) {
                        setSelectedCategoryIds(
                          selectedCategoryIds.filter((id) => id !== c.id),
                        );
                      } else {
                        setSelectedCategoryIds([...selectedCategoryIds, c.id]);
                      }
                    }}
                  >
                    <div
                      className={cn(
                        "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                        isSelected
                          ? "bg-primary text-primary-foreground"
                          : "opacity-50 [&_svg]:invisible",
                      )}
                    >
                      <CheckIcon className={cn("h-4 w-4")} />
                    </div>
                    <span>{c.name}</span>
                    {categoryGroups.find((group) => group.categoryId === c.id)
                      ?._count && (
                      <span className="ml-auto flex h-4 w-4 items-center justify-center font-mono text-xs">
                        {
                          categoryGroups.find(
                            (group) => group.categoryId === c.id,
                          )?._count.id
                        }
                      </span>
                    )}
                  </CommandItem>
                );
              })}
            </CommandGroup>
            {selectedCategoryIds.length > 0 && (
              <>
                <CommandSeparator />
                <CommandGroup>
                  <CommandItem
                    onSelect={() => setSelectedCategoryIds([])}
                    className="justify-center text-center"
                  >
                    Clear filters
                  </CommandItem>
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
