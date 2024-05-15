import {
  Badge,
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
  Label,
  Separator,
} from "@/features/ui";
import { EnvelopeIcon, PhoneIcon } from "@heroicons/react/24/solid";
import { format } from "date-fns";
import { Order } from "../types";
import { getShippingOption } from "../utils";

interface OrderOverviewProps {
  order: Order;
}

export const OrderOverview: React.FC<OrderOverviewProps> = ({ order }) => {
  return (
    <div className="flex h-12 items-center space-x-4 text-sm">
      <div className="space-y-2">
        <Label className="block font-normal text-gray-500">Paid at</Label>
        <p className="text-sm text-gray-900">
          {format(new Date(order.createdAt), "MMM d y, h:mm a")}
        </p>
      </div>
      <Separator orientation="vertical" />
      <div>
        <Label className="mb-2 block font-normal text-gray-500">Customer</Label>
        <HoverCard>
          <HoverCardTrigger className="cursor-pointer text-sm font-medium text-primary hover:text-gray-900">
            {order.customer}
          </HoverCardTrigger>
          <HoverCardContent>
            <Label className="mb-4 block">Customer information</Label>
            <ul className="space-y-2">
              <li className="flex items-center">
                <span className="sr-only">Email</span>
                <EnvelopeIcon className="mr-2 h-4 w-4 text-gray-500" />
                <p>{order.email}</p>
              </li>
              <li className="flex items-center">
                <span className="sr-only">Phone number</span>
                <PhoneIcon className="mr-2 h-4 w-4 text-gray-500" />
                {order.phone}
              </li>
            </ul>
          </HoverCardContent>
        </HoverCard>
      </div>
      <Separator orientation="vertical" />
      <div className="space-y-2">
        <Label className="block font-normal text-gray-500">
          Delivery status
        </Label>
        <Badge variant={order.deliveredAt ? "default" : "secondary"}>
          {order.deliveredAt ? "Delivered" : "Pending"}
        </Badge>
      </div>
      <Separator orientation="vertical" />
      <div className="space-y-2">
        <Label className="block font-normal text-gray-500">
          Shipping option
        </Label>
        <p className="text-sm text-gray-900">
          {getShippingOption(+order.shippingCost)}
        </p>
      </div>
    </div>
  );
};
