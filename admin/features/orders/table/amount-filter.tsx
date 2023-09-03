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
  const [minAmount, setMinAmount] = useState("");
  const [maxAmount, setMaxAmount] = useState("");
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const amountRange = searchParams.get("amountRange");
    if (!amountRange || isNaN(parseFloat(amountRange))) {
      setMinAmount("");
      setMaxAmount("");
    } else {
      const [min, max] = amountRange.split(",");
      setMinAmount(min);
      setMaxAmount(max);
    }
  }, [searchParams.get("amountRange")]);

  const filterOrdersByAmountRange = useDebouncedCallback(() => {
    const currentQuery = qs.parse(searchParams.toString());
    if (minAmount || maxAmount)
      currentQuery.amountRange = `${minAmount},${maxAmount}`;
    else delete currentQuery.amountRange;
    table.resetPageIndex();
    const urlWithAmountRange = qs.stringifyUrl({
      url: pathname,
      query: currentQuery,
    });
    router.push(urlWithAmountRange);
  }, 1000);

  useEffect(() => {
    filterOrdersByAmountRange();
  }, [minAmount, maxAmount]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="h-8 border-dashed">
          <PlusCircledIcon className="mr-2 h-4 w-4" />
          Amount
          {(minAmount || maxAmount) && (
            <span>
              : {minAmount ? formatPrice(+minAmount) : "Under "}
              {maxAmount
                ? (minAmount ? " - " : "") + formatPrice(+maxAmount)
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
              value={minAmount}
              onChange={(e) => setMinAmount(e.target.value)}
            />
          </div>
          <div className="flex-1 space-y-2">
            <Label>Max</Label>
            <PriceInput
              value={maxAmount}
              onChange={(e) => setMaxAmount(e.target.value)}
            />
          </div>
        </div>
        <Button
          onClick={() => {
            setMinAmount("");
            setMaxAmount("");
          }}
          className="mt-3 w-full"
        >
          Reset
        </Button>
      </PopoverContent>
    </Popover>
  );
};
