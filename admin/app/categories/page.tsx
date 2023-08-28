import { getCategories } from "@/features/categories/actions";
import {
  CreateCategoryButton,
  CreateCategoryModal,
} from "@/features/categories/create-category";
import { EditCategoryModal } from "@/features/categories/edit-category";
import { CategoriesTable } from "@/features/categories/table";
import { Breadcrumb, DeleteRecordsModal } from "@/features/ui";
import { getCurrentUser } from "@/features/user/utils";
import { redirect } from "next/navigation";
import qs from "query-string";

export const metadata = {
  title: "Categories",
};

interface CategoriesPageProps {
  searchParams: {
    limit?: string;
    offset?: string;
    sortBy?: string;
    order?: "asc" | "desc";
    q?: string;
  };
}

export default async function CategoriesPage({
  searchParams,
}: CategoriesPageProps) {
  const user = await getCurrentUser();
  if (!user) redirect("/auth/login");
  const query = qs.stringifyUrl({
    url: "",
    query: searchParams,
  });
  const { count, data } = await getCategories(query);

  return (
    <>
      <div className="container max-w-3xl">
        <div className="mb-4">
          <Breadcrumb links={[{ name: "Categories", href: "#" }]} />
        </div>
        <div className="flex items-center justify-between gap-x-4">
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Categories ({count})
          </h1>

          <CreateCategoryButton />
        </div>

        <div className="mt-6 space-y-8">
          <CategoriesTable categories={data} count={count} />
        </div>
      </div>
      <CreateCategoryModal />
      <EditCategoryModal />
      <DeleteRecordsModal entityName="categories" />
    </>
  );
}
