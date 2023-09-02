"use client";
import {
  Badge,
  Button,
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
  CommandSeparator,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Separator,
} from "@/features/ui";
import { cn } from "@/lib/utils";
import { DotFilledIcon, PlusCircledIcon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";
import { useEffect, useMemo, useState } from "react";
import { InStockGroup, Product } from "../types";

interface InStockFilterProps {
  inStockGroups: InStockGroup[];
  table: Table<Product>;
}

export const InStockFilter: React.FC<InStockFilterProps> = ({
  inStockGroups,
  table,
}) => {
  const [inStock, setInStock] = useState<boolean | null>(null);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const currentStatus = searchParams.get("inStock");
    if (!currentStatus) return;
    setInStock(Boolean(inStock));
  }, [searchParams.get("inStock")]);

  useEffect(() => {
    const currentQuery = qs.parse(searchParams.toString());
    if (inStock !== null) {
      currentQuery.inStock = String(inStock);
      currentQuery.offset = "0";
    } else delete currentQuery.inStock;
    table.resetPageIndex();
    const urlWithInStockQuery = qs.stringifyUrl({
      url: pathname,
      query: currentQuery,
    });
    router.push(urlWithInStockQuery);
  }, [inStock]);

  const inStockSum = useMemo(
    () =>
      inStockGroups.reduce(
        (acc, group) => {
          if (group.inStock === 0) acc[1] += group._count.id;
          else acc[0] += group._count.id;
          return acc;
        },
        [0, 0],
      ),
    [inStockGroups],
  );

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="h-8 border-dashed">
          <PlusCircledIcon className="mr-2 h-4 w-4" />
          Availability
          {inStock !== null && (
            <>
              <Separator orientation="vertical" className="mx-2 h-4" />
              <Badge
                variant="secondary"
                className="rounded-sm px-1 font-normal"
              >
                {inStock ? "In stock" : "Out of stock"}
              </Badge>
            </>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0" align="start">
        <Command>
          <CommandList>
            <CommandGroup>
              {(["In stock", "Out of stock"] as const).map((s, i) => (
                <CommandItem
                  key={s}
                  onSelect={() => setInStock(s === "In stock")}
                >
                  <div
                    className={cn(
                      "mr-2 h-4 w-4",
                      !Boolean(i) === inStock
                        ? "bg-primary text-primary-foreground"
                        : "opacity-50 [&_svg]:invisible",
                    )}
                  >
                    <DotFilledIcon className="h-4 w-4" />
                  </div>
                  <span>{s}</span>
                  {inStockSum[i] > 0 && (
                    <span className="ml-auto flex h-4 w-4 items-center justify-center font-mono text-xs">
                      {inStockSum[i]}
                    </span>
                  )}
                </CommandItem>
              ))}
            </CommandGroup>
            {inStock !== null && (
              <>
                <CommandSeparator />
                <CommandGroup>
                  <CommandItem
                    onSelect={() => setInStock(null)}
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
