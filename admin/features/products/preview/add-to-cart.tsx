"use client";
import { Button } from "@/features/ui";
import { useMemo, useState } from "react";
import { Product } from "../types";

export const AddToCart = ({ product }: { product: Product }) => {
  const [qty, setQty] = useState(0);
  const rem = useMemo(() => product.inStock - qty, [product.inStock, qty]);

  if (product.inStock === 0)
    return <div className="mt-6 text-sm">Out of stock</div>;
  if (qty === 0)
    return (
      <Button
        className="mt-6 w-1/2 rounded-full bg-blue-500 hover:bg-blue-400"
        size="lg"
        onClick={() => setQty(1)}
      >
        Add to cart
      </Button>
    );

  return (
    <div className="mt-6">
      <div className="flex w-1/2 items-center justify-between rounded-full bg-blue-500 p-1">
        <Button
          className="rounded-full bg-transparent text-2xl font-normal hover:bg-blue-800"
          size="icon"
          onClick={() => setQty(qty - 1)}
        >
          -
        </Button>
        <span className="text-sm font-medium text-white">
          {rem > 0 ? `${qty} added` : `Max ${qty}`}
        </span>
        <Button
          disabled={rem === 0}
          className="rounded-full bg-transparent text-2xl font-normal hover:bg-blue-800"
          size="icon"
          onClick={() => setQty(qty + 1)}
        >
          +
        </Button>
      </div>
    </div>
  );
};
