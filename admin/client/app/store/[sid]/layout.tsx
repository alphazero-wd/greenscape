import { CreateStoreModal } from "@/features/store/create-store-modal";
import {
  MobileSidebarNav,
  NavLinks,
  NavMenuButton,
  NavUser,
  NavbarStores,
} from "@/features/store/navbar";
import { getStores } from "@/features/store/utils";
import { getCurrentUser } from "@/features/user/utils";
import { redirect } from "next/navigation";

export default async function StoreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();
  if (!user) redirect("/auth/login");
  const stores = await getStores();

  return (
    <>
      <nav className="flex h-16 items-center border-b px-4">
        <div className="container flex max-w-7xl items-center justify-between gap-x-2">
          <div className="flex items-center gap-x-2">
            <NavbarStores stores={stores} />
            <NavLinks />
          </div>
          <div className="flex items-center gap-x-2">
            <NavMenuButton />
            <NavUser />
          </div>
        </div>
      </nav>
      <CreateStoreModal />
      <MobileSidebarNav />
      <div className="px-4 py-8">{children}</div>
    </>
  );
}
