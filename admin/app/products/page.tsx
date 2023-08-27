import { getCategories } from "@/features/categories/actions";
import { getProducts } from "@/features/products/actions";
import { ProductsTable } from "@/features/products/table";
import { Breadcrumb, Button, DeleteRecordsModal } from "@/features/ui";
import { getCurrentUser } from "@/features/user/utils";
import { PlusIcon } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import qs from "query-string";

export const metadata = {
  title: "Products",
};

interface CategoriesPageProps {
  searchParams: {
    limit?: string;
    offset?: string;
    sortBy?: string;
    order?: "asc" | "desc";
    q?: string;
    status?: "Active" | "Draft";
    categoryIds?: string;
    price?: string;
    inStock?: string;
  };
}

export default async function ProductsPage({
  searchParams: {
    limit,
    offset,
    order,
    q,
    sortBy,
    status,
    categoryIds,
    price,
    inStock,
  },
}: CategoriesPageProps) {
  const user = await getCurrentUser();
  if (!user) redirect("/auth/login");
  const query = qs.stringifyUrl({
    url: "",
    query: {
      limit,
      offset,
      order,
      q,
      sortBy,
      status,
      categoryIds,
      price,
      inStock,
    },
  });
  const {
    count,
    data,
    statusGroups,
    categoryGroups,
    priceRange,
    inStockGroups,
  } = await getProducts(query);
  const { data: categories } = await getCategories();

  return (
    <>
      <div className="container max-w-7xl">
        <div className="mb-4">
          <Breadcrumb links={[{ name: "Products", href: "#" }]} />
        </div>
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
          Products ({count})
        </h1>
        <div className="mt-6 space-y-3">
          <Button variant="outline">
            <Link href="/products/create" className="flex items-center">
              <PlusIcon className="mr-2 h-4 w-4" />
              Create new product
            </Link>
          </Button>
          <ProductsTable
            priceRange={priceRange}
            categoryGroups={categoryGroups}
            categories={categories}
            statusGroups={statusGroups}
            count={count}
            products={data}
            inStockGroups={inStockGroups}
          />
        </div>
      </div>
      <DeleteRecordsModal entityName="products" />
    </>
  );
}
