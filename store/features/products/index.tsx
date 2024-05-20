"use client";

import qs from "query-string";
import { Category } from "@/features/categories/types";
import { Breadcrumb } from "../ui/breadcrumb";
import { DesktopFilter, MobileFilter } from "./filter";
import { Pagination } from "./pagination";
import { ProductList } from "./product-list";
import { SortSelect } from "./sort";
import { Product } from "./types";
import { useQueryStore } from "./hooks";
import { useEffect } from "react";
import { searchCategory } from "../categories/utils";
import { useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { PAGE_SIZE } from "../../constants";

interface ProductsClientProps {
  count: number;
  categories: Category[];
  products: Product[];
}

export const ProductsClient = ({
  count,
  categories,
  products,
}: ProductsClientProps) => {
  const router = useRouter();
  const minPrice = useQueryStore((state) => state.minPrice);
  const page = useQueryStore((state) => state.page);
  const maxPrice = useQueryStore((state) => state.maxPrice);
  const sortBy = useQueryStore((state) => state.sortBy);
  const order = useQueryStore((state) => state.order);
  const outOfStockIncluded = useQueryStore((state) => state.outOfStockIncluded);
  const selectedCategory = useQueryStore((state) => state.selectedCategory);

  const applyQuery = useDebouncedCallback(() => {
    const offset = (page - 1) * PAGE_SIZE;
    let url = "/products";
    if (selectedCategory) {
      const [path] = searchCategory(categories, selectedCategory, "slug");
      if (!path || path.length === 0) return;
      url += "/category/" + path.map((c) => c.slug).join("/");
    }
    const inStock = outOfStockIncluded ? undefined : "true";

    const urlWithQueries = qs.stringifyUrl({
      url,
      query: {
        price: `${minPrice || ""},${maxPrice || ""}`,
        offset: offset > count ? 0 : offset,
        inStock, // undefined to remove the key-value pair from the URL
        sortBy,
        order,
      },
    });
    router.push(urlWithQueries, { scroll: false });
  }, 500);

  useEffect(() => {
    applyQuery();
  }, [
    minPrice,
    maxPrice,
    page,
    sortBy,
    order,
    outOfStockIncluded,
    selectedCategory,
    categories,
  ]);

  return (
    <main className="lg:px-8 sm:px-6 px-4 container max-w-7xl">
      <div className="pt-24 pb-10">
        <Breadcrumb links={[{ name: "Products", href: "#" }]} />
        <h1 className="font-bold mt-6 text-4xl tracking-tight text-gray-900">
          Products
        </h1>
        <p className="text-gray-500">
          Unleash the Jungle in Your Home with Monstera Deliciosa!
        </p>
      </div>
      <div className="pt-12 lg:ml-0 lg:flex relative pb-24">
        <DesktopFilter categories={categories} />
        <div className="mt-6 -ml-4 lg:ml-0 w-full space-y-4 lg:pl-12 lg:mt-0">
          <div className="flex justify-between items-center gap-x-4">
            <MobileFilter categories={categories} />
            <SortSelect />
          </div>

          {products.length === 0 ? (
            <div className="h-1/4 flex flex-col justify-center">
              <h2 className="text-2xl font-bold tracking-tight mt-4 text-gray-900 sm:text-3xl">
                No products found
              </h2>
              <p className="text-base leading-7 text-gray-600 mt-2">
                We couldn&apos;t find any products matching your selection.
              </p>
            </div>
          ) : (
            <ProductList className="px-4 lg:px-0" products={products} />
          )}
          <div className="mt-8 flex-1">
            <Pagination totalCount={count} />
          </div>
        </div>
      </div>
    </main>
  );
};
