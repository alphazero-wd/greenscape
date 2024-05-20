"use client";
import { Badge } from "@/features/ui/badge";
import { Button } from "@/features/ui/button";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/features/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/features/ui/popover";
import { Separator } from "@/features/ui/separator";
import { cn } from "@/lib/utils";
import { DotFilledIcon, PlusCircledIcon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";
import { useEffect, useState } from "react";
import { Order, ShippingOptionGroup } from "../types";
import { getShippingOption } from "../utils";

interface ShippingOptionFilterProps {
  table: Table<Order>;
  shippingOptionGroups: ShippingOptionGroup[];
}

export const ShippingOptionFilter: React.FC<ShippingOptionFilterProps> = ({
  shippingOptionGroups,
  table,
}) => {
  const [shippingOption, setShippingOption] = useState<number | null>(null);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const shippingCost = searchParams.get("shippingCost");
    if (!shippingCost || isNaN(+shippingCost)) setShippingOption(null);
    else setShippingOption(+shippingCost);
  }, [searchParams.get("shippingCost")]);

  useEffect(() => {
    const currentQuery = qs.parse(searchParams.toString());
    if (shippingOption !== null) {
      currentQuery.shippingCost = shippingOption.toString();
    } else delete currentQuery.shippingCost;
    table.resetPageIndex();
    const urlWithShippingOptionQuery = qs.stringifyUrl({
      url: pathname,
      query: currentQuery,
    });
    router.push(urlWithShippingOptionQuery, { scroll: false });
  }, [shippingOption]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="h-8 border-dashed">
          <PlusCircledIcon className="mr-2 h-4 w-4" />
          Shipping option
          {shippingOption !== null && (
            <>
              <Separator orientation="vertical" className="mx-2 h-4" />
              <Badge
                variant="secondary"
                className="rounded-sm px-1 font-normal capitalize"
              >
                {getShippingOption(shippingOption)}
              </Badge>
            </>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0" align="start">
        <Command>
          <CommandList>
            <CommandGroup>
              {([0, 15] as const).map((option) => (
                <CommandItem
                  key={option}
                  onSelect={() => setShippingOption(option)}
                >
                  <div
                    className={cn(
                      "mr-2 h-4 w-4",
                      shippingOption === option
                        ? "text-primary"
                        : "opacity-50 [&_svg]:invisible",
                    )}
                  >
                    <DotFilledIcon className="h-4 w-4" />
                  </div>
                  <span>{getShippingOption(option)}</span>
                  {shippingOptionGroups.find(
                    (group) => +group.shippingCost === option,
                  )?._count !== null && (
                    <span className="ml-auto flex h-4 w-4 items-center justify-center font-mono text-xs">
                      {
                        shippingOptionGroups.find(
                          (group) => +group.shippingCost === option,
                        )?._count.id
                      }
                    </span>
                  )}
                </CommandItem>
              ))}
            </CommandGroup>
            {shippingOption !== null && (
              <>
                <CommandSeparator />
                <CommandGroup>
                  <CommandItem
                    onSelect={() => setShippingOption(null)}
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
