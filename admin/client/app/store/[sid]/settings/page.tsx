import { getStoreById } from "@/features/store/utils";
import { redirect } from "next/navigation";
import {
  DeleteStoreButton,
  DeleteStoreModal,
  EditStoreForm,
} from "@/features/store/settings";
import { Breadcrumb } from "@/features/ui";

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
      <div className="max-w-7xl container">
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
          <h1 className="font-bold tracking-tight text-2xl sm:text-3xl">
            Settings
          </h1>

          <div className="mt-6 space-y-8">
            <EditStoreForm store={store} />
            <DeleteStoreButton />
          </div>
        </div>
      </div>
      <DeleteStoreModal storeId={store.id} storeName={store.name} />
    </>
  );
}

export default StoreSettingsPage;
