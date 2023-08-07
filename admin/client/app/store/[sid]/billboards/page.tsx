import {
  CreateBillboardButton,
  CreateBillboardModal,
} from "@/features/billboards/create-billboard";
import { getStoreById } from "@/features/store/utils";
import { Breadcrumb } from "@/features/ui";
import { redirect } from "next/navigation";

interface ColorsPageProps {
  params: {
    sid: string;
  };
}

export default async function ColorsPage({ params: { sid } }: ColorsPageProps) {
  const store = await getStoreById(sid);
  if (!store) redirect("/not-found");

  return (
    <>
      <div className="max-w-5xl">
        <div className="mb-4">
          <Breadcrumb
            links={[
              { name: "Stores", href: "/" },
              { name: store.name, href: `/store/${store.id}` },
              { name: "Colors", href: `/store/${store.id}/categories` },
            ]}
          />
        </div>
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
          Billboards ({store.colors.length})
        </h1>

        <div className="mt-3">
          <CreateBillboardButton />
        </div>

        <div className="mt-6 space-y-8"></div>
      </div>
      <CreateBillboardModal storeId={store.id.toString()} />
    </>
  );
}
