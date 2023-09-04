import Link from "next/link";
import React from "react";
import { Button } from "./button";
import Image from "next/image";

export const HeroSection = () => {
  return (
    <header className="relative py-16">
      <div className="md:block w-1/2 h-full hidden absolute" />
      <div className="relative bg-transparent">
        <div className="md:px-8 sm:px-6 px-4 md:grid items-center md:grid-cols-2 max-w-7xl container">
          <div className="mb-8 lg:mb-0 md:max-w-none max-w-2xl">
            <div className="pr-16">
              <h1 className="text-4xl md:text-5xl text-gray-900 tracking-tight font-bold">
                Add Life to Your Home with our Plants
              </h1>
              <p className="text-md text-gray-500 mt-4">
                Discover our curated selection of indoor and outdoor plants in
                various sizes, colors, and shapes. Easy to care for, our
                high-quality plants add vibrant energy to any living space.
              </p>
              <div className="mt-6">
                <Button className="text-base px-12" size="lg" asChild>
                  <Link href="/products">Shop now</Link>
                </Button>
              </div>
            </div>
          </div>

          <Image
            src="/hero-image.png"
            alt="Hero image"
            width={1024}
            height={1024}
            className="object-center rounded-lg sm:h-96 lg:h-full object-cover w-full"
          />
        </div>
      </div>
    </header>
  );
};
