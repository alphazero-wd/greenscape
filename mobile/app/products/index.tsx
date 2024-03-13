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

export default function ProductsPage() {
  const insets = useSafeAreaInsets();
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    getProducts("?limit=5&status=Active&inStock=true").then((data) =>
      setProducts(data)
    );
  }, []);

  return (
    <View style={{ paddingTop: 8 + insets.top }}>
      <View style={styles.appBar}>
        <Logo />
        <TouchableOpacity activeOpacity={0.6}>
          <Ionicons name="bag-handle-outline" size={28} color={Gray.GRAY_700} />
        </TouchableOpacity>
      </View>
      <ImageBackground
        source={require("../../assets/images/banner.png")}
        style={styles.banner}
      >
        <View style={styles.overlay} />
        <Text style={styles.title}>Unleash the Jungle in Your Home</Text>
        <Text style={styles.title}>with Monstera Deliciosa!</Text>
      </ImageBackground>
      <View style={styles.favoritesContainer}>
        <Text style={styles.favoritesHeading}>Our Favorites</Text>
        <Products products={products} />
      </View>
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
    paddingHorizontal: 8,
    paddingRight: 16,
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
  favoritesContainer: {
    marginVertical: 16,
    paddingHorizontal: 16,
  },
  favoritesHeading: {
    fontFamily: Font.Bold,
    fontSize: 24,
    marginBottom: 8,
  },
});
