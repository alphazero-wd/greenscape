import { create } from "zustand";
import { Category } from "../types";

interface CategoriesStore {
  categories: Category[];
  count: number;
  getCategories: (count: number, categories: Category[]) => void;
}

export const useCategoriesStore = create<CategoriesStore>((set) => ({
  categories: [],
  count: 0,
  getCategories: (count, categories) => set({ categories, count }),
}));
