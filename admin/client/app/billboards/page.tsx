import { CreateBillboardModal } from "@/features/billboards/create-billboard";
import { Gallery } from "@/features/billboards/gallery";
import { Billboard } from "@/features/billboards/types";
import { Breadcrumb } from "@/features/ui";
import { getCurrentUser } from "@/features/user/utils";
import axios from "axios";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const getBillboards = async (): Promise<Billboard[]> => {
  const {
    data: { data },
  } = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/billboards?featured=false`,
    {
      headers: { Cookie: cookies().toString() },
    },
  );
  return data as Billboard[];
};

export default async function BillboardsPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/auth/login");
  const billboards = await getBillboards();

  return (
    <>
      <div className="mb-4">
        <Breadcrumb links={[{ name: "Billboards", href: `/billboards` }]} />
      </div>
      <Gallery data={billboards} />

      <CreateBillboardModal />
    </>
  );
}
