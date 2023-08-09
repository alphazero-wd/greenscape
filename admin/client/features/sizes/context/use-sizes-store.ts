import { create } from "zustand";
import { Size } from "../types";

interface SizesStore {
  sizes: Size[];
  findSizes: (sizes: Size[]) => void;
  createSize: (size: Size) => void;
  updateSize: (id: number, updatedSize: Size) => void;
  deleteSizes: (ids: number[]) => void;
}

export const useSizesStore = create<SizesStore>((set) => ({
  sizes: [],
  findSizes: (sizes) => set({ sizes }),
  createSize: (size) => set(({ sizes }) => ({ sizes: [...sizes, size] })),
  updateSize: (id, updatedSize) =>
    set(({ sizes }) => ({
      sizes: sizes.map((c) => (c.id === id ? updatedSize : c)),
    })),
  deleteSizes: (ids) =>
    set(({ sizes }) => ({
      sizes: sizes.filter((c) => !ids.includes(c.id)),
    })),
}));
