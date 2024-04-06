import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { BagItem } from "@/types/bag";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface BagStore {
  bag: BagItem[];
  getTotalQty: () => number;
  getTotalPrice: () => number;
  findBagItem: (id: number) => BagItem | undefined;
  addToBag: (bagItem: BagItem) => void;
  updateQty: (id: number, qty: number) => void;
  removeBagItem: (id: number) => void;
  clearBag: () => void;
}

export const useBagStore = create(
  persist<BagStore>(
    (set, get) => ({
      bag: [],
      findBagItem: (id) => get().bag.find((item) => item.id === id),
      getTotalQty: () => get().bag.reduce((sum, item) => (sum += item.qty), 0),
      getTotalPrice: () =>
        get().bag.reduce(
          (totalPrice, item) => (totalPrice += item.qty * item.price),
          0
        ),
      addToBag: (bagItem) => {
        set({ bag: [...get().bag, bagItem] });
      },
      updateQty: (id, qty) => {
        set({
          bag: get().bag.map((item) =>
            item.id === id ? { ...item, qty } : item
          ),
        });
      },
      removeBagItem: (id) => {
        set({ bag: get().bag.filter((item) => item.id !== id) });
      },
      clearBag: () => {
        set({ bag: [] });
      },
    }),
    {
      name: "bag-store",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
