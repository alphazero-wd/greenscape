import { getCategories } from "@/features/categories/actions";
import { CreateProduct } from "@/features/products/create-product";
import { Breadcrumb } from "@/features/ui";
import { getCurrentUser } from "@/features/user/utils";
import { redirect } from "next/navigation";

export default async function CreateProductPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/auth/login");
  const { data: categories } = await getCategories(`?hierarchy=true`);

  return (
    <div className="container max-w-7xl">
      <div className="container max-w-xl">
        <div className="mb-4">
          <Breadcrumb
            links={[
              { name: "Products", href: `/products` },
              {
                name: "Create",
                href: "/products/create",
              },
            ]}
          />
        </div>

        <div className="relative mt-8 flex flex-col gap-8 lg:flex-row">
          <CreateProduct categories={categories} />
        </div>
      </div>
    </div>
  );
}
