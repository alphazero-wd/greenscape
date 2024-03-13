import { Product } from "@/types/product";
import { FlatList, ScrollView, StyleSheet } from "react-native";
import { ProductItem } from "./product-item";

interface ProductsProps {
  products: Product[];
}

export const Products = ({ products }: ProductsProps) => {
  return (
    <ScrollView style={{ rowGap: 4 }}>
      {products.map((product) => (
        <ProductItem product={product} />
      ))}
    </ScrollView>
  );
};
