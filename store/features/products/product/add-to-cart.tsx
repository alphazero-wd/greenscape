"use client";
import React, { useEffect, useMemo, useState } from "react";
import { Button } from "@/features/ui";
import { useCartStore } from "@/features/cart/contexts";
import { Product } from "../types";

export const AddToCart = ({ product }: { product: Product }) => {
  const { addToCart, updateQty, findCartItem, removeCartItem } = useCartStore();
  const existingQty = useMemo(
    () => findCartItem(product.id)?.qty || 0,
    [findCartItem(product.id)?.qty]
  );
  const [qty, setQty] = useState(0);

  const onAddToCart = () => {
    const toBeAddedProduct = {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0].url,
      price: product.price,
      inStock: product.inStock,
      category: product.category,
    };
    addToCart({ ...toBeAddedProduct, qty: 1 });
  };

  const rem = useMemo(
    () => product.inStock - existingQty,
    [existingQty, product.inStock]
  );

  useEffect(() => {
    setQty(existingQty);
  }, [existingQty]);

  if (product.inStock === 0)
    return <div className="mt-6 text-red-600 font-semibold">Out of stock</div>;
  if (existingQty === 0)
    return (
      <Button
        className="w-1/2 mt-6 rounded-full"
        size="lg"
        onClick={onAddToCart}
      >
        Add to cart
      </Button>
    );

  return (
    <div className="mt-6">
      <div className="flex justify-between w-1/2 items-center rounded-full p-1 bg-green-500">
        <Button
          className="bg-transparent font-normal hover:bg-green-800 rounded-full text-2xl"
          size="icon"
          onClick={() => {
            if (qty === 1) removeCartItem(product.id);
            else updateQty(product.id, qty - 1);
          }}
        >
          -
        </Button>
        <span className="text-white font-medium text-sm">
          {rem > 0 ? `${existingQty} added` : `Max ${existingQty}`}
        </span>
        <Button
          disabled={rem === 0}
          className="bg-transparent font-normal hover:bg-green-800 rounded-full text-2xl"
          size="icon"
          onClick={() => updateQty(product.id, qty + 1)}
        >
          +
        </Button>
      </div>
    </div>
  );
};
