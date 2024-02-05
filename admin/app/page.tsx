import {
  getKeyStats,
  getMonthlyRevenues,
  getSalesByCountries,
} from "@/features/dashboard/actions";
import { KeyStats } from "@/features/dashboard/key-stats";
import { RevenuesChart } from "@/features/dashboard/revenues-chart";
import { getCurrentUser } from "@/features/user/utils";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import { SalesByCountries } from "../features/dashboard/sales-by-countries";

export const metadata: Metadata = {
  title: "Admin | Dashboard",
  description: "Welcome to admin dashboard page",
};

interface DashboardPageProps {
  searchParams: {
    year: string;
  };
}

export default async function DashboardPage({
  searchParams: { year },
}: DashboardPageProps) {
  const user = await getCurrentUser();
  if (!user) redirect("/auth/login");
  const keyStats = await getKeyStats();
  const { startYear, endYear, monthlyRevenues } = await getMonthlyRevenues(
    year || new Date().getFullYear().toString(),
  );
  const salesByCountries = await getSalesByCountries();

  return (
    <div className="container max-w-7xl">
      <h2 className="mb-4 text-2xl font-bold tracking-tight sm:text-3xl">
        Dashboard
      </h2>
      <KeyStats keyStats={keyStats} />
      <div className="mt-4 grid gap-4 md:grid-cols-3">
        <RevenuesChart
          startYear={startYear}
          endYear={endYear}
          monthlyRevenues={monthlyRevenues}
        />
        <SalesByCountries data={salesByCountries} />
      </div>
    </div>
  );
}
