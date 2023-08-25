import { getProduct } from "@/features/products/actions";
import { ImagesGallery, QtySelect } from "@/features/products/preview";
import { Breadcrumb, Button, Label } from "@/features/ui";
import { getCurrentUser } from "@/features/user/utils";
import { HeartIcon, ShoppingCartIcon } from "@heroicons/react/24/outline";
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
    <div className="container grid w-full max-w-2xl gap-x-8 px-4 py-16 sm:px-6 sm:py-24 md:px-4 lg:max-w-7xl lg:grid-cols-5 lg:px-8">
      <div className="col-span-full mb-6">
        <Breadcrumb
          links={[
            { name: "Products", href: "/products" },
            { name: product.name, href: "#" },
          ]}
        />
      </div>
      <ImagesGallery product={product} />
      <div className="col-span-3">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900">
          {product.name}
        </h1>
        <p className="mt-3 text-4xl tracking-tight text-gray-900">
          ${product.price}
        </p>
        <p className="mt-6 text-gray-700">{product.desc}</p>
        <div className="mt-6">
          <Label className="mb-2 mr-4">Quantity</Label>
          <QtySelect product={product} />
        </div>
        <div className="mt-6 flex items-center gap-x-6">
          {product.inStock > 0 && (
            <Button size="lg" className="text-base">
              <ShoppingCartIcon className="mr-5 h-6 w-6" />
              Add to cart
            </Button>
          )}
          <Button size="icon" variant="ghost">
            <HeartIcon className="h-6 w-6 text-gray-400" />
          </Button>
        </div>
      </div>
    </div>
  );
}
