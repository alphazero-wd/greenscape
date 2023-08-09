import { Metadata } from "next";
import { redirect } from "next/navigation";
import { getCurrentUser } from "../features/user/utils";

export const metadata: Metadata = {
  title: "Admin | Dashboard",
  description: "Welcome to admin dashboard page",
};

export default async function DashboardPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/auth/login");

  return <h1>Dashboard</h1>;
}
