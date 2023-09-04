import { getOrder } from "@/features/orders/actions";
import {
  OrderItems,
  OrderOverview,
  OrderSummary,
} from "@/features/orders/order";
import { Breadcrumb, Separator } from "@/features/ui";
import { getCurrentUser } from "@/features/user/utils";
import { formatPrice } from "@/features/utils";
import { redirect } from "next/navigation";

interface OrderPageProps {
  params: {
    id: string;
  };
}

export const generateMetadata = async ({ params: { id } }: OrderPageProps) => {
  const order = await getOrder(id);
  if (!order) return { title: "Order not found" };
  return { title: "Order #" + order.id };
};

export default async function OrderPage({ params: { id } }: OrderPageProps) {
  const user = await getCurrentUser();
  if (!user) redirect("/auth/login");

  const order = await getOrder(id);
  if (!order) redirect("/not-found");

  return (
    <div className="container max-w-7xl">
      <div className="mb-4">
        <Breadcrumb
          links={[
            { name: "Orders", href: "/orders" },
            { name: order.id, href: "#" },
          ]}
        />
      </div>
      <div className="space-y-12">
        <div className="mt-8">
          <div className="space-y-1">
            <h2 className="text-2xl font-bold leading-none tracking-tight">
              {formatPrice(order.total)}
            </h2>
            <p className="text-sm text-gray-500">
              Payment ID: <span className="font-mono">{order.id}</span>
            </p>
          </div>
          <Separator className="my-4" />
          <OrderOverview order={order} />
        </div>

        <div>
          <h2 className="text-2xl font-bold leading-none tracking-tight">
            Checkout summary
          </h2>
          <Separator className="my-4" />
          <OrderSummary order={order} />
        </div>

        <div>
          <h2 className="text-2xl font-bold leading-none tracking-tight">
            Purchased items
          </h2>
          <Separator className="my-4" />
          <OrderItems order={order} />
        </div>
      </div>
    </div>
  );
}
