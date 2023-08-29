import Link from "next/link";
import { Product } from "../types";
import Image from "next/image";
import { formatPrice } from "../utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/features/ui";

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
      <Card className="sm:h-auto p-0 sm:relative group-hover:opacity-75">
        <Image
          alt={product.name}
          width={640}
          height={640}
          className="object-contain rounded-tl-lg rounded-tr-lg aspect-square"
          src={`${process.env.NEXT_PUBLIC_API_URL}/files/${product.images[0].id}`}
        />
        <CardContent>
          <CardTitle className="font-semibold text-base mt-4 line-clamp-2">
            {product.name}
          </CardTitle>
          <CardDescription className="text-gray-500 mt-2">
            {formatPrice(product.price)}
          </CardDescription>
        </CardContent>
      </Card>
    </Link>
  );
};
