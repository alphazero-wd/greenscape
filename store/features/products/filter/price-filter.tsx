"use client";
import React, { useEffect, useState } from "react";
import qs from "query-string";
import { Button, Label, PriceInput } from "@/features/ui";
import { useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

export const PriceFilter = () => {
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const price = searchParams.get("price");
    if (price) {
      const [min, max] = price.split(",");
      setMinPrice(!isNaN(+min) ? min : "");
      setMaxPrice(!isNaN(+max) ? max : "");
    } else {
      setMinPrice("");
      setMaxPrice("");
    }
  }, [searchParams.get("price")]);

  const filterProductsByPriceRange = useDebouncedCallback(() => {
    const currentQuery = qs.parse(searchParams.toString());
    if (
      currentQuery.maxPrice !== maxPrice ||
      currentQuery.minPrice !== minPrice
    ) {
      if (minPrice || maxPrice) {
        currentQuery.price = `${minPrice},${maxPrice}`;
      } else delete currentQuery.price;
      currentQuery.offset = "0";

      const urlWithPriceRange = qs.stringifyUrl({
        url: "/products/category",
        query: currentQuery,
      });
      router.push(urlWithPriceRange, { scroll: false });
    }
  }, 1000);

  useEffect(() => {
    filterProductsByPriceRange();
  }, [searchParams.toString(), minPrice, maxPrice]);

  return (
    <div className="pt-4 space-y-4">
      <Label className="flex-1">Price</Label>
      <div className="flex gap-x-4">
        <div className="space-y-2">
          <Label>Min</Label>
          <PriceInput
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label>Max</Label>
          <PriceInput
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
          />
        </div>
      </div>
      {(minPrice || maxPrice) && (
        <Button
          variant="secondary"
          onClick={() => {
            setMinPrice("");
            setMaxPrice("");
          }}
        >
          Reset
        </Button>
      )}
    </div>
  );
};
