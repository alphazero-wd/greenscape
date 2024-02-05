"use client";
import {
  Button,
  DataTable,
  DataTablePagination,
  DataTableViewOptions,
  Input,
  useTable,
} from "@/features/ui";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";
import {
  CountryGroup,
  Order,
  ShippingOptionGroup,
  StatusGroup,
} from "../types";
import { columns } from "./columns";
import { CountriesFilter } from "./countries-filter";
import { DateRangeFilter } from "./date-range-filter";
import { ShippingOptionFilter } from "./shipping-options-filter";
import { StatusFilter } from "./status-filter";
import { TotalFilter } from "./total-filter";

interface OrdersTableProps {
  orders: Order[];
  count: number;
  countryGroups: CountryGroup[];
  statusGroups: StatusGroup[];
  shippingOptionGroups: ShippingOptionGroup[];
}

export const OrdersTable: React.FC<OrdersTableProps> = ({
  orders,
  count,
  countryGroups,
  statusGroups,
  shippingOptionGroups,
}) => {
  const { q, setQ, table } = useTable(columns, orders, count);
  const searchParams = useSearchParams();
  const router = useRouter();
  const reset = () => {
    const currentQuery = qs.parse(searchParams.toString());
    delete currentQuery.shippingCost;
    delete currentQuery.startDate;
    delete currentQuery.endDate;
    delete currentQuery.totalRange;
    delete currentQuery.status;
    delete currentQuery.countries;
    delete currentQuery.q;
    table.resetPageIndex();
    const resetQuery = qs.stringifyUrl({
      url: "/orders",
      query: currentQuery,
    });
    router.push(resetQuery, { scroll: false });
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <div className="flex flex-col gap-x-2 gap-y-4 lg:flex-1 lg:flex-row">
          <Input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search orders..."
            className="h-8 w-[250px]"
          />
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
            <CountriesFilter table={table} countryGroups={countryGroups} />
            <DateRangeFilter table={table} />
            <TotalFilter table={table} />
            <StatusFilter statusGroups={statusGroups} table={table} />
            <ShippingOptionFilter
              shippingOptionGroups={shippingOptionGroups}
              table={table}
            />
            {(searchParams.get("countries") ||
              searchParams.get("startDate") ||
              searchParams.get("endDate") ||
              searchParams.get("totalRange") ||
              searchParams.get("status") ||
              searchParams.get("q") ||
              searchParams.get("shippingCost")) && (
              <Button
                variant="ghost"
                onClick={reset}
                className="h-8 px-2 lg:px-3"
              >
                Reset
                <XMarkIcon className="ml-2 h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
        <DataTableViewOptions table={table} />
      </div>
      <DataTable columns={columns} table={table} />
      <DataTablePagination table={table} />
    </div>
  );
};
