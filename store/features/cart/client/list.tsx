"use client";
import React, { useEffect, useState } from "react";
import { useCartStore } from "../contexts";
import { CartItem } from "./cart-item";
import Link from "next/link";
import { Button } from "@/features/ui";

export const CartList = () => {
  const [mounted, setMounted] = useState(false);
  const { cart, clearCart } = useCartStore();

  useEffect(() => setMounted(true), []);
  if (!mounted)
    return (
      <section className="lg:col-span-7 mt-8">
        <p className="text-gray-500">Loading cart...</p>
      </section>
    );
  if (cart.length === 0)
    return (
      <section className="lg:col-span-7 mt-8">
        <p className="text-gray-500">Your cart is currently empty</p>
        <Button size="lg" className="mt-4">
          <Link href="/products">Continue shopping</Link>
        </Button>
      </section>
    );

  return (
    <section className="lg:col-span-7">
      <ul className="divide-y divide-gray-200">
        {cart.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}
      </ul>
      <Button onClick={clearCart} className="mt-6">
        Clear cart
      </Button>
    </section>
  );
};
