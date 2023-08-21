import { getCategories } from "@/features/categories/actions";
import { getColors } from "@/features/colors/actions";
import { CreateProduct } from "@/features/products/create-product";
import { getSizes } from "@/features/sizes/actions";
import { Breadcrumb } from "@/features/ui";

export default async function CreateProductPage() {
  const { data: categories } = await getCategories(
    `${process.env.NEXT_PUBLIC_API_URL}/categories?hierarchy=true`,
  );
  const { data: colors } = await getColors(
    process.env.NEXT_PUBLIC_API_URL! + "/colors",
  );
  const { data: sizes } = await getSizes(
    process.env.NEXT_PUBLIC_API_URL! + "/sizes",
  );

  return (
    <div className="max-w-7xl">
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
        <CreateProduct sizes={sizes} colors={colors} categories={categories} />
      </div>
    </div>
  );
}
