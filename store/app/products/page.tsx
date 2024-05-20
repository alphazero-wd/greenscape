import { PAGE_SIZE } from "@/constants";
import { getCategoriesTree } from "@/features/categories/actions";
import { getProducts, paginateProducts } from "@/features/products/actions";
import { DesktopFilter, MobileFilter } from "@/features/products/filter";
import { Pagination } from "@/features/products/pagination";
import { ProductList } from "@/features/products/product-list";
import { SortSelect } from "@/features/products/sort";
import { Breadcrumb } from "@/features/ui/breadcrumb";
import qs from "query-string";
import { ProductsClient } from "../../features/products";

interface ProductsPageProps {
  searchParams: {
    offset?: string;
    sortBy?: string;
    order?: "asc" | "desc";
    q?: string;
    price?: string;
    inStock?: "true";
  };
}

export const metadata = {
  title: "Products",
};

export default async function ProductsPage({
  searchParams: { offset, sortBy = "id", order = "asc", q, price, inStock },
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
    },
  });
  const products = await getProducts(query);
  const count = await paginateProducts(query);
  const categories = await getCategoriesTree();

  return (
    <ProductsClient products={products} count={count} categories={categories} />
  );
}
