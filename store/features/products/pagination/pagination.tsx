"use client";
import qs from "query-string";
import { useEffect } from "react";
import { usePagination } from "./use-pagination";
import { Button } from "@/features/ui/button";
import { DOTS, PAGE_SIZE } from "@/constants";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useQueryStore } from "../hooks";

interface PaginationProps {
  totalCount: number;
}

export const Pagination: React.FC<PaginationProps> = ({ totalCount }) => {
  const currentPage = useQueryStore((state) => state.page);
  const update = useQueryStore((state) => state.update);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const paginationRange = usePagination({
    currentPage,
    totalCount,
  });

  const router = useRouter();

  useEffect(() => {
    const offset = searchParams.get("offset");
    if (offset && !isNaN(parseInt(offset)))
      update({ page: Math.floor(+offset / PAGE_SIZE) + 1 }); // currentPage starts at 1
  }, [searchParams.get("offset")]);

  useEffect(() => {
    const currentQuery = qs.parse(searchParams.toString());
    currentQuery.offset = ((currentPage - 1) * PAGE_SIZE).toString();
    const urlWithOffset = qs.stringifyUrl({
      url: pathname,
      query: currentQuery,
    });
    router.push(urlWithOffset, { scroll: false });
  }, [currentPage]);

  // If there are less than 2 times in pagination range we shall not render the component
  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    update({ page: currentPage + 1 });
  };

  const onPrevious = () => {
    update({ page: currentPage - 1 });
  };

  return (
    <nav className="flex justify-between items-center">
      <Button
        disabled={currentPage === 1}
        onClick={onPrevious}
        variant="outline"
        className="lg:flex hidden"
      >
        Previous
      </Button>
      <div className="items-center flex gap-x-2">
        {paginationRange.map((page, i) =>
          page === DOTS ? (
            <span key={i} className="font-medium">
              {DOTS}
            </span>
          ) : (
            <Button
              key={i}
              onClick={() =>
                currentPage !== page ? update({ page: page as number }) : {}
              }
              variant={currentPage === page ? "default" : "outline"}
            >
              {page}
            </Button>
          )
        )}
      </div>
      <Button
        onClick={onNext}
        disabled={currentPage === paginationRange.at(-1)}
        variant="outline"
        className="lg:flex hidden"
      >
        Next
      </Button>
    </nav>
  );
};
