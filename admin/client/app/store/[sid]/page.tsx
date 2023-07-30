import { getCurrentUser } from "@/features/user/utils";
import { StoreClient } from "./store-client";
import { redirect } from "next/navigation";
import { getStores } from "@/features/store/utils";
import { NavLinks, NavbarStores } from "@/features/store/navbar";

interface StorePageProps {
  params: {
    sid: string;
  };
}

export default async function StorePage({}: StorePageProps) {
  const user = await getCurrentUser();
  if (!user) redirect("/auth/login");
  const stores = await getStores();

  return (
    <>
      <nav className="flex h-16 border-b items-center px-4">
        <NavbarStores stores={stores} />
        <NavLinks />
      </nav>
      <StoreClient />
    </>
  );
}
