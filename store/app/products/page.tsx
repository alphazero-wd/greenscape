import qs from "query-string";
import { getCategories, getProducts } from "@/features/products/actions";
import { Breadcrumb } from "@/features/ui";
import { ProductList } from "@/features/products/product-list";
import { DesktopFilter, MobileFilter } from "@/features/products/filter";

interface ProductsPageProps {
  searchParams: {
    limit?: string;
    offset?: string;
    sortBy?: string;
    order?: "asc" | "desc";
    q?: string;
    categoryIds?: string;
    price?: string;
    inStock?: string;
  };
}

export default async function ProductsPage({
  searchParams: {
    limit = "10",
    offset = "0",
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
    query: { limit, offset, sortBy, order, q, price, inStock, categoryIds },
  });
  const { data: products, categoryGroups } = await getProducts(query);
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
          <ProductList
            products={products}
            className="sm:grid-cols-2 lg:pl-12 xl:grid-cols-3"
          />
        </div>
      </main>
    </>
  );
}
