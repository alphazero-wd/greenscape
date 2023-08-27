"use client";
import { Carousel } from "flowbite-react";
import Image from "next/image";
import { Product } from "../types";

interface ImagesGalleryProps {
  product: Product;
}

export const ImagesGallery: React.FC<ImagesGalleryProps> = ({ product }) => {
  return (
    <Carousel slideInterval={30000} className="h-screen">
      {product.images.map((image) => (
        <Image
          width={640}
          height={800}
          key={image.id}
          className="aspect-square h-full w-full object-cover"
          src={`${process.env.NEXT_PUBLIC_API_URL}/files/${image.id}`}
          alt={product.name}
        />
      ))}
    </Carousel>
  );
};
