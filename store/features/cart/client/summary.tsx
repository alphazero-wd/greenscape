"use client";

import { useEffect, useState } from "react";
import { useCartStore } from "../contexts";
import { formatPrice } from "@/features/products/utils";
import { Button } from "@/features/ui/button";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import toast from "react-hot-toast";

export const CartSummary = () => {
  const searchParams = useSearchParams();
  const [mounted, setMounted] = useState(false);
  const { cart, getTotalPrice, clearCart } = useCartStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const success = searchParams.get("success");
    const cancelled = searchParams.get("cancelled");
    if (success === "1") {
      toast.success("Payment completed");
      clearCart();
    }
    if (cancelled === "1") toast.error("Payment cancelled");
  }, [searchParams.get("success"), searchParams.get("cancelled")]);

  const onCheckout = async () => {
    try {
      const {
        data: { checkoutUrl },
      } = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/checkout`, {
        cart: cart.map((item) => ({
          productId: item.id,
          qty: item.qty,
        })),
      });

      window.location = checkoutUrl;
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };

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
            Calculated at checkout
          </dd>
        </div>
        <div className="flex justify-between pt-4 border-t border-gray-200 items-center">
          <dt className="text-gray-900 font-medium text-base">Order total</dt>
          <dd className="text-gray-900 font-medium text-base">
            {formatPrice(getTotalPrice())}
          </dd>
        </div>
      </dl>
      <div className="mt-6">
        <Button onClick={onCheckout} size="lg" className="text-base w-full">
          Checkout
        </Button>
      </div>
    </section>
  );
};
