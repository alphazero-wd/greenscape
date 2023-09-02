"use client";
import {
  DataTable,
  DataTablePagination,
  DataTableViewOptions,
  Input,
  useTable,
} from "@/features/ui";
import { CountryGroup, Order } from "../types";
import { columns } from "./columns";
import { CountriesFilter } from "./countries-filter";
import { DateRangeFilter } from "./date-range-filter";

interface OrdersTableProps {
  orders: Order[];
  count: number;
  countryGroups: CountryGroup[];
}

export const OrdersTable: React.FC<OrdersTableProps> = ({
  orders,
  count,
  countryGroups,
}) => {
  const { q, setQ, table } = useTable(columns, orders, count);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex flex-1 items-center space-x-2">
          <Input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search orders..."
            className="h-8 w-[250px]"
          />
          <CountriesFilter table={table} countryGroups={countryGroups} />
          <DateRangeFilter table={table} />
        </div>
        <DataTableViewOptions table={table} />
      </div>
      <DataTable columns={columns} table={table} />
      <DataTablePagination table={table} />
    </div>
  );
};
