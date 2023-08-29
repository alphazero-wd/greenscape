import React from "react";
import { Product } from "../types";
import { ProductItem } from "./product-item";

interface ProductListProps {
  products: Product[];
}

export const ProductList: React.FC<ProductListProps> = ({ products }) => {
  return (
    <div className="grid mt-6 sm:grid-cols-3 sm:gap-y-0 gap-y-10 sm:gap-x-6">
      {products.map((product) => (
        <ProductItem key={product.id} product={product} />
      ))}
    </div>
  );
};
