import { getCategoriesTree } from "@/features/categories/actions";
import {
  aggregateProducts,
  getProducts,
  paginateProducts,
} from "@/features/products/actions";
import { ProductsTable } from "@/features/products/table";
import { Status } from "@/features/products/types";
import { Breadcrumb } from "@/features/ui/breadcrumb";
import { Button } from "@/features/ui/button";
import { getCurrentUser } from "@/features/user/utils";
import { PlusIcon } from "lucide-react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { redirect } from "next/navigation";
import qs from "query-string";

const DeleteRecordsModal = dynamic(
  () => import("@/features/common/delete-records/modal"),
);

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
    status?: Status;
    price?: number;
    inStock?: string;
    from?: string;
    to?: string;
  };
  params: {
    slug?: string[];
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
    price,
    inStock,
    from,
    to,
  },
  params: { slug },
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
      price,
      inStock,
      from,
      to,
    },
  });
  const data = await getProducts(slug?.at(-1), query);
  const count = await paginateProducts(slug?.at(-1), query);
  const { inStockGroups, statusGroups } = await aggregateProducts(query);

  const categories = await getCategoriesTree();

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
