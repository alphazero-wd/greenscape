import Link from "next/link";
import { Button } from "@/features/ui/button";

export const metadata = {
  title: "Page not found",
};

export default function NotFound() {
  return (
    <main className="grid place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        <p className="text-base font-semibold text-primary">404</p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-3xl">
          Page not found
        </h1>
        <p className="mt-6 text-base leading-7 text-secondary-foreground">
          Sorry, we couldn&apos;t find the page you&apos;re looking for.
        </p>
        <Button className="mt-10" asChild>
          <Link href="/products">Continue shopping</Link>
        </Button>
      </div>
    </main>
  );
}
