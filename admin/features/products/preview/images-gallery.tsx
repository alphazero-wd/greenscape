"use client";
import { Carousel } from "flowbite-react";
import { Product } from "../types";

interface ImagesGalleryProps {
  product: Product;
}

export const ImagesGallery: React.FC<ImagesGalleryProps> = ({ product }) => {
  return (
    <Carousel className="h-screen">
      {product.images.map((image) => (
        <img
          key={image.id}
          className="aspect-[4/3] h-full w-full rounded-xl object-cover"
          src={`${process.env.NEXT_PUBLIC_API_URL}/files/${image.id}`}
          alt={product.name}
        />
      ))}
    </Carousel>
  );
};
