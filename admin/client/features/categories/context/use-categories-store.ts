import { create } from "zustand";
import { Category } from "../types";

interface CategoriesStore {
  categories: Category[];
  findCategories: (categories: Category[]) => void;
  createCategory: (category: Category) => void;
  updateCategory: (id: number, updatedCategory: Category) => void;
  deleteCategories: (ids: number[]) => void;
}

export const useCategoriesStore = create<CategoriesStore>((set) => ({
  categories: [],
  findCategories: (categories) => set({ categories }),
  createCategory: (category) =>
    set(({ categories }) => ({ categories: [...categories, category] })),
  updateCategory: (id, updatedCategory) =>
    set(({ categories }) => ({
      categories: categories.map((c) => (c.id === id ? updatedCategory : c)),
    })),
  deleteCategories: (ids) =>
    set(({ categories }) => ({
      categories: categories.filter((c) => !ids.includes(c.id)),
    })),
}));
