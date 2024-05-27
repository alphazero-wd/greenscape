"use client";
import { PriceInput } from "@/features/common/components";
import { formatPrice } from "@/features/common/utils";
import { Button } from "@/features/ui/button";
import { Label } from "@/features/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/features/ui/popover";
import { PlusCircledIcon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";
import { useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { Order } from "../types";

interface TotalFilterProps {
  table: Table<Order>;
}

export const TotalFilter: React.FC<TotalFilterProps> = ({ table }) => {
  const [minTotal, setMinTotal] = useState("");
  const [maxTotal, setMaxTotal] = useState("");
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const totalRange = searchParams.get("totalRange");
    if (!totalRange) {
      setMinTotal("");
      setMaxTotal("");
    } else {
      const [min, max] = totalRange.split(",");
      setMinTotal(!isNaN(+min) ? min : "");
      setMaxTotal(!isNaN(+max) ? max : "");
    }
  }, [searchParams.get("totalRange")]);

  const filterOrdersByTotalRange = useDebouncedCallback(() => {
    const currentQuery = qs.parse(searchParams.toString());
    if (minTotal || maxTotal)
      currentQuery.totalRange = `${minTotal},${maxTotal}`;
    else delete currentQuery.totalRange;
    table.resetPageIndex();
    const urlWithTotalRange = qs.stringifyUrl({
      url: pathname,
      query: currentQuery,
    });
    router.push(urlWithTotalRange, { scroll: false });
  }, 1000);

  useEffect(() => {
    filterOrdersByTotalRange();
  }, [minTotal, maxTotal]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="h-8 border-dashed">
          <PlusCircledIcon className="mr-2 h-4 w-4" />
          Total
          {(minTotal || maxTotal) && (
            <span>
              : {minTotal ? formatPrice(+minTotal) : "Under "}
              {maxTotal
                ? (minTotal ? " - " : "") + formatPrice(+maxTotal)
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
              value={minTotal}
              onChange={(e) => setMinTotal(e.target.value)}
            />
          </div>
          <div className="flex-1 space-y-2">
            <Label>Max</Label>
            <PriceInput
              value={maxTotal}
              onChange={(e) => setMaxTotal(e.target.value)}
            />
          </div>
        </div>
        <Button
          onClick={() => {
            setMinTotal("");
            setMaxTotal("");
          }}
          className="mt-3 w-full"
        >
          Reset
        </Button>
      </PopoverContent>
    </Popover>
  );
};
