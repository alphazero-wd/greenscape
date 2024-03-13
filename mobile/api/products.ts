import { Product } from "@/types/product";

const API_URL = process.env.EXPO_PUBLIC_API_URL + "/products";

export const getProducts = async (query?: string): Promise<Product[]> => {
  try {
    const res = await fetch(API_URL + query);
    const { data } = await res.json();
    return data;
  } catch (error) {
    console.error(error.message);
    return [];
  }
};
