import { getCategories } from "@/api/categories";
import { getProducts } from "@/api/products";
import { Categories } from "@/components/categories";
import { Products } from "@/components/products";
import { Category } from "@/types/category";
import { Product } from "@/types/product";
import { Font } from "@/types/theme";
import { useEffect, useState } from "react";
import { ImageBackground, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AppBar } from "@/components/layout/appbar";

export default function ProductsPage() {
  const insets = useSafeAreaInsets();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    getProducts("?limit=4&status=Active&sortBy=orders&inStock=true").then(
      ({ data }) => setProducts(data)
    );

    getCategories("?limit=4").then((data) => setCategories(data));
  }, []);

  return (
    <View style={{ paddingTop: 8 + insets.top }}>
      <AppBar />
      <Products
        ListHeaderComponent={
          <>
            <ImageBackground
              source={require("../../assets/images/banner.png")}
              style={styles.banner}
            >
              <View style={styles.overlay} />
              <Text style={styles.title}>Unleash the Jungle</Text>
              <Text style={styles.title}>in your home!</Text>
            </ImageBackground>
            <View style={{ marginHorizontal: -12 }}>
              <Categories categories={categories} />
            </View>
            <Text style={styles.favoritesHeading}>Our Favorites</Text>
          </>
        }
        products={products}
        ListFooterComponent={<View style={{ height: 50 }} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: 40,
    height: 40,
    borderRadius: 999,
  },
  overlay: {
    height: "100%",
    width: "100%",
    flex: 1,
    position: "absolute",
    left: 0,
    top: 0,
    opacity: 0.5,
    backgroundColor: "black",
  },
  banner: {
    marginHorizontal: -12,
    marginBottom: 16,
    height: 200,
    justifyContent: "center",
  },
  title: {
    fontFamily: Font.SemiBold,
    fontSize: 20,
    textAlign: "center",
    color: "white",
  },
  favoritesHeading: {
    marginVertical: 16,
    textAlign: "center",
    marginLeft: 8,
    fontFamily: Font.Bold,
    fontSize: 24,
  },
});
