import { getStoreById } from "@/features/store/utils";
import { redirect } from "next/navigation";

interface StorePageProps {
  params: {
    sid: string;
  };
}

export default async function StorePage({ params: { sid } }: StorePageProps) {
  const store = await getStoreById(sid);
  if (!store) redirect("/not-found");

  return <></>;
}
