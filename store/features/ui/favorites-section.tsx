import Link from "next/link";
import React from "react";
import { getProducts } from "@/features/products/actions";
import { ProductList } from "@/features/products/product-list";

export const FavoritesSection = async () => {
  const { data: favoriteProducts } = await getProducts(
    "?limit=4&status=Active&inStock=true"
  );

  return (
    <section className="sm:pt-32 lg:px-8 sm:px-6 pt-24 px-4 max-w-2xl lg:max-w-7xl container">
      <div className="sm:flex sm:justify-between sm:items-baseline">
        <h2 className="text-gray-900 tracking-tight font-bold text-2xl">
          Our Favorites
        </h2>

        <Link
          className="sm:block text-primary font-semibold text-sm hidden hover:text-green-400"
          href="/products/category"
        >
          Browse all products
          <span> →</span>
        </Link>
      </div>

      <ProductList
        products={favoriteProducts}
        className="mt-6 lg:grid-cols-4 md:grid-cols-2"
      />
      <Link
        className="mt-6 block text-primary font-semibold text-sm sm:hidden hover:text-green-400"
        href="/products/category"
      >
        Browse all products
        <span> →</span>
      </Link>
    </section>
  );
};
