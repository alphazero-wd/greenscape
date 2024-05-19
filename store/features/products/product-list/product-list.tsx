import React from "react";
import { Product } from "../types";
import { ProductItem } from "./product-item";
import { cn } from "@/lib/utils";

interface ProductListProps {
  products: Product[];
  className?: string;
}

export const ProductList: React.FC<ProductListProps> = ({
  products,
  className,
}) => {
  return (
    <div className={cn("grid grid-cols-fit gap-y-10 gap-x-6", className)}>
      {products.map((product) => (
        <ProductItem key={product.id} product={product} />
      ))}
    </div>
  );
};
