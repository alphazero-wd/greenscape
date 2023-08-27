import { getCategories } from "@/features/categories/actions";
import { getProduct } from "@/features/products/actions";
import { EditProduct } from "@/features/products/edit-product";
import { Breadcrumb } from "@/features/ui";
import { getCurrentUser } from "@/features/user/utils";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Create new product",
};

interface ProductSettingsPageProps {
  params: {
    id: string;
  };
}

export const generateMetadata = async ({
  params: { id },
}: ProductSettingsPageProps) => {
  const { data: product } = await getProduct(id);
  if (!product) return { title: "Product not found" };
  return { title: "Update product - " + product.name };
};

export default async function ProductSettingsPage({
  params: { id },
}: ProductSettingsPageProps) {
  const user = await getCurrentUser();
  if (!user) redirect("/auth/login");
  const { data: categories } = await getCategories();
  const { data: product } = await getProduct(id);
  if (!product) redirect("/not-found");

  return (
    <>
      <div className="container max-w-7xl">
        <div className="container max-w-xl">
          <div className="mb-8">
            <Breadcrumb
              links={[
                { name: "Products", href: `/products` },
                { name: product.name, href: `/products/${id}/preview` },
                { name: "Settings", href: "#" },
              ]}
            />
          </div>
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Edit Product
          </h1>

          <div className="relative mt-4 flex flex-col gap-8 lg:flex-row">
            <EditProduct product={product} categories={categories} />
          </div>
        </div>
      </div>
    </>
  );
}
