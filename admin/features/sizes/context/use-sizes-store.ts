import { create } from "zustand";
import { Size } from "../types";

interface SizesStore {
  categories: Size[];
  count: number;
  getSizes: (count: number, categories: Size[]) => void;
  createSize: (size: Size) => void;
  updateSize: (id: number, updatedSize: Size) => void;
  deleteSizes: (ids: number[]) => void;
}

export const useSizesStore = create<SizesStore>((set) => ({
  categories: [],
  count: 0,
  getSizes: (count, categories) => set({ categories, count }),
  createSize: (size) =>
    set(({ categories, count }) => ({
      categories: [...categories, size],
      count: count + 1,
    })),
  updateSize: (id, updatedSize) =>
    set(({ categories }) => ({
      categories: categories.map((c) => (c.id === id ? updatedSize : c)),
    })),
  deleteSizes: (ids) =>
    set(({ categories, count }) => ({
      categories: categories.filter((c) => !ids.includes(c.id)),
      count: count - ids.length,
    })),
}));
