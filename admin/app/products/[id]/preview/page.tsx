import { getProduct } from "@/features/products/actions";
import {
  AddToCart,
  CollapsibleDesc,
  ImagesGallery,
} from "@/features/products/preview";
import { Breadcrumb } from "@/features/ui";
import { getCurrentUser } from "@/features/user/utils";
import { formatPrice } from "@/features/utils";
import { redirect } from "next/navigation";

interface ProductPageProps {
  params: {
    id: string;
  };
}

export const generateMetadata = async ({
  params: { id },
}: ProductPageProps) => {
  const { data: product } = await getProduct(id);
  if (!product) return { title: "Product not found" };
  return { title: "Products - " + product.name };
};

export default async function ProductPage({
  params: { id },
}: ProductPageProps) {
  const user = await getCurrentUser();
  if (!user) redirect("/auth/login");

  const { data: product } = await getProduct(id);
  if (!product) redirect("/not-found");

  return (
    <div className="container w-full max-w-2xl lg:max-w-7xl">
      <div className="col-span-full mb-6">
        <Breadcrumb
          links={[
            { name: "Products", href: "/products" },
            { name: product.name, href: "#" },
          ]}
        />
      </div>
      <main className="px-4 pb-10 pt-16">
        <section className="grid gap-x-8 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <ImagesGallery product={product} />
          </div>
          <div className="mt-6 lg:col-span-3">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">
              {product.name}
            </h1>
            <p className="mt-3 text-4xl tracking-tight text-gray-900">
              {formatPrice(product.price)}
            </p>
            <CollapsibleDesc desc={product.desc} />
            <AddToCart product={product} />
          </div>
        </section>
      </main>
    </div>
  );
}
