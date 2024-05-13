import { getCategoriesTree } from "@/features/categories/actions";
import { CreateProduct } from "@/features/products/create-product";
import { Breadcrumb } from "@/features/ui/breadcrumb";
import { Button } from "@/features/ui/button";
import { getCurrentUser } from "@/features/user/utils";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Create new product",
};

export default async function CreateProductPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/auth/login");
  const categories = await getCategoriesTree();

  return (
    <div className="container max-w-7xl">
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
      <main className="grid flex-1 items-start gap-4 md:gap-8">
        <div className="container grid max-w-5xl flex-1 auto-rows-max gap-4">
          <div className="flex items-center gap-4">
            <Button asChild variant="outline" size="icon" className="h-7 w-7">
              <Link href="/products">
                <ChevronLeft className="h-4 w-4" />
                <span className="sr-only">Back</span>
              </Link>
            </Button>
            <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
              Create new product
            </h1>
          </div>
          <CreateProduct categories={categories} />
        </div>
      </main>
    </div>
  );
}
