"use client";

import { useEffect, useState } from "react";
import { useCartStore } from "../contexts";
import { formatPrice } from "@/features/products/utils";
import { SHIPPING_COST, TAX } from "@/constants";
import { Button } from "../../ui";

export const CartSummary = () => {
  const [mounted, setMounted] = useState(false);
  const { cart, getTotalPrice } = useCartStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || cart.length === 0) return null;

  return (
    <section className="lg:col-span-5 h-fit lg:sticky mt-16 rounded-lg bg-gray-50 lg:top-6 lg:p-8 lg:mt-0 sm:p-6 py-6 px-4">
      <h2 className="text-gray-900 font-medium text-lg">Order summary</h2>
      <dl className="mt-6 space-y-4">
        <div className="flex justify-between pt-4 items-center">
          <dt className="text-gray-700 text-sm">Subtotal</dt>
          <dd className="text-gray-900 font-medium text-sm">
            {formatPrice(getTotalPrice())}
          </dd>
        </div>
        <div className="flex justify-between pt-4 border-t border-gray-200 items-center">
          <dt className="text-gray-700 text-sm">Shipping estimate</dt>
          <dd className="text-gray-900 font-medium text-sm">
            {formatPrice(SHIPPING_COST)}
          </dd>
        </div>
        <div className="flex justify-between pt-4 border-t border-gray-200 items-center">
          <dt className="text-gray-700 text-sm">Tax estimate</dt>
          <dd className="text-gray-900 font-medium text-sm">
            {formatPrice(TAX)}
          </dd>
        </div>
        <div className="flex justify-between pt-4 border-t border-gray-200 items-center">
          <dt className="text-gray-900 font-medium text-base">Order total</dt>
          <dd className="text-gray-900 font-medium text-base">
            {formatPrice(getTotalPrice() + SHIPPING_COST + TAX)}
          </dd>
        </div>
      </dl>
      <div className="mt-6">
        <Button size="lg" className="text-base w-full">
          Checkout
        </Button>
      </div>
    </section>
  );
};
