"use client";
import qs from "query-string";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/features/ui";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";

export const SortSelect = () => {
  const [sortValue, setSortValue] = useState({
    sortBy: "",
    order: "",
  });

  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const sortByQuery = searchParams.get("sortBy");
    const orderQuery = searchParams.get("order");
    if (sortByQuery && orderQuery)
      setSortValue({ sortBy: sortByQuery, order: orderQuery });
  }, [searchParams.get("sortBy"), searchParams.get("order")]);

  const sortProducts = useDebouncedCallback(() => {
    const currentQuery = qs.parse(searchParams.toString());
    if (sortValue.sortBy) {
      currentQuery.sortBy = sortValue.sortBy;
    } else delete currentQuery.sortBy;

    if (sortValue.order) currentQuery.order = sortValue.order;
    else delete currentQuery.order;
    const urlWithSortQuery = qs.stringifyUrl({
      url: "/products/category",
      query: currentQuery,
    });
    router.push(urlWithSortQuery, { scroll: false });
  }, 1000);

  useEffect(() => {
    sortProducts();
  }, [sortValue, searchParams.toString()]);

  return (
    <Select
      onValueChange={(val) => {
        const [sortBy, order] = val.split(":");
        setSortValue({ sortBy, order });
      }}
      value={`${sortValue.sortBy}:${sortValue.order}`}
    >
      <SelectTrigger className="w-[180px] font-medium">
        {!sortValue.sortBy || !sortValue.order ? "Sort" : <SelectValue />}
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="orders:desc">Most popular</SelectItem>
        <SelectItem value="createdAt:desc">Newest</SelectItem>
        <SelectItem value="price:asc">Price: Low to High</SelectItem>
        <SelectItem value="price:desc">Price: High to Low</SelectItem>
      </SelectContent>
    </Select>
  );
};
