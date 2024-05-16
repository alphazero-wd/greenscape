"use client";
import { Label } from "@/features/ui/label";
import { Switch } from "@/features/ui/switch";
import React, { useEffect } from "react";
import { Order } from "../types";
import { getPostalAddress } from "../utils";
import { useSetDelivered } from "./use-set-delivered";

interface OrderSummaryProps {
  order: Order;
}

export const OrderSummary: React.FC<OrderSummaryProps> = ({
  order: {
    id,
    line1,
    line2,
    city,
    state,
    country,
    customer,
    postalCode,
    email,
    phone,
    deliveredAt,
  },
}) => {
  const { delivered, setDelivered, updateDeliveryStatus } = useSetDelivered(
    id,
    deliveredAt,
  );

  useEffect(() => {
    updateDeliveryStatus();
  }, [delivered]);

  return (
    <div className="space-y-6">
      <div className="grid w-full grid-cols-3 gap-x-8">
        <Label>Customer details</Label>
        <ul className="col-span-2 space-y-1 text-sm text-gray-600">
          <li>{customer}</li>
          <li>{phone}</li>
          <li>{email}</li>
        </ul>
      </div>

      <div className="grid w-full grid-cols-3 gap-x-8">
        <Label>Shipping details</Label>
        <p className="col-span-2 whitespace-pre-wrap text-sm text-gray-600">
          {getPostalAddress({
            line1,
            line2,
            city,
            state,
            postalCode,
            country,
            customer,
          })}
        </p>
      </div>

      {!deliveredAt && (
        <div className="flex items-center space-x-2">
          <Switch
            checked={delivered}
            onCheckedChange={() =>
              setDelivered(
                confirm(
                  "Do you want to set this order to delivered? This cannot be undone",
                ),
              )
            }
            disabled={delivered}
            id="delivered"
          />
          <Label htmlFor="delivered">Set to delivered</Label>
        </div>
      )}
    </div>
  );
};
