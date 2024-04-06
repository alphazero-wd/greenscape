import { getProduct, getProducts } from "@/api/products";
import { AddToBagButton } from "@/components/product/add-to-bag-button";
import { ProductImages } from "@/components/product/images";
import { Products } from "@/components/products";
import { useBagStore } from "@/hooks/use-bag-store";
import { Product } from "@/types/product";
import { Font, Gray, Green } from "@/types/theme";
import { formatPrice } from "@/utils/format-price";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function ProductPage() {
  const insets = useSafeAreaInsets();
  const local = useLocalSearchParams();
  const productId = local.id as string;
  const [product, setProduct] = useState<Product | null>();
  const [refProducts, setRefProducts] = useState<Product[]>([]);
  const addToBag = useBagStore((state) => state.addToBag);

  useEffect(() => {
    getProduct(productId).then((data) => {
      if (data) {
        setProduct(data);

        getProducts(
          `?limit=4&categoryIds=${data.category.id}&refIds=${data.id}`
        ).then(({ data: data2 }) => {
          setRefProducts(data2);
        });
      } else router.push("/404");
    });
  }, [productId]);
  if (!product) return null;

  return (
    <View style={{ paddingTop: 8 + insets.top }}>
      <Products
        ListHeaderComponent={
          <>
            <ScrollView style={{ marginHorizontal: -12 }}>
              <ProductImages images={product.images} />
              <View style={{ padding: 16 }}>
                <Text style={styles.productName}>{product.name}</Text>
                <Text style={styles.productPrice}>
                  {formatPrice(product.price)}
                </Text>
                <Text style={styles.productDescription}>{product.desc}</Text>
                <Text
                  style={[
                    styles.inStockText,
                    {
                      color: product.inStock > 0 ? Green.GREEN_600 : "#dc2626",
                    },
                  ]}
                >
                  {product.inStock > 0
                    ? product.inStock + " in stock"
                    : "Out of stock"}
                </Text>
                <AddToBagButton product={product} />
              </View>
            </ScrollView>
            {refProducts.length > 0 && (
              <Text style={styles.refHeading}>You may also like</Text>
            )}
          </>
        }
        products={refProducts}
        ListFooterComponent={<View style={{ height: 16 }} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  productName: {
    fontFamily: Font.Bold,
    fontSize: 20,
  },
  productPrice: {
    marginTop: 8,
    fontFamily: Font.Medium,
    fontSize: 24,
  },
  productDescription: {
    marginTop: 20,
    fontFamily: Font.Regular,
    color: Gray.GRAY_500,
  },
  inStockText: {
    marginTop: 12,
    fontFamily: Font.Medium,
    fontSize: 18,
  },
  refHeading: {
    fontSize: 20,
    fontFamily: Font.Bold,
    marginTop: 20,
    marginBottom: 12,
  },
});
