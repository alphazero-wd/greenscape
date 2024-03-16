import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Product } from "@/types/product";
import { getProduct, getProducts } from "@/api/products";
import { ProductImages } from "@/components/product/images";
import { Color, Font, Gray } from "@/types/theme";
import { formatPrice } from "@/utils/format-price";
import { Ionicons } from "@expo/vector-icons";
import { Products } from "@/components/products";

export default function ProductPage() {
  const insets = useSafeAreaInsets();
  const local = useLocalSearchParams();
  const productId = local.id as string;
  const [product, setProduct] = useState<Product | null>();
  const [refProducts, setRefProducts] = useState<Product[]>([]);

  useEffect(() => {
    getProduct(productId).then((data) => {
      if (data) {
        setProduct(data);

        getProducts(
          `?limit=4&categoryIds=${data.category.id}&refIds=${data.id}`
        ).then((data2) => {
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
                <View style={styles.buttons}>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    style={styles.addToBagButton}
                  >
                    <Text style={styles.addToBagText}>Add to bag</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.addToWishlistButton}
                    activeOpacity={0.8}
                  >
                    <Ionicons
                      name="heart-outline"
                      size={32}
                      color={Gray.GRAY_400}
                    />
                  </TouchableOpacity>
                </View>
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
  buttons: {
    width: "100%",
    marginVertical: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    columnGap: 32,
  },
  addToBagButton: {
    backgroundColor: Color.Primary,
    paddingHorizontal: 12,
    paddingVertical: 20,
    borderRadius: 10,
    alignItems: "center",
    width: Dimensions.get("window").width - 100,
  },
  addToBagText: {
    fontSize: 16,
    color: "white",
    fontWeight: "600",
    fontFamily: Font.SemiBold,
    textAlign: "center",
  },
  addToWishlistButton: {
    width: 32,
    flex: 1,
  },
  refHeading: {
    fontSize: 20,
    fontFamily: Font.Bold,
    marginTop: 20,
    marginBottom: 12,
  },
});
