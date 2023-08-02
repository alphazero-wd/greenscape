import { getStoreById } from "@/features/store/utils";
import { Breadcrumb } from "@/features/ui";
import { redirect } from "next/navigation";

interface StorePageProps {
  params: {
    sid: string;
  };
}

export default async function StorePage({ params: { sid } }: StorePageProps) {
  const store = await getStoreById(sid);
  if (!store) redirect("/not-found");

  return (
    <div className="container max-w-7xl">
      <Breadcrumb
        links={[
          { name: "Stores", href: "/" },
          { name: store.name, href: `/store/${store.id}` },
        ]}
      />
    </div>
  );
}
