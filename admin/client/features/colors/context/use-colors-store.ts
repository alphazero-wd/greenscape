import { create } from "zustand";
import { Color } from "../types";

interface ColorsStore {
  colors: Color[];
  findColors: (colors: Color[]) => void;
  createColor: (color: Color) => void;
  updateColor: (id: number, updatedColor: Color) => void;
  deleteColors: (ids: number[]) => void;
}

export const useColorsStore = create<ColorsStore>((set) => ({
  colors: [],
  findColors: (colors) => set({ colors }),
  createColor: (color) => set(({ colors }) => ({ colors: [...colors, color] })),
  updateColor: (id, updatedColor) =>
    set(({ colors }) => ({
      colors: colors.map((c) => (c.id === id ? updatedColor : c)),
    })),
  deleteColors: (ids) =>
    set(({ colors }) => ({
      colors: colors.filter((c) => !ids.includes(c.id)),
    })),
}));
