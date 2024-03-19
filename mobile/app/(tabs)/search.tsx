import { getCategories } from "@/api/categories";
import { getProducts } from "@/api/products";
import { Categories } from "@/components/categories";
import { AppBar } from "@/components/layout/appbar";
import { Products } from "@/components/products";
import { SearchInput } from "@/components/products/search-input";
import { Category } from "@/types/category";
import { Product } from "@/types/product";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useMemo, useState } from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Font, Gray } from "@/types/theme";
import { PriceFilter } from "@/components/products/price-filter";

const MAX_WIDTH = Dimensions.get("window").width - 32;

export default function SearchPage() {
  const insets = useSafeAreaInsets();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [currentPriceRange, setCurrentPriceRange] = useState<[number, number]>([
    0, 100,
  ]);

  useEffect(() => {
    getCategories("?limit=10").then((data) => setCategories(data));
    getProducts("?limit=12").then((data) => setProducts(data));
  }, []);

  const priceRange: [number, number] = useMemo(() => {
    return products.reduce(
      ([min, max], product) => [
        Math.min(min, product.price),
        Math.max(max, product.price),
      ],
      [Infinity, 0]
    );
  }, [products]);

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
            <TouchableOpacity style={styles.filterButton} activeOpacity={0.6}>
              <Text style={styles.filterButtonText}>Filters</Text>
              <Ionicons name="add" size={20} color={Gray.GRAY_500} />
            </TouchableOpacity>
            <View style={{ marginTop: 20 }}>
              <PriceFilter priceRange={priceRange} />
            </View>
          </View>
        }
        products={products}
        ListFooterComponent={<View style={{ height: 120 }} />}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  priceRangeText: {
    fontFamily: Font.Medium,
    color: Gray.GRAY_900,
    marginBottom: 16,
  },
  filterButton: {
    borderColor: Gray.GRAY_300,
    borderWidth: 1,
    borderRadius: 4,
    width: "100%",
    padding: 12,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    columnGap: 8,
  },
  filterButtonText: {
    fontFamily: Font.Medium,
    color: Gray.GRAY_600,
  },
});
