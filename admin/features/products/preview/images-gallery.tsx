"use client";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { Carousel } from "flowbite-react";
import { Product } from "../types";

interface ImagesGalleryProps {
  product: Product;
}

const indicatorClassname =
  "flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-gray-200/50 text-gray-500 shadow-md hover:bg-gray-200 dark:bg-gray-800/50 dark:hover:bg-gray-800";

export const ImagesGallery: React.FC<ImagesGalleryProps> = ({ product }) => {
  return (
    <Carousel
      leftControl={
        <div className={indicatorClassname}>
          <ChevronLeftIcon className="h-6 w-6" />
        </div>
      }
      rightControl={
        <div className={indicatorClassname}>
          <ChevronRightIcon className="h-6 w-6" />
        </div>
      }
      className="h-[60vh] md:h-screen"
    >
      {product.images.map((image) => (
        <img
          key={image.id}
          className="h-full w-full object-contain"
          src={`${process.env.NEXT_PUBLIC_API_URL}/files/${image.id}`}
          alt={product.name}
        />
      ))}
    </Carousel>
  );
};
