"use client";
import {
  Button,
  Label,
  Popover,
  PopoverContent,
  PopoverTrigger,
  PriceInput,
} from "@/features/ui";
import { formatPrice } from "@/features/utils";
import { PlusCircledIcon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";
import { useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { Order } from "../types";

interface AmountFilterProps {
  table: Table<Order>;
}

export const AmountFilter: React.FC<AmountFilterProps> = ({ table }) => {
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const price = searchParams.get("price");
    if (!price || isNaN(parseFloat(price))) return;
    const [min, max] = price.split(",");
    setMinPrice(min);
    setMaxPrice(max);
  }, [searchParams.get("price")]);

  const filterOrdersByAmountRange = useDebouncedCallback(() => {
    const currentQuery = qs.parse(searchParams.toString());
    if (minPrice || maxPrice)
      currentQuery.amountRange = `${minPrice},${maxPrice}`;
    else delete currentQuery.amountRange;
    table.resetPageIndex();
    const urlWithPriceRange = qs.stringifyUrl({
      url: pathname,
      query: currentQuery,
    });
    router.push(urlWithPriceRange);
  }, 1000);

  useEffect(() => {
    filterOrdersByAmountRange();
  }, [minPrice, maxPrice]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="h-8 border-dashed">
          <PlusCircledIcon className="mr-2 h-4 w-4" />
          Amount
          {(minPrice || maxPrice) && (
            <span>
              : {minPrice ? formatPrice(+minPrice) : "Under "}
              {maxPrice
                ? (minPrice ? " - " : "") + formatPrice(+maxPrice)
                : "+"}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start">
        <div className="flex gap-x-4">
          <div className="flex-1 space-y-2">
            <Label>Min</Label>
            <PriceInput
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
            />
          </div>
          <div className="flex-1 space-y-2">
            <Label>Max</Label>
            <PriceInput
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
            />
          </div>
        </div>
        <Button
          onClick={() => {
            setMinPrice("");
            setMaxPrice("");
          }}
          className="mt-3 w-full"
        >
          Reset
        </Button>
      </PopoverContent>
    </Popover>
  );
};
