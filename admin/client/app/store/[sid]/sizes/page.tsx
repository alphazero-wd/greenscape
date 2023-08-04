import {
  CreateSizeButton,
  CreateSizeModal,
} from "@/features/sizes/create-size-modal";
import { columns } from "@/features/sizes/utils";
import { getStoreById } from "@/features/store/utils";
import { Breadcrumb, DataTable } from "@/features/ui";
import { redirect } from "next/navigation";

interface SizesPageProps {
  params: {
    sid: string;
  };
}

export default async function SizesPage({ params: { sid } }: SizesPageProps) {
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
              { name: "Sizes", href: `/store/${store.id}/categories` },
            ]}
          />
        </div>
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
          Sizes ({store.sizes.length})
        </h1>

        <div className="mt-3">
          <CreateSizeButton />
        </div>

        <div className="mt-6 space-y-8">
          <DataTable
            entityName="sizes"
            data={store.sizes.map((size) => ({ ...size, name: size.label }))}
            columns={columns}
          />
        </div>
      </div>
      <CreateSizeModal storeId={store.id} />
    </>
  );
}
