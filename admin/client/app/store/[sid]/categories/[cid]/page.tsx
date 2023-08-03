import {
  DeleteCategoryButton,
  DeleteCategoryModal,
  EditCategoryForm,
} from "@/features/categories/settings";
import { getStoreById } from "@/features/store/utils";
import { Breadcrumb } from "@/features/ui";
import { redirect } from "next/navigation";

interface CategoryPageProps {
  params: {
    sid: string;
    cid: string;
  };
}

export default async function CategoryPage({
  params: { sid, cid },
}: CategoryPageProps) {
  const store = await getStoreById(sid);
  if (!store) redirect("/not-found");
  const category = store.categories.find((c) => c.id.toString() === cid);
  if (!category) redirect("/not-found");

  return (
    <>
      <div className="max-w-md">
        <div className="mb-4">
          <Breadcrumb
            links={[
              { name: "Stores", href: "/" },
              { name: store.name, href: `/store/${store.id}` },
              {
                name: category.name,
                href: `/store/${store.id}/categories/${category.id}`,
              },
            ]}
          />
        </div>
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
          Settings
        </h1>

        <div className="mt-6 space-y-8">
          <EditCategoryForm category={category} />
          <DeleteCategoryButton />
        </div>
      </div>
      <DeleteCategoryModal
        categoryId={category.id}
        categoryName={category.name}
      />
    </>
  );
}
