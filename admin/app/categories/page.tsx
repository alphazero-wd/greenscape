import { CreateCategoryModal } from "@/features/categories/create-category";
import { Category } from "@/features/categories/types";
import { Breadcrumb } from "@/features/ui";
import { getCurrentUser } from "@/features/user/utils";
import axios from "axios";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { CategoriesPageClient } from "./categories-client";

const getCategories = async () => {
  const {
    data: { count, data },
  } = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/categories?limit=10`,
    {
      headers: { Cookie: cookies().toString() },
    },
  );
  return { count, data: data as Category[] };
};

export const metadata = {
  title: "Categories",
};

export default async function CategoriesPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/auth/login");
  const { count, data } = await getCategories();

  return (
    <>
      <div className="max-w-5xl">
        <div className="mb-4">
          <Breadcrumb links={[{ name: "Categories", href: `/categories` }]} />
        </div>
        <CategoriesPageClient count={count} data={data} />
      </div>
      <CreateCategoryModal />
    </>
  );
}
