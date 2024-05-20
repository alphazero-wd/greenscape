import { create } from "zustand";

interface State {
  minPrice: number | null;
  maxPrice: number | null;
  selectedCategory: string | null;
  outOfStockIncluded: boolean;
  page: number;
  q: string;
}

interface Action {
  update: (newState: Partial<State>) => void;
}

export const useQueryStore = create<State & Action>((set) => ({
  minPrice: null,
  maxPrice: null,
  selectedCategory: null,
  outOfStockIncluded: false,
  q: "",
  page: 1,
  update: (newState) => set((prevState) => ({ ...prevState, ...newState })),
}));
