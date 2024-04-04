import { useEffect, useMemo, useState } from "react";
import { Category } from "@/types/category";
import { Product } from "@/types/product";
import { getCategories } from "@/api/categories";
import { getProducts } from "@/api/products";
import { SearchQueries } from "@/types/search";
import { useLocalSearchParams } from "expo-router";
import { Range } from "@/types/base";
import { PAGE_LIMIT } from "../constants";
import { usePagination } from "./use-pagination";

export const useProductsFilter = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isOutOfStockIncluded, setIsOutOfStockIncluded] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPriceRange, setCurrentPriceRange] = useState<Range>([1, 500]);
  // @ts-ignore
  const searchParams = useLocalSearchParams<SearchQueries>();

  const maxPrice = useMemo(() => {
    return products.reduce((max, product) => Math.max(max, product.price), 500);
  }, [products]);

  useEffect(() => {
    getCategories().then((data) => setCategories(data));
  }, []);

  useEffect(() => {
    let queryString = "";
    if (searchQuery) queryString += "&q=" + searchQuery;
    if (selectedCategory) queryString += "&categoryIds=" + selectedCategory.id;
    if (!isOutOfStockIncluded) queryString += "&inStock=true";
    queryString +=
      "&price=" + currentPriceRange[0] + "," + currentPriceRange[1];
    queryString += "&offset=" + (currentPage - 1) * PAGE_LIMIT;
    setTimeout(
      () =>
        getProducts("?limit=" + PAGE_LIMIT + queryString).then(
          ({ data, count }) => {
            setTotalCount(count);
            setProducts(data);
          }
        ),
      500
    );
  }, [
    searchQuery,
    isOutOfStockIncluded,
    selectedCategory?.id,
    currentPriceRange,
    currentPage,
  ]);

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
    if (searchParams.offset)
      setCurrentPage((+searchParams.offset || currentPage) / PAGE_LIMIT);
    if (searchParams.price) {
      const price = searchParams.price
        .split(",")
        .map((priceRange: string) => +priceRange);
      setCurrentPriceRange([
        price[0] || currentPriceRange[0],
        price[1] || currentPriceRange[1],
      ]);
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
    currentPage,
    setCurrentPage,
    totalCount,
  };
};
