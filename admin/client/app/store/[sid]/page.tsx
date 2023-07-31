import { getCurrentUser } from "@/features/user/utils";
import { StoreClient } from "./store-client";
import { redirect } from "next/navigation";
import { getStoreById, getStores } from "@/features/store/utils";
import { NavLinks, NavbarStores } from "@/features/store/navbar";
import { CreateStoreModal } from "@/features/store/create-store-modal";

interface StorePageProps {
  params: {
    sid: string;
  };
}

export default async function StorePage({ params: { sid } }: StorePageProps) {
  const user = await getCurrentUser();
  console.log({ user });
  if (!user) redirect("/auth/login");
  const store = await getStoreById(sid);
  if (!store) redirect("/not-found");
  const stores = await getStores();

  return (
    <>
      <nav className="flex h-16 border-b items-center px-4">
        <NavbarStores stores={stores} />
        <NavLinks />
      </nav>
      <StoreClient />
      <CreateStoreModal />
    </>
  );
}
