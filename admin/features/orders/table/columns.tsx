import { DataTableColumnHeader } from "@/features/ui";
import { formatPrice } from "@/features/utils";
import { ColumnDef } from "@tanstack/react-table";
import { Order } from "../types/order";
import { getCountryName, getPostalAddress, getShippingOption } from "../utils";

export const columns: ColumnDef<Order>[] = [
  {
    id: "id",
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => (
      <div className="line-clamp-1 w-[100px] font-mono text-sm">
        {row.original.id}
      </div>
    ),
  },
  {
    id: "customer",
    accessorKey: "customer",
    header: "Customer",
    cell: ({ row }) => <div>{row.original.customer}</div>,
  },
  {
    id: "amount",
    accessorKey: "amount",
    header: () => <div className="text-right">Amount</div>,
    cell: ({ row }) => (
      <div className="text-right font-medium">
        {formatPrice(row.original.amount)}
      </div>
    ),
  },
  {
    id: "phone",
    accessorKey: "Phone",
    header: "Phone number",
    cell: ({ row }) => <div>{row.original.phone}</div>,
  },
  {
    id: "address",
    accessorKey: "address",
    header: "Address",
    cell: ({
      row: {
        original: { line1, line2, city, postalCode, country, state },
      },
    }) => (
      <div className="whitespace-pre-wrap">
        {getPostalAddress({ line1, line2, city, postalCode, country, state })}
      </div>
    ),
  },
  {
    id: "country",
    accessorKey: "country",
    header: "Country",
    cell: ({ row }) => <div>{getCountryName(row.original.country || "")}</div>,
  },
  {
    id: "shippingCost",
    accessorKey: "shippingCost",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Shipping option" />
    ),
    cell: ({ row }) => (
      <div className="text-sm text-gray-500">
        {getShippingOption(+row.original.shippingCost)}
      </div>
    ),
  },
  {
    id: "email",
    accessorKey: "email",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Email" />;
    },
    cell: ({ row }) => <div>{row.original.email}</div>,
  },
];
