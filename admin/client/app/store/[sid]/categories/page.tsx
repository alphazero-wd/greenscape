import {
  CreateCategoryButton,
  CreateCategoryModal,
} from "@/features/categories/create-category";
import { columns } from "@/features/categories/utils";
import { getStoreById } from "@/features/store/utils";
import { Breadcrumb, DataTable } from "@/features/ui";
import { redirect } from "next/navigation";

interface CategoriesPageProps {
  params: {
    sid: string;
  };
}

export default async function CategoriesPage({
  params: { sid },
}: CategoriesPageProps) {
  const store = await getStoreById(sid);
  if (!store) redirect("/not-found");

  return (
    <>
      <div className="max-w-5xl">
        <div className="mb-4">
          <Breadcrumb
            links={[
              { name: "Stores", href: "/" },
              { name: store.name, href: `/store/${store.id}` },
              { name: "Categories", href: `/store/${store.id}/categories` },
            ]}
          />
        </div>
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
          Categories ({store.categories.length})
        </h1>

        <div className="mt-3">
          <CreateCategoryButton />
        </div>

        <div className="mt-6 space-y-8">
          <DataTable
            entityName="categories"
            data={store.categories}
            columns={columns}
          />
        </div>
      </div>
      <CreateCategoryModal storeId={store.id} />
    </>
  );
}
