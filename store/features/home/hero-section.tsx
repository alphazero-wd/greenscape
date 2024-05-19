import Link from "next/link";
import React from "react";
import { Button } from "@/features/ui/button";
import Image from "next/image";

export const HeroSection = () => {
  return (
    <header className="relative bg-gray-100">
      <div className="lg:grid items-center justify-between lg:grid-cols-2">
        <div className="mb-4 justify-self-center max-w-xl container lg:px-8 sm:px-6 py-8 lg:py-0 px-4 lg:mb-0">
          <div className="text-center lg:text-start">
            <h1 className="lg:text-6xl sm:text-5xl text-3xl text-foreground tracking-tight font-bold">
              Cultivate Your <br className="sm:block hidden" />
              Urban Oasis
            </h1>
            <p className="lg:text-lg text-base text-muted-foreground mt-4">
              Transform your home with our curated collection of lush,
              high-quality plants, essential care accessories, and expert
              gardening tips. Discover the beauty of green living today!
            </p>
            <div className="mt-6">
              <Button
                className="text-base font-semibold px-12"
                size="lg"
                asChild
              >
                <Link href="/products/category">Shop now</Link>
              </Button>
            </div>
          </div>
        </div>

        <Image
          src="/images/hero-image.jpg"
          alt="Hero image"
          width={1024}
          height={1024}
          className="object-center justify-self-end w-full lg:w-[600px] h-[250px] lg:h-[600px] aspect-square object-cover"
        />
      </div>
    </header>
  );
};
