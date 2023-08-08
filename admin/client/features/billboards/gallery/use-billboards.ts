import axios from "axios";
import { toast } from "react-hot-toast";
import { create } from "zustand";
import { Billboard } from "../types";
import { useSwitchFeatured } from "./use-switch-featured";

interface BillboardsStore {
  billboards: Billboard[];
  selectedBillboardIds: number[];
  getBillboards: (billboards: Billboard[]) => void;
  toggleFeaturedBillboard: (id: number, isFeatured: boolean) => Promise<void>;
  toggleSelectedBillboardIds: (id: number) => void;
  deleteBillboards: (ids: number[]) => Promise<void>;
}

export const useBillboards = create<BillboardsStore>((set) => ({
  billboards: [],
  selectedBillboardIds: [],
  getBillboards: (billboards) => set({ billboards }),
  toggleFeaturedBillboard: async (id, isFeatured) => {
    const { switchFeatured } = useSwitchFeatured();
    await switchFeatured(id.toString(), isFeatured);
    set(({ billboards }) => ({
      billboards: billboards.map((billboard) =>
        billboard.id === id
          ? { ...billboard, isFeatured: !billboard.isFeatured }
          : billboard,
      ),
    }));
  },

  toggleSelectedBillboardIds: (id: number) =>
    set(({ selectedBillboardIds }) => ({
      selectedBillboardIds: selectedBillboardIds.includes(id)
        ? selectedBillboardIds.filter((bid) => bid !== id)
        : [...selectedBillboardIds, id],
    })),

  deleteBillboards: async (ids) => {
    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/billboards?ids=${ids}`,
        { withCredentials: true },
      );
      toast.success("Billboards removed");
      set(({ billboards, selectedBillboardIds }) => ({
        billboards: billboards.filter(
          (billboard) => !ids.includes(billboard.id),
        ),
        selectedBillboardIds: selectedBillboardIds.filter(
          (id) => !ids.includes(id),
        ),
      }));
    } catch (error) {
      toast.error("Something went wrong");
    }
  },
}));
