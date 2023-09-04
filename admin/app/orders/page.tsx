import { getOrders } from "@/features/orders/actions";
import { OrdersTable } from "@/features/orders/table";
import { Breadcrumb } from "@/features/ui";
import { getCurrentUser } from "@/features/user/utils";
import { redirect } from "next/navigation";
import qs from "query-string";

export const metadata = {
  title: "Orders",
};

interface OrdersPageProps {
  searchParams: {
    limit?: string;
    offset?: string;
    q?: string;
    totalRange?: string;
    startDate?: string;
    endDate?: string;
    countries?: string;
    shippingCost?: string;
    status?: "pending" | "delivered";
  };
}

export default async function OrdersPage({
  searchParams: {
    limit = "10",
    offset = "0",
    q,
    totalRange,
    startDate,
    endDate,
    countries,
    shippingCost,
    status,
  },
}: OrdersPageProps) {
  const user = await getCurrentUser();
  if (!user) redirect("/auth/login");

  const query = qs.stringifyUrl({
    url: "",
    query: {
      limit,
      offset,
      q,
      totalRange,
      startDate,
      endDate,
      countries,
      shippingCost,
      status,
    },
  });

  const { data, count, countryGroups, statusGroups, shippingOptionGroups } =
    await getOrders(query);
  return (
    <>
      <div className="container max-w-7xl">
        <div className="mb-4">
          <Breadcrumb links={[{ name: "Orders", href: "#" }]} />
        </div>

        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
          Orders ({count})
        </h1>
        <div className="mt-6 space-y-3">
          <OrdersTable
            count={count}
            countryGroups={countryGroups}
            orders={data}
            statusGroups={statusGroups}
            shippingOptionGroups={shippingOptionGroups}
          />
        </div>
      </div>
    </>
  );
}
