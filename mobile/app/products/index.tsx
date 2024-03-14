import {
  ImageBackground,
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { Font, Gray } from "@/types/theme";
import { Logo } from "@/components/common/logo";
import { Products } from "@/components/products";
import { useEffect, useState } from "react";
import { Product } from "@/types/product";
import { getProducts } from "@/api/products";
import { Categories } from "@/components/categories";
import { Category } from "@/types/category";
import { getCategories } from "@/api/categories";

export default function ProductsPage() {
  const insets = useSafeAreaInsets();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    getProducts("?limit=4&status=Active&sortBy=orders&inStock=true").then(
      (data) => setProducts(data)
    );

    getCategories("?limit=4").then((data) => setCategories(data));
  }, []);

  return (
    <View style={{ paddingTop: 8 + insets.top }}>
      <View style={styles.appBar}>
        <Logo />
        <TouchableOpacity activeOpacity={0.6}>
          <Ionicons name="bag-handle-outline" size={28} color={Gray.GRAY_700} />
        </TouchableOpacity>
      </View>
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
            <Categories categories={categories} />
            <Text style={styles.favoritesHeading}>Our Favorites</Text>
          </>
        }
        products={products}
        ListFooterComponent={<View style={{ height: 60 }} />}
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
  appBar: {
    paddingLeft: 8,
    paddingRight: 20,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    width: "100%",
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
    marginVertical: 16,
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
