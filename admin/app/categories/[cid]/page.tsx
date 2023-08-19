import { getCategory, getSubcategories } from "@/features/categories/actions";
import {
  CreateCategoryButton,
  CreateCategoryModal,
} from "@/features/categories/create-category";
import { EditCategoryModal } from "@/features/categories/edit-category";
import { CategoriesTable } from "@/features/categories/table";
import { displayHierarchy } from "@/features/categories/utils";
import { Breadcrumb, DeleteRecordsModal } from "@/features/ui";
import { getCurrentUser } from "@/features/user/utils";
import { redirect } from "next/navigation";
import qs from "query-string";

interface CategoryPageProps {
  searchParams: {
    limit?: string;
    offset?: string;
    sortBy?: string;
    order?: "asc" | "desc";
    q?: string;
  };
  params: {
    cid: string;
  };
}

export async function generateMetadata({ params: { cid } }: CategoryPageProps) {
  const { data: category } = await getCategory(cid);
  let title = "Categories - ";
  title = displayHierarchy(category, title);
  return { title };
}

export default async function CategoryPage({
  searchParams,
  params: { cid },
}: CategoryPageProps) {
  const user = await getCurrentUser();
  if (!user) redirect("/auth/login");

  const { data: category } = await getCategory(cid);
  if (!category) redirect("/not-found");

  const url = qs.stringifyUrl({
    url: process.env.NEXT_PUBLIC_API_URL! + "/categories",
    query: { ...searchParams, pid: cid },
  });

  const { count, data } = await getSubcategories(url);

  const pathsWithParent = category.parentCategory?.parentCategory
    ? [
        {
          name: category.parentCategory.parentCategory.name,
          href: `/categories/${category.parentCategory.parentCategory}`,
        },
        {
          name: category.parentCategory.name,
          href: `/categories/${category.parentCategory}`,
        },
        { name: category.name, href: `/categories/${category.id}` },
      ]
    : category.parentCategory
    ? [
        {
          name: category.parentCategory.name,
          href: `/categories/${category.parentCategoryId}`,
        },
        { name: category.name, href: `/categories/${category.id}` },
      ]
    : ([{ name: category.name, href: `/categories/${category.id}` }] as const);

  return (
    <>
      <div className="max-w-5xl">
        <div className="mb-4">
          <Breadcrumb
            links={[
              { name: "Categories", href: `/categories` },
              ...pathsWithParent,
            ]}
          />
        </div>
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
          Categories ({count})
        </h1>

        <div className="mt-3">
          <CreateCategoryButton />
        </div>

        <div className="mt-6 space-y-8">
          <CategoriesTable categories={data} count={count} />
        </div>
      </div>
      <CreateCategoryModal pid={+cid} />
      <EditCategoryModal />
      <DeleteRecordsModal entityName="categories" />
    </>
  );
}
