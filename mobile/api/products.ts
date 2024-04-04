import { Product, ProductsResponse } from "@/types/product";

const API_URL = process.env.EXPO_PUBLIC_API_URL + "/products";

export const getProducts = async (
  query?: string
): Promise<ProductsResponse> => {
  try {
    const res = await fetch(API_URL + query);
    const { count, data } = await res.json();
    return { data, count };
  } catch (error) {
    console.error(error.message);
    return { data: [], count: 0 };
  }
};

export const getProduct = async (id: string): Promise<Product | null> => {
  try {
    const res = await fetch(API_URL + "/" + id);
    const { data } = await res.json();
    return data;
  } catch (error) {
    console.error(error.message);
    return null;
  }
};
