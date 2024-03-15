import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Product } from "@/types/product";
import { getProduct } from "@/api/products";
import { ProductImages } from "@/components/product/images";
import { Font, Gray } from "@/types/theme";

export default function ProductPage() {
  const insets = useSafeAreaInsets();
  const local = useLocalSearchParams();
  const productId = local.id as string;
  const [product, setProduct] = useState<Product | null>();

  useEffect(() => {
    getProduct(productId).then((data) => {
      if (data) setProduct(data);
      else router.push("/404");
    });
  });
  if (!product) return null;

  return (
    <View style={{ paddingTop: 8 + insets.top }}>
      <ProductImages images={product.images} />
      <ScrollView style={{ padding: 16 }}>
        <Text style={styles.productName}>{product.name}</Text>
        <Text style={styles.productDescription}>{product.desc}</Text>
      </ScrollView>
      <View style={{ height: 120 }} />
    </View>
  );
}

const styles = StyleSheet.create({
  productName: {
    fontFamily: Font.Bold,
    fontSize: 20,
  },
  productDescription: {
    marginVertical: 20,
    fontFamily: Font.Regular,
    color: Gray.GRAY_500,
  },
});
