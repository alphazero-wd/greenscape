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
      className="relative group"
    >
      <div className="sm:h-auto sm:relative group-hover:opacity-75">
        <Image
          alt={product.name}
          width={640}
          height={640}
          className="object-contain rounded-lg aspect-square"
          src={`${process.env.NEXT_PUBLIC_API_URL}/files/${product.images[0].id}`}
        />
        <h3 className="font-semibold text-base mt-4 line-clamp-2">
          {product.name}
        </h3>
        <p className="text-gray-500 mt-1">{formatPrice(product.price)}</p>
      </div>
    </Link>
  );
};
