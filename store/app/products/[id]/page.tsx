import { getProduct, getProducts } from "@/features/products/actions";
import { redirect } from "next/navigation";
import { Breadcrumb } from "@/features/ui";
import {
  AddToCart,
  CollapsibleDesc,
  ImagesGallery,
} from "@/features/products/product";
import { formatPrice } from "@/features/products/utils";
import { ProductList } from "@/features/products/product-list";

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
  const { data: product } = await getProduct(id);
  if (!product) redirect("/not-found");

  const { data: products } = await getProducts(
    `?limit=4&categoryIds=${product.category.id}&refIds=${product.id}`
  );

  return (
    <>
      <div className="border-b border-gray-200">
        <div className="lg:px-8 py-4 sm:px-6 px-4 container max-w-7xl">
          <Breadcrumb
            links={[
              { name: "Products", href: "/products" },
              { name: product.name, href: "#" },
            ]}
          />
        </div>
      </div>

      <main className="lg:px-8 pt-16 pb-10 sm:px-6 px-4 container max-w-2xl lg:max-w-7xl">
        <section className="grid lg:grid-cols-5 gap-x-8">
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

        {products.length > 0 && (
          <section aria-labelledby="related-heading" className="lg:mt-24 mt-16">
            <h2 className="tracking-tight font-medium text-gray-900">
              Customers also purchased
            </h2>
            <ProductList
              products={products}
              className="mt-6 sm:grid-cols-2 lg:grid-cols-4"
            />
          </section>
        )}
      </main>
    </>
  );
}
