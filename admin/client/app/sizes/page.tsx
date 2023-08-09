import { CreateSizeModal } from "@/features/sizes/create-size";
import { Size } from "@/features/sizes/types";
import { Breadcrumb } from "@/features/ui";
import { getCurrentUser } from "@/features/user/utils";
import axios from "axios";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { SizesPageClient } from "./sizes-client";

const getSizes = async (): Promise<Size[]> => {
  const {
    data: { data },
  } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/sizes`, {
    headers: { Cookie: cookies().toString() },
  });
  return data as Size[];
};

export const metadata = {
  title: "Sizes",
};

export default async function SizesPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/auth/login");
  const sizes = await getSizes();

  return (
    <>
      <div className="max-w-5xl">
        <div className="mb-4">
          <Breadcrumb links={[{ name: "Sizes", href: `/sizes` }]} />
        </div>
        <SizesPageClient data={sizes} />
      </div>
      <CreateSizeModal />
    </>
  );
}
