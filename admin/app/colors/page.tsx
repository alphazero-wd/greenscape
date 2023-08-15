import { getColors } from "@/features/colors/actions";
import {
  CreateColorButton,
  CreateColorModal,
} from "@/features/colors/create-color";
import { EditColorModal } from "@/features/colors/edit-color";
import { ColorsTable } from "@/features/colors/table";
import { Breadcrumb, DeleteRecordsModal } from "@/features/ui";
import { getCurrentUser } from "@/features/user/utils";
import { redirect } from "next/navigation";
import qs from "query-string";

export const metadata = {
  title: "Colors",
};

interface CategoriesPageProps {
  searchParams: {
    limit?: string;
    offset?: string;
    sortBy?: string;
    order?: "asc" | "desc";
    q?: string;
  };
}

export default async function CategoriesPage({
  searchParams,
}: CategoriesPageProps) {
  const user = await getCurrentUser();
  if (!user) redirect("/auth/login");
  const url = qs.stringifyUrl({
    url: process.env.NEXT_PUBLIC_API_URL! + "/colors",
    query: searchParams,
  });
  const { count, data } = await getColors(url);

  return (
    <>
      <div className="max-w-3xl">
        <div className="mb-4">
          <Breadcrumb links={[{ name: "Colors", href: `/colors` }]} />
        </div>
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
          Colors ({count})
        </h1>

        <div className="mt-3">
          <CreateColorButton />
        </div>

        <div className="mt-6 space-y-8">
          <ColorsTable colors={data} count={count} />
        </div>
      </div>
      <CreateColorModal />
      <EditColorModal />
      <DeleteRecordsModal entityName="colors" />
    </>
  );
}
