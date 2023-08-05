import { DeleteColorButton, EditColorForm } from "@/features/colors/settings";
import { getStoreById } from "@/features/store/utils";
import { Breadcrumb, DeleteRecordsModal } from "@/features/ui";
import { redirect } from "next/navigation";

interface CategoryPageProps {
  params: {
    sid: string;
    cid: string;
  };
}

export default async function ColorPage({
  params: { sid, cid },
}: CategoryPageProps) {
  const store = await getStoreById(sid);
  if (!store) redirect("/not-found");
  const color = store.colors.find((s) => s.id.toString() === cid);
  if (!color) redirect("/not-found");

  return (
    <>
      <div className="max-w-md">
        <div className="mb-4">
          <Breadcrumb
            links={[
              { name: "Stores", href: "/" },
              { name: store.name, href: `/store/${store.id}` },
              {
                name: "Colors",
                href: `/store/${store.id}/colors`,
              },
              {
                name: color.name,
                href: `/store/${store.id}/colors/${color.id}`,
              },
            ]}
          />
        </div>
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
          Color Settings
        </h1>

        <div className="mt-6 space-y-8">
          <EditColorForm color={color} />
          <DeleteColorButton />
        </div>
      </div>
      <DeleteRecordsModal
        entityName="colors"
        records={[{ id: color.id, name: color.name }]}
      />
    </>
  );
}
