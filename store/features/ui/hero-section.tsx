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
                Let's shop, let's play, let's smile all day!
              </h1>
              <p className="text-md text-gray-500 mt-4">
                Our e-commerce store is all about happy shopping! We've got
                playful and trendy products that will put a smile on your face.
                Join us and let's shop for some happiness!
              </p>
              <div className="mt-6">
                <Button className="text-base px-12" size="lg" asChild>
                  <Link href="/products">Shop now</Link>
                </Button>
              </div>
            </div>
          </div>

          <Image
            src="/hero-image.jpg"
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
