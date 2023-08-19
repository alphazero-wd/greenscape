import { getCategories } from "@/features/categories/actions";
import { getProducts } from "@/features/products/actions";
import { ProductsTable } from "@/features/products/table/products-table";
import { Breadcrumb, DeleteRecordsModal } from "@/features/ui";
import { getCurrentUser } from "@/features/user/utils";
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
    status?: "public" | "private" | "all";
  };
}

export default async function CategoriesPage({
  searchParams: { limit, offset, order, q, sortBy, status = "all" },
}: CategoriesPageProps) {
  const user = await getCurrentUser();
  if (!user) redirect("/auth/login");
  const url = qs.stringifyUrl({
    url: process.env.NEXT_PUBLIC_API_URL! + "/products",
    query: { limit, offset, order, q, sortBy, status },
  });
  const { count, data, sizes } = await getProducts(url);
  const { data: categories } = await getCategories(
    process.env.NEXT_PUBLIC_API_URL! + "/categories?hierarchy=true",
  );

  return (
    <>
      <div className="max-w-7xl">
        <div className="mb-4">
          <Breadcrumb links={[{ name: "Products", href: `/products` }]} />
        </div>
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
          Products ({count})
        </h1>

        <div className="mt-6 space-y-8">
          <ProductsTable
            categories={categories}
            count={count}
            products={data}
            sizes={sizes}
          />
        </div>
      </div>
      <DeleteRecordsModal entityName="products" />
    </>
  );
}
