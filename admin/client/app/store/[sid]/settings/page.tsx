import {
  DeleteStoreButton,
  DeleteStoreModal,
  EditStoreForm,
} from "@/features/store/settings";
import { getStoreById } from "@/features/store/utils";
import { Breadcrumb } from "@/features/ui";
import { redirect } from "next/navigation";

interface StoreSettingsPageProps {
  params: {
    sid: string;
  };
}

async function StoreSettingsPage({ params: { sid } }: StoreSettingsPageProps) {
  const store = await getStoreById(sid);
  if (!store) redirect("/not-found");

  return (
    <>
      <div className="max-w-md">
        <div className="mb-4">
          <Breadcrumb
            links={[
              { name: "Stores", href: "/" },
              { name: store.name, href: `/store/${store.id}` },
              { name: "Settings", href: `/store/${store.id}/settings` },
            ]}
          />
        </div>
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
          Settings
        </h1>

        <div className="mt-6 space-y-8">
          <EditStoreForm store={store} />
          <DeleteStoreButton />
        </div>
      </div>
      <DeleteStoreModal storeId={store.id} storeName={store.name} />
    </>
  );
}

export default StoreSettingsPage;
