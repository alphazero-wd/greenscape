"use client";
import {
  ColumnDef,
  PaginationState,
  VisibilityState,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";
import { useEffect, useMemo, useState } from "react";
import { useDebouncedCallback } from "use-debounce";

export const useTable = <TData>(
  columns: ColumnDef<TData>[],
  data: TData[],
  count: number,
) => {
  const [rowSelection, setRowSelection] = useState({});
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [q, setQ] = useState("");
  const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  useEffect(() => {
    const offset = searchParams.get("offset");
    if (offset && !isNaN(parseInt(offset)))
      setPagination({ pageSize, pageIndex: +offset });
    const limit = searchParams.get("limit");
    if (limit && !isNaN(parseInt(limit)))
      setPagination({ pageIndex, pageSize: +limit });
  }, [searchParams.get("offset"), searchParams.get("limit")]);

  useEffect(() => {
    setQ(searchParams.get("q") || "");
  }, [searchParams.get("q")]);

  const pagination = useMemo(
    () => ({
      pageIndex,
      pageSize,
    }),
    [pageIndex, pageSize],
  );

  const pageCount = useMemo(
    () => Math.ceil(count / pagination.pageSize),
    [count, pagination.pageSize],
  );
  const table = useReactTable({
    data,
    columns,
    pageCount,
    state: { columnVisibility, rowSelection, pagination },
    onPaginationChange: setPagination,
    enableRowSelection: true,
    manualPagination: true,
    manualSorting: true,
    manualFiltering: true,
    onRowSelectionChange: setRowSelection,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
  });

  const updateQueries = useDebouncedCallback(() => {
    if (q) table.resetPageIndex();
    const currentQuery = qs.parse(searchParams.toString());
    currentQuery.offset = (pageIndex * pageSize).toString();
    currentQuery.limit = pageSize.toString();
    currentQuery.q = q;
    const url = qs.stringifyUrl({
      url: pathname,
      query: currentQuery,
    });
    router.push(url, { scroll: false });
  }, 500);

  useEffect(() => {
    updateQueries();
  }, [pagination, router, q, searchParams.toString()]);

  return {
    q,
    setQ,
    table,
  };
};
