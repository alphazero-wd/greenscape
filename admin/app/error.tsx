"use client";
import { Button } from "@/features/ui/button";
import Link from "next/link";

export default function Error() {
  return (
    <main className="grid place-items-center bg-white px-6 py-16 sm:py-24 lg:px-8">
      <div className="text-center">
        <p className="text-base font-semibold text-green-500">500</p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Server Error :(
        </h1>
        <p className="mt-6 text-base leading-7 text-gray-600">
          It&apos;s not your fault. It&apos;s ours
        </p>
        <Button className="mt-10 bg-green-500 hover:bg-green-400" asChild>
          <Link href="/">Back to dashboard</Link>
        </Button>
      </div>
    </main>
  );
}
