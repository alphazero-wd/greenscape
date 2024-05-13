import { getCategories } from "@/features/categories/actions";
import { DeleteRecordsModal } from "@/features/common/delete-records";
import { getProducts } from "@/features/products/actions";
import { ProductsTable } from "@/features/products/table";
import { Breadcrumb } from "@/features/ui/breadcrumb";
import { Button } from "@/features/ui/button";
import { getCurrentUser } from "@/features/user/utils";
import { PlusIcon } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import qs from "query-string";

export const metadata = {
  title: "Products",
};

interface ProductsPageProps {
  searchParams: {
    limit?: string;
    offset?: string;
    sortBy?: string;
    order?: "asc" | "desc";
    q?: string;
    status?: "Active" | "Draft";
    categoryIds?: string;
    price?: number;
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
}: ProductsPageProps) {
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
  const { count, data, statusGroups, categoryGroups, inStockGroups } =
    await getProducts(query);
  const {
    data: { categories },
  } = await getCategories();

  return (
    <>
      <div className="container max-w-7xl">
        <div className="mb-4">
          <Breadcrumb links={[{ name: "Products", href: "#" }]} />
        </div>
        <div className="flex items-center justify-between gap-x-4">
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Products ({count})
          </h1>

          <Button>
            <Link href="/products/create" className="flex items-center">
              <PlusIcon className="mr-2 h-4 w-4" />
              Add
            </Link>
          </Button>
        </div>
        <div className="mt-6 space-y-3">
          <ProductsTable
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
