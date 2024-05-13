import { getCategories } from "@/features/categories/actions";
import { CreateProduct } from "@/features/products/create-product";
import { Breadcrumb } from "@/features/ui/breadcrumb";
import { getCurrentUser } from "@/features/user/utils";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Create new product",
};

export default async function CreateProductPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/auth/login");
  const {
    data: { categories },
  } = await getCategories();

  return (
    <div className="container max-w-7xl">
      <div className="container max-w-xl">
        <div className="mb-8">
          <Breadcrumb
            links={[
              { name: "Products", href: `/products` },
              {
                name: "Create",
                href: "#",
              },
            ]}
          />
        </div>

        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
          Create Product
        </h1>

        <div className="relative mt-4 flex flex-col gap-8 lg:flex-row">
          <CreateProduct categories={categories} />
        </div>
      </div>
    </div>
  );
}
