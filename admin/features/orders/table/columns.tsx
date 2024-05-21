import { CopyButton } from "@/features/common/components";
import { formatPrice } from "@/features/common/utils";
import { Badge } from "@/features/ui/badge";
import { Button } from "@/features/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/features/ui/tooltip";
import { ViewfinderCircleIcon } from "@heroicons/react/24/outline";
import { ColumnDef } from "@tanstack/react-table";
import format from "date-fns/format";
import { useRouter } from "next/navigation";
import { Order } from "../types/order";
import { getCountryName, getShippingOption } from "../utils";

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
    id: "total",
    accessorKey: "total",
    header: () => <div className="text-right">Total</div>,
    cell: ({ row }) => (
      <div className="text-right font-medium">
        {formatPrice(row.original.total)}
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
    id: "email",
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => <div>{row.original.email}</div>,
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
    header: "Shipping option",
    cell: ({ row }) => (
      <div className="text-sm text-muted-foreground">
        {getShippingOption(+row.original.shippingCost)}
      </div>
    ),
  },
  {
    id: "createdAt",
    accessorKey: "createdAt",
    header: "Paid at",
    cell: ({ row }) => (
      <div>{format(new Date(row.original.createdAt), "Pp")}</div>
    ),
  },
  {
    id: "status",
    accessorKey: "deliveredAt",
    header: "Status",
    cell: ({ row }) => (
      <Badge variant={row.original.deliveredAt ? "default" : "secondary"}>
        {row.original.deliveredAt ? "Delivered" : "Pending"}
      </Badge>
    ),
  },

  {
    id: "actions",
    header: () => <div className="text-right">Actions</div>,
    cell: ({ row }) => {
      const router = useRouter();
      return (
        <div className="flex justify-end">
          <CopyButton text="Copy payment ID" content={row.original.id} />
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="icon"
                  onClick={() => router.push(`/orders/${row.original.id}`)}
                  variant="ghost"
                >
                  <ViewfinderCircleIcon className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>View order details</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      );
    },
  },
];
