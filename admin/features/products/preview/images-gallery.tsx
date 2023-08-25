"use client";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Product } from "../types";

interface ImagesGalleryProps {
  product: Product;
}

export const ImagesGallery: React.FC<ImagesGalleryProps> = ({ product }) => {
  const [pos, setPos] = useState(0);
  return (
    <div className="space-y-6 lg:col-span-2">
      <div>
        <img
          className="aspect-square h-auto w-full rounded-lg object-cover"
          src={`${process.env.NEXT_PUBLIC_API_URL}/files/${product.images[pos].id}`}
          alt={product.name}
        />
      </div>
      <div className="relative grid grid-cols-2 gap-4 lg:grid-cols-4">
        {product.images.map((image, i) => (
          <img
            key={image.id}
            width={0}
            height={0}
            className={cn(
              "aspect-square h-auto w-full cursor-pointer rounded object-cover",
              i !== pos && "opacity-75",
            )}
            onClick={() => setPos(i)}
            src={`${process.env.NEXT_PUBLIC_API_URL}/files/${image.id}`}
            alt={product.name}
          />
        ))}
      </div>
    </div>
  );
};
