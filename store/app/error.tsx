"use client";
import { Button } from "@/features/ui/button";
import Link from "next/link";
import { useEffect } from "react";

export default function Error({ error }: { error: Error }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);
  return (
    <main className="grid place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        <p className="text-base font-semibold text-primary">500</p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          Server Error :(
        </h1>
        <p className="mt-6 text-base leading-7 text-gray-600">
          It&apos;s not your fault. It&apos;s ours
        </p>
        <Button className="mt-10" asChild>
          <Link href="/products/category">Continue shopping</Link>
        </Button>
      </div>
    </main>
  );
}
