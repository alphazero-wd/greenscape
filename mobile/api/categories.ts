import { Category } from "@/types/category";

const API_URL = process.env.EXPO_PUBLIC_API_URL + "/categories";

export const getCategories = async (query?: string): Promise<Category[]> => {
  try {
    const res = await fetch(API_URL + (query || ""));
    const { data } = await res.json();
    return data;
  } catch (error) {
    console.error(error.message);
    return [];
  }
};
