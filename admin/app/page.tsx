import { getKeyStats } from "@/features/dashboard/actions";
import { KeyStats } from "@/features/dashboard/key-stats";
import { getCurrentUser } from "@/features/user/utils";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Admin | Dashboard",
  description: "Welcome to admin dashboard page",
};

export default async function DashboardPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/auth/login");
  const keyStats = await getKeyStats();

  return (
    <div className="container max-w-7xl">
      <KeyStats keyStats={keyStats} />
    </div>
  );
}
