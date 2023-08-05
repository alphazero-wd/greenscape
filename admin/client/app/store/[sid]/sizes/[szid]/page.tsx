import { DeleteSizeButton, EditSizeForm } from "@/features/sizes/settings";
import { getStoreById } from "@/features/store/utils";
import { Breadcrumb, DeleteRecordsModal } from "@/features/ui";
import { redirect } from "next/navigation";

interface CategoryPageProps {
  params: {
    sid: string;
    szid: string;
  };
}

export default async function SizePage({
  params: { sid, szid },
}: CategoryPageProps) {
  const store = await getStoreById(sid);
  if (!store) redirect("/not-found");
  const size = store.sizes.find((s) => s.id.toString() === szid);
  if (!size) redirect("/not-found");

  return (
    <>
      <div className="max-w-md">
        <div className="mb-4">
          <Breadcrumb
            links={[
              { name: "Stores", href: "/" },
              { name: store.name, href: `/store/${store.id}` },
              {
                name: "Sizes",
                href: `/store/${store.id}/sizes`,
              },
              {
                name: size.label,
                href: `/store/${store.id}/sizes/${size.id}`,
              },
            ]}
          />
        </div>
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
          Size Settings
        </h1>

        <div className="mt-6 space-y-8">
          <EditSizeForm size={size} />
          <DeleteSizeButton />
        </div>
      </div>
      <DeleteRecordsModal
        entityName="sizes"
        records={[{ id: size.id, name: size.label }]}
      />
    </>
  );
}
