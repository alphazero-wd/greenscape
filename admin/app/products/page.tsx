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
    status?: "Active" | "Draft";
  };
}

export default async function CategoriesPage({
  searchParams: { limit, offset, order, q, sortBy, status },
}: CategoriesPageProps) {
  const user = await getCurrentUser();
  if (!user) redirect("/auth/login");
  const query = qs.stringifyUrl({
    url: "",
    query: { limit, offset, order, q, sortBy, status },
  });
  const { count, data } = await getProducts(query);
  // const { data: categories } = await getCategories();

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
          <ProductsTable count={count} products={data} />
        </div>
      </div>
      <DeleteRecordsModal entityName="products" />
    </>
  );
}
