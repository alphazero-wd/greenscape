"use client";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Product } from "@/features/products/types";
import { useCartStore } from "../contexts";
import { Skeleton } from "@/features/ui";
import { ProductList } from "@/features/products/product-list";
import { getProducts } from "@/features/products/actions";

export const Related = () => {
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const { cart } = useCartStore();
  const cartItemIds = useMemo(() => cart.map((item) => item.id), [cart]);
  const cartCategoryIds = useMemo(
    () => Array.from(new Set(cart.map((item) => item.category.id))),
    [cart]
  );

  const fetchRelatedProducts = useCallback(async () => {
    setLoading(true);
    const { data: products } = await getProducts(
      `?limit=4&categoryIds=${cartCategoryIds.join(
        ","
      )}&refIds=${cartItemIds.join(",")}`
    );
    setRelatedProducts(products);
    setLoading(false);
  }, [cart, cartItemIds, cartCategoryIds]);

  useEffect(() => {
    if (cartItemIds.length > 0) fetchRelatedProducts();
  }, [fetchRelatedProducts]);

  if (relatedProducts.length === 0) return null;

  return (
    <section className="mt-24">
      <h2 className="text-gray-900 font-medium text-lg">
        You may also like...
      </h2>
      {loading ? (
        <div className="mt-6 grid lg:grid-cols-4 gap-y-10 gap-x-6 sm:grid-cols-2">
          <Skeleton className="w-full h-[350px] rounded-md" />
          <Skeleton className="w-full h-[350px] rounded-md" />
          <Skeleton className="w-full h-[350px] rounded-md" />
          <Skeleton className="w-full h-[350px] rounded-md" />
        </div>
      ) : (
        <ProductList
          products={relatedProducts}
          className="mt-6 sm:grid-cols-2 lg:grid-cols-4"
        />
      )}
    </section>
  );
};
