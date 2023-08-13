import { create } from "zustand";
import { Category } from "../types";

interface CategoriesStore {
  categories: Category[];
  count: number;
  getCategories: (count: number, categories: Category[]) => void;
  createCategory: (category: Category) => void;
  updateCategory: (id: number, updatedCategory: Category) => void;
  deleteCategories: (ids: number[]) => void;
}

export const useCategoriesStore = create<CategoriesStore>((set) => ({
  categories: [],
  count: 0,
  getCategories: (count, categories) => set({ categories, count }),
  createCategory: (category) =>
    set(({ categories, count }) => ({
      categories: [...categories, category],
      count: count + 1,
    })),
  updateCategory: (id, updatedCategory) =>
    set(({ categories }) => ({
      categories: categories.map((c) => (c.id === id ? updatedCategory : c)),
    })),
  deleteCategories: (ids) =>
    set(({ categories, count }) => ({
      categories: categories.filter((c) => !ids.includes(c.id)),
      count: count - ids.length,
    })),
}));
