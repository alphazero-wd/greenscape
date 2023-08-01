import { getCurrentUser } from "@/features/user/utils";
import { redirect } from "next/navigation";
import { getStores } from "@/features/store/utils";
import {
  MobileSidebarNav,
  NavLinks,
  NavMenuButton,
  NavUser,
  NavbarStores,
} from "@/features/store/navbar";
import { CreateStoreModal } from "@/features/store/create-store-modal";

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
      <nav className="h-16 border-b flex items-center px-4">
        <div className="flex justify-between items-center gap-x-2 max-w-7xl container">
          <div className="flex gap-x-2 items-center">
            <NavbarStores stores={stores} />
            <NavLinks />
          </div>
          <div className="flex gap-x-2 items-center">
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
