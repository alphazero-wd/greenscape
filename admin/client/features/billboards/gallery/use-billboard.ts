import { useDeleteRecords } from "@/features/ui";
import { create } from "zustand";
import { Billboard } from "../types";
import { useSwitchFeatured } from "./use-switch-featured";

interface BillboardStore {
  billboards: Billboard[];
  getBillboards: (billboards: Billboard[]) => void;
  toggleFeaturedBillboard: (id: number, isFeatured: boolean) => Promise<void>;
  deleteBillboards: (ids: number[]) => Promise<void>;
}

export const useBillboard = create<BillboardStore>((set) => ({
  billboards: [],
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

  deleteBillboards: async (ids) => {
    const { deleteRecords } = useDeleteRecords(ids);
    await deleteRecords("billboards");
    set(({ billboards }) => ({
      billboards: billboards.filter((billboard) => !ids.includes(billboard.id)),
    }));
  },
}));
