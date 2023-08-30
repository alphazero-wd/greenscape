import { getProduct, getProducts } from "@/features/products/actions";
import { redirect } from "next/navigation";
import { Breadcrumb, Button, Label } from "@/features/ui";
import { HeartIcon, ShoppingBagIcon } from "@heroicons/react/24/outline";
import { ImagesGallery, QtySelect } from "@/features/products/product";
import { formatPrice } from "@/features/products/utils";
import { ProductList } from "../../../features/products/product-list";

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
    `?limit=4&categoryIds=${product.category.id}&refId=${product.id}`
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

      <main className="lg:px-8 pt-24 pb-10 sm:px-6 px-4 container max-w-2xl lg:max-w-7xl">
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
            <div className="mt-6 space-y-2">
              <Label>Description</Label>
              <p className="mt-6 whitespace-pre-wrap text-sm leading-[1.7142857] text-gray-500">
                {product.desc}
              </p>
            </div>
            <QtySelect product={product} />
            <div className="mt-6 flex items-center gap-x-6">
              <Button
                disabled={product.inStock === 0}
                size="lg"
                className="text-base h-10"
              >
                <ShoppingBagIcon className="mr-2 h-6 w-6" />
                Add to cart
              </Button>
              <Button size="icon" className="h-10" variant="ghost">
                <HeartIcon className="h-6 w-6 text-gray-400" />
              </Button>
            </div>
          </div>
        </section>

        {products.length > 0 && (
          <section aria-labelledby="related-heading" className="lg:mt-24 mt-16">
            <h2 className="tracking-tight font-medium text-gray-900">
              Customers also purchased
            </h2>
            <ProductList products={products} className="mt-6" />
          </section>
        )}
      </main>
    </>
  );
}
