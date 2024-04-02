import { useEffect, useMemo, useState } from "react";
import { Category } from "@/types/category";
import { Product } from "@/types/product";
import { getCategories } from "@/api/categories";
import { getProducts } from "@/api/products";
import { SearchQueries } from "@/types/search";
import { useLocalSearchParams } from "expo-router";
import { Range } from "@/types/base";

export const useProductsFilter = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isOutOfStockIncluded, setIsOutOfStockIncluded] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );
  const [currentPriceRange, setCurrentPriceRange] = useState<Range>([1, 100]);
  // @ts-ignore
  const searchParams = useLocalSearchParams<SearchQueries>();

  const maxPrice = useMemo(() => {
    return products.reduce((max, product) => Math.max(max, product.price), 1);
  }, [products]);

  useEffect(() => {
    getCategories().then((data) => setCategories(data));
  }, []);

  useEffect(() => {
    let queryString = "";
    if (searchQuery) queryString += "&q=" + searchQuery;
    if (selectedCategory) queryString += "&categoryIds=" + selectedCategory.id;
    if (!isOutOfStockIncluded) queryString += "&inStock=true";
    setTimeout(
      () =>
        getProducts("?limit=12" + queryString).then((data) =>
          setProducts(data)
        ),
      500
    );
  }, [searchQuery, isOutOfStockIncluded, selectedCategory?.id]);

  useEffect(() => {
    if (searchParams.q?.length > 3) setSearchQuery(searchParams.q);
    if (searchParams.inStock) setIsOutOfStockIncluded(false);
  }, [searchParams]);

  useEffect(() => {
    if (searchParams.categoryIds) {
      const categoryIds = searchParams.categoryIds
        .split(",")
        .map((id: string) => +id);
      const category = categories.find((c) => categoryIds.includes(c.id));
      if (category) setSelectedCategory(category);
    }
  }, [categories, searchParams.categoryIds]);

  return {
    searchQuery,
    setSearchQuery,
    isOutOfStockIncluded,
    setIsOutOfStockIncluded,
    products,
    categories,
    selectedCategory,
    setSelectedCategory,
    maxPrice,
    currentPriceRange,
    setCurrentPriceRange,
  };
};
