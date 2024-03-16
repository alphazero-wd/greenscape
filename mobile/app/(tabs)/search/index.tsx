import { getCategories } from "@/api/categories";
import { getProducts } from "@/api/products";
import { Categories } from "@/components/categories";
import { AppBar } from "@/components/layout/appbar";
import { Products } from "@/components/products";
import { SearchInput } from "@/components/products/search-input";
import { Category } from "@/types/category";
import { Product } from "@/types/product";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Font, Gray } from "../../../types/theme";

export default function SearchPage() {
  const insets = useSafeAreaInsets();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    getCategories("?limit=10").then((data) => setCategories(data));
    getProducts("?limit=12").then((data) => setProducts(data));
  }, []);

  return (
    <View style={{ paddingTop: 8 + insets.top }}>
      <View style={{ paddingBottom: 16 }}>
        <AppBar />
        <SearchInput />
      </View>
      <Products
        ListHeaderComponent={
          <View style={{ paddingVertical: 16 }}>
            <Categories categories={categories} />
            <Link href="/search/modal" asChild>
              <TouchableOpacity style={styles.filterButton} activeOpacity={0.6}>
                <Ionicons name="funnel" size={20} color={Gray.GRAY_500} />
                <Text style={styles.filterButtonText}>Filter</Text>
              </TouchableOpacity>
            </Link>
          </View>
        }
        products={products}
        ListFooterComponent={<View style={{ height: 120 }} />}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  filterButton: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 8,
  },
  filterButtonText: {
    fontFamily: Font.Medium,
    color: Gray.GRAY_600,
  },
});
