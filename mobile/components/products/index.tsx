import { Product } from "@/types/product";
import { FlatList, FlatListProps } from "react-native";
import { ProductItem } from "./product-item";

interface ProductsProps
  extends Omit<FlatListProps<any>, "data" | "renderItem"> {
  products: Product[];
}

export const Products = ({ products, ...props }: ProductsProps) => {
  return (
    <FlatList
      numColumns={2} // children need to specify width
      contentContainerStyle={{ gap: 12, paddingHorizontal: 12 }}
      columnWrapperStyle={{ gap: 8 }}
      {...props}
      data={products}
      renderItem={({ item }) => <ProductItem product={item} key={item.id} />}
    />
  );
};
