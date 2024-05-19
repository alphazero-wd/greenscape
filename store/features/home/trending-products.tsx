import Link from "next/link";
import { getProducts } from "../products/actions";
import { Button } from "../ui/button";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { ProductList } from "@/features/products/product-list";

export const TrendingProducts = async () => {
  const products = await getProducts("?limit=4&sortBy=createdAt&order=desc");

  return (
    <section className="lg:py-32 sm:py-24 py-16 px-4 sm:px-6 lg:px-8">
      <div className=" max-w-7xl container">
        <div className="flex justify-between items-center">
          <h2 className="font-bold tracking-tight text-xl sm:text-2xl">
            Trending Products
          </h2>
          <Button variant="link" asChild className="text-primary p-0">
            <Link href="/products/category" className="flex gap-2 items-center">
              See more
              <ChevronRightIcon className="w-4 h-4" />
            </Link>
          </Button>
        </div>
        <div className="mt-8 relative">
          <ProductList products={products} />
        </div>
      </div>
    </section>
  );
};
