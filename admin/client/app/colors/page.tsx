import { CreateColorModal } from "@/features/colors/create-color";
import { Color } from "@/features/colors/types";
import { Breadcrumb } from "@/features/ui";
import { getCurrentUser } from "@/features/user/utils";
import axios from "axios";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ColorsPageClient } from "./colors-client";

const getColors = async (): Promise<Color[]> => {
  const {
    data: { data },
  } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/colors`, {
    headers: { Cookie: cookies().toString() },
  });
  return data as Color[];
};

export const metadata = {
  title: "Colors",
};

export default async function ColorsPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/auth/login");
  const colors = await getColors();

  return (
    <>
      <div className="max-w-5xl">
        <div className="mb-4">
          <Breadcrumb links={[{ name: "Colors", href: `/colors` }]} />
        </div>
        <ColorsPageClient data={colors} />
      </div>
      <CreateColorModal />
    </>
  );
}
