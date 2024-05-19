import Link from "next/link";
import { Product } from "../types";
import Image from "next/image";
import { formatPrice } from "../utils";

interface ProductItemProps {
  product: Product;
}

export const ProductItem: React.FC<ProductItemProps> = ({ product }) => {
  return (
    <Link
      href={`/products/${product.id}`}
      key={product.id}
      className="relative w-fit group h-full"
    >
      <Image
        alt={product.name}
        width={600}
        height={600}
        className="rounded-md object-cover transition-opacity group-hover:opacity-75 aspect-square"
        src={product.images[0].file.url}
      />

      <div className="pt-4 space-y-2 border-t border-gray-200">
        <div className="font-medium text-base text-foreground line-clamp-1">
          {product.name}
        </div>
        <div className="text-base text-muted-foreground">
          {formatPrice(product.price)}
        </div>
      </div>
    </Link>
  );
};
