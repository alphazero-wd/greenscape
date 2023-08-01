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
  console.log({ user });
  if (!user) redirect("/auth/login");
  const stores = await getStores();

  return (
    <>
      <nav className="flex justify-between gap-x-2 h-16 border-b items-center px-4">
        <div className="flex gap-x-2 items-center">
          <NavbarStores stores={stores} />
          <NavLinks />
        </div>
        <div className="flex gap-x-2 items-center">
          <NavMenuButton />
          <NavUser />
        </div>
      </nav>
      <CreateStoreModal />
      <MobileSidebarNav />
      {children}
    </>
  );
}
