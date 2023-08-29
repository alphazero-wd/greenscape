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
      className="relative group h-full"
    >
      <Card className="p-0 h-full group-hover:opacity-75">
        <Image
          alt={product.name}
          width={640}
          height={640}
          className="object-contain rounded-tl-lg rounded-tr-lg aspect-square"
          src={`${process.env.NEXT_PUBLIC_API_URL}/files/${product.images[0].id}`}
        />
        <CardContent className="pt-4 space-y-2 border-t border-gray-200">
          <CardTitle className="font-semibold text-base line-clamp-1">
            {product.name}
          </CardTitle>
          <CardDescription className="text-sm whitespace-pre-wrap text-gray-500 line-clamp-3">
            {product.desc}
          </CardDescription>
          <div className="flex justify-end flex-col flex-1">
            <CardDescription className="text-gray-500 italic text-sm">
              {product.category.name}
            </CardDescription>
            <CardDescription className="font-medium text-base text-gray-900">
              {formatPrice(product.price)}
            </CardDescription>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};
