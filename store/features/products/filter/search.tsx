"use client";
import { useEffect, useState } from "react";
import qs from "query-string";
import { Input } from "@/features/ui";
import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

export const Search = () => {
  const [q, setQ] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const searchQuery = searchParams.get("q");
    if (!searchQuery) return;
    setQ(searchQuery);
  }, [searchParams.get("q")]);

  const searchProducts = useDebouncedCallback(() => {
    const currentQuery = qs.parse(searchParams.toString());
    if (q) currentQuery.q = q;
    else delete currentQuery.q;
    const urlWithSearchQuery = qs.stringifyUrl({
      url: "/products",
      query: currentQuery,
    });
    router.push(urlWithSearchQuery);
  }, 1000);

  useEffect(() => {
    searchProducts();
  }, [q, searchParams.toString()]);

  return (
    <div className="relative flex-1 rounded-md shadow-sm">
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
        <MagnifyingGlassIcon className="text-gray-500 w-5 h-5" />
      </div>
      <Input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search..."
        className="px-10 text-gray-900"
      />
      {q && (
        <div
          onClick={() => setQ("")}
          className="absolute cursor-pointer right-0 flex inset-y-0 items-center pr-3"
        >
          <XMarkIcon className="w-5 h-5 text-gray-500" />
        </div>
      )}
    </div>
  );
};
