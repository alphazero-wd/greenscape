"use client";
import React, { useEffect, useState } from "react";
import { useBagStore } from "../contexts";
import { BagItem } from "./bag-item";
import Link from "next/link";
import { Button } from "@/features/ui/button";

export const BagList = () => {
  const [mounted, setMounted] = useState(false);
  const { bag, clearBag } = useBagStore();

  useEffect(() => setMounted(true), []);
  if (!mounted)
    return (
      <section className="lg:col-span-7 mt-8">
        <p className="text-gray-500">Loading bag...</p>
      </section>
    );
  if (bag.length === 0)
    return (
      <section className="lg:col-span-7 mt-8">
        <p className="text-gray-500">Your bag is currently empty</p>
        <Button size="lg" className="mt-4">
          <Link href="/products">Continue shopping</Link>
        </Button>
      </section>
    );

  return (
    <section className="lg:col-span-7">
      <ul className="divide-y divide-gray-200">
        {bag.map((item) => (
          <BagItem key={item.id} item={item} />
        ))}
      </ul>
      <Button variant="destructive" onClick={clearBag} className="mt-6">
        Clear bag
      </Button>
    </section>
  );
};
