import { create } from "zustand";

interface DeleteBillboardsModalStore {
  isOpen: boolean;
  ids: number[];
  onOpen: (ids: number[]) => void;
  onClose: () => void;
}

export const useDeleteBillboardsModal = create<DeleteBillboardsModalStore>(
  (set) => ({
    isOpen: false,
    ids: [],
    onOpen: (ids) => set({ isOpen: true, ids }),
    onClose: () => set({ isOpen: false, ids: [] }),
  }),
);
