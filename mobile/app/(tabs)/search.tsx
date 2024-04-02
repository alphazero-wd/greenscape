import { Categories } from "@/components/categories";
import { AppBar } from "@/components/layout/appbar";
import { Products } from "@/components/products";
import { CategoryFilterLabel } from "@/components/products/category-filter-label";
import { InStockFilter } from "@/components/products/in-stock-filter";
import { PriceFilter } from "@/components/products/price-filter";
import { SearchInput } from "@/components/products/search-input";
import { Font, Gray } from "@/types/theme";
import { AntDesign } from "@expo/vector-icons";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useProductsFilter } from "@/hooks/use-products-filter";

export default function SearchPage() {
  const insets = useSafeAreaInsets();
  const [isFilterEnabled, setIsFilterEnabled] = useState(false);
  const {
    searchQuery,
    setSearchQuery,
    selectedCategory,
    isOutOfStockIncluded,
    setSelectedCategory,
    categories,
    products,
    setIsOutOfStockIncluded,
    maxPrice,
    currentPriceRange,
    setCurrentPriceRange,
  } = useProductsFilter();

  return (
    <View style={{ paddingTop: 8 + insets.top }}>
      <View style={{ paddingBottom: 16 }}>
        <AppBar />
        <SearchInput q={searchQuery} setQ={setSearchQuery} />
      </View>
      <View>
        <Categories categories={categories} />
      </View>
      <View style={{ padding: 16 }}>
        <TouchableOpacity
          onPress={() => setIsFilterEnabled(!isFilterEnabled)}
          style={styles.filterButton}
          activeOpacity={0.6}
        >
          <Text style={styles.filterButtonText}>
            {isFilterEnabled ? "Hide filters" : "Show filters"}
          </Text>
          <AntDesign
            name={isFilterEnabled ? "minus" : "plus"}
            size={16}
            color={Gray.GRAY_500}
          />
        </TouchableOpacity>
        {isFilterEnabled && (
          <View style={{ marginTop: 20 }}>
            <PriceFilter
              currentPriceRange={currentPriceRange}
              onChange={(range) => setCurrentPriceRange(range)}
              priceRange={[1, maxPrice]}
            />
            <InStockFilter
              onChange={() => setIsOutOfStockIncluded(!isOutOfStockIncluded)}
              isOutOfStockIncluded={isOutOfStockIncluded}
            />
          </View>
        )}
        {searchQuery && (
          <Text style={styles.searchResultText}>
            Search for "{searchQuery}"
          </Text>
        )}
        {selectedCategory && (
          <CategoryFilterLabel
            categoryName={selectedCategory.name}
            clearCategory={() => setSelectedCategory(null)}
          />
        )}
      </View>
      <Products
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
  searchResultText: {
    fontFamily: Font.Medium,
    marginTop: 20,
  },
});
