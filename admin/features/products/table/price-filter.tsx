"use client";
import {
  Button,
  Label,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/features/ui";
import { PlusCircledIcon } from "@radix-ui/react-icons";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";
import { useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { PriceInput } from "../components";

interface PriceFilterProps {
  priceRange: [number, number];
}

export const PriceFilter: React.FC<PriceFilterProps> = ({ priceRange }) => {
  const [minPrice, setMinPrice] = useState(priceRange[0]);
  const [maxPrice, setMaxPrice] = useState(priceRange[1]);
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const price = searchParams.get("price");
    if (!price || isNaN(parseFloat(price))) return;
    const [min, max] = price.split(",").map((val) => +val);
    setMinPrice(min);
    setMaxPrice(max);
  }, [searchParams.get("price")]);

  const filterProductsByPriceRange = useDebouncedCallback(() => {
    const currentQuery = qs.parse(searchParams.toString());
    currentQuery.price = `${minPrice},${maxPrice}`;
    const urlWithPriceRange = qs.stringifyUrl({
      url: pathname,
      query: currentQuery,
    });
    router.push(urlWithPriceRange);
  }, 1000);

  useEffect(() => {
    filterProductsByPriceRange();
  }, [searchParams.toString(), minPrice, maxPrice]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="h-8 border-dashed">
          <PlusCircledIcon className="mr-2 h-4 w-4" />
          Price: ${minPrice} - ${maxPrice}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start">
        <div className="flex gap-x-4">
          <div className="space-y-2">
            <Label>Min</Label>
            <PriceInput
              value={minPrice}
              min={priceRange[0]}
              max={priceRange[1]}
              onChange={(e) => setMinPrice(+e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label>Max</Label>
            <PriceInput
              value={maxPrice}
              min={priceRange[0]}
              max={priceRange[1]}
              onChange={(e) => setMaxPrice(+e.target.value)}
            />
          </div>
        </div>
        <Button
          variant="secondary"
          onClick={() => {
            setMinPrice(priceRange[0]);
            setMaxPrice(priceRange[1]);
          }}
          className="mt-3"
        >
          Reset
        </Button>
      </PopoverContent>
    </Popover>
  );
};
