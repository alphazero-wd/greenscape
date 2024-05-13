import { getCategories } from "@/features/categories/actions";
import { CreateCategoryButton } from "@/features/categories/create-category";
import { CategoriesTable } from "@/features/categories/table";
import { generatePaths } from "@/features/categories/utils";
import { Breadcrumb } from "@/features/ui/breadcrumb";
import { getCurrentUser } from "@/features/user/utils";
import dynamic from "next/dynamic";
import { redirect } from "next/navigation";
import qs from "query-string";

const CreateCategoryModal = dynamic(
  () => import("@/features/categories/create-category/modal"),
);
const EditCategoryModal = dynamic(
  () => import("@/features/categories/edit-category/modal"),
);
const DeleteRecordsModal = dynamic(
  () => import("@/features/common/delete-records/modal"),
);

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
  params: {
    slug?: string[];
  };
}

export default async function CategoriesPage({
  searchParams,
  params,
}: CategoriesPageProps) {
  const user = await getCurrentUser();
  if (!user) redirect("/auth/login");
  const query = qs.stringifyUrl({
    url: "",
    query: searchParams,
  });
  const {
    count,
    data: { categories, parents },
  } = await getCategories(query, params.slug?.at(-1));

  const generateBreadcrumb = () => {
    let route = "/categories";
    const links = [{ name: "Categories", href: route }];
    const paths = generatePaths(parents);
    paths.forEach((path) => {
      route += "/" + path.slug;
      links.push({ name: path.name, href: route });
    });
    return links;
  };

  return (
    <>
      <div className="container max-w-3xl">
        <div className="mb-4">
          <Breadcrumb links={generateBreadcrumb()} />
        </div>
        <div className="flex items-center justify-between gap-x-4">
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Categories ({count})
          </h1>

          <CreateCategoryButton />
        </div>

        <div className="mt-6 space-y-8">
          <CategoriesTable categories={categories} count={count} />
        </div>
      </div>
      <CreateCategoryModal parents={parents} />
      <EditCategoryModal parents={parents} />
      <DeleteRecordsModal entityName="categories" />
    </>
  );
}
