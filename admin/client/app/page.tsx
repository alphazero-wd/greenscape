import {
  CreateStoreButton,
  CreateStoreModal,
} from "@/features/store/create-store";
import { getStores } from "@/features/store/utils";
import { Button } from "@/features/ui";
import { getCurrentUser } from "@/features/user/utils";
import { StoreIcon } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function StoresPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/auth/login");
  const stores = await getStores();

  return (
    <>
      <main className="h-full pb-16 pt-24">
        <div className="container max-w-xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-center text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            {stores.length > 0 ? (
              "Please select any of the following stores to get started"
            ) : (
              <span>
                There is currently no store. <br />
                Click the button below to create one
              </span>
            )}
          </h1>
          <div className="mt-8 space-y-6">
            <ul className="flex flex-col gap-x-4">
              {stores.map((store) => (
                <li key={store.id}>
                  <Button variant="outline" className="w-full justify-start">
                    <Link
                      href={`/store/${store.id}`}
                      className="flex items-center gap-x-3 transition-colors"
                    >
                      <StoreIcon className="h-5 w-5 text-gray-500" />
                      <span className="line-clamp-1 font-medium text-gray-900">
                        {store.name}
                      </span>
                    </Link>
                  </Button>
                </li>
              ))}
            </ul>
            <CreateStoreButton />
          </div>
        </div>
      </main>
      <CreateStoreModal />
    </>
  );
}
