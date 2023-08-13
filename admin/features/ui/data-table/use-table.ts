import { usePaginate } from "@/features/utils";
import {
  ColumnDef,
  PaginationState,
  VisibilityState,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useEffect, useMemo, useState } from "react";
import { useDebouncedCallback } from "use-debounce";

export const useTable = <TData>(
  columns: ColumnDef<TData>[],
  data: TData[],
  count: number,
  getData: (count: number, data: TData[]) => void,
  entity: "categories" | "plants",
) => {
  const [rowSelection, setRowSelection] = useState({});
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [q, setQ] = useState("");
  const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

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
    onRowSelectionChange: setRowSelection,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
  });

  const { paginate, loading } = usePaginate(entity);
  const search = useDebouncedCallback(async () => {
    paginate({ offset: pageSize * pageIndex, limit: pageSize, q }).then(
      ({ count, data }) => {
        getData(count, data);
      },
    );
  }, 1000);

  useEffect(() => {
    paginate({ limit: pageSize, offset: pageSize * pageIndex }).then(
      ({ data, count }) => getData(count, data),
    );
  }, [pagination]);

  useEffect(() => {
    setPagination({ pageIndex: 0, pageSize });
    search();
  }, [q]);

  return {
    loading,
    q,
    setQ,
    table,
  };
};
