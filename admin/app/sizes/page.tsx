import { CreateSizeModal } from "@/features/sizes/create-size";
import { Size } from "@/features/sizes/types";
import { Breadcrumb } from "@/features/ui";
import { getCurrentUser } from "@/features/user/utils";
import axios from "axios";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { SizesPageClient } from "./sizes-client";

const getSizes = async () => {
  const {
    data: { count, data },
  } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/sizes?limit=10`, {
    headers: { Cookie: cookies().toString() },
  });
  return { count, data: data as Size[] };
};

export const metadata = {
  title: "Sizes",
};

export default async function CategoriesPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/auth/login");
  const { count, data } = await getSizes();

  return (
    <>
      <div className="max-w-5xl">
        <div className="mb-4">
          <Breadcrumb links={[{ name: "Sizes", href: "/sizes" }]} />
        </div>
        <SizesPageClient count={count} data={data} />
      </div>
      <CreateSizeModal />
    </>
  );
}
