import qs from "query-string";
import { getCategories, getProducts } from "@/features/products/actions";
import { Breadcrumb } from "@/features/ui";
import { ProductList } from "@/features/products/product-list";
import {
  DesktopFilter,
  MobileFilter,
  Search,
} from "@/features/products/filter";
import { SortSelect } from "@/features/products/sort";
import { Pagination } from "@/features/products/pagination";
import { PAGE_SIZE } from "@/constants";

interface ProductsPageProps {
  searchParams: {
    offset?: string;
    sortBy?: string;
    order?: "asc" | "desc";
    q?: string;
    categoryIds?: string;
    price?: string;
    inStock?: "true";
  };
}

export const metadata = {
  title: "Products",
};

export default async function ProductsPage({
  searchParams: {
    offset,
    sortBy = "id",
    order = "asc",
    q,
    price,
    inStock,
    categoryIds,
  },
}: ProductsPageProps) {
  const query = qs.stringifyUrl({
    url: "",
    query: {
      limit: PAGE_SIZE.toString(),
      offset,
      sortBy,
      order,
      q,
      price,
      inStock,
      categoryIds,
    },
  });
  const { data: products, categoryGroups, count } = await getProducts(query);
  const { data: categories } = await getCategories();

  return (
    <>
      <div className="border-b border-gray-200">
        <div className="lg:px-8 py-4 sm:px-6 px-4 container max-w-7xl">
          <Breadcrumb links={[{ name: "Products", href: "#" }]} />
        </div>
      </div>

      <main className="lg:px-8 sm:px-6 px-4 container max-w-2xl lg:max-w-7xl">
        <div className="pt-24 pb-10 border-b border-gray-200">
          <h1 className="font-bold text-4xl tracking-tight text-gray-900">
            Products
          </h1>
          <p className="text-gray-500">
            Check out the latest release of iPhone 14 Pro Max, a new powerhouse!
          </p>
        </div>
        <div className="pt-12 lg:flex relative pb-24">
          <MobileFilter
            categories={categories}
            categoryGroups={categoryGroups}
          />
          <DesktopFilter
            categories={categories}
            categoryGroups={categoryGroups}
          />
          <div className="mt-6 w-full space-y-4 lg:pl-12 lg:mt-0">
            <div className="flex items-center gap-x-4">
              <Search />
              <SortSelect />
            </div>
            {q && (
              <div className="text-gray-500 text-sm">
                Search results for{" "}
                <span className="font-semibold text-gray-800">
                  &quot;{q}&quot;
                </span>
              </div>
            )}
            {products.length === 0 ? (
              <div className="h-1/4 flex flex-col justify-center">
                <h2 className="text-2xl font-bold tracking-tight mt-4 text-gray-900 sm:text-3xl">
                  No products found
                </h2>
                <p className="text-base leading-7 text-gray-600 mt-2">
                  We couldn't find any products matching your selection.
                </p>
              </div>
            ) : (
              <ProductList
                products={products}
                className="sm:grid-cols-2 xl:grid-cols-3"
              />
            )}
            <div className="mt-8 flex-1">
              <Pagination totalCount={count} />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
