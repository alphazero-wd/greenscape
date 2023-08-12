import { create } from "zustand";

interface DeleteRecordsModalStore {
  isOpen: boolean;
  ids: number[];
  onOpen: (ids: number[]) => void;
  onClose: () => void;
}

export const useDeleteRecordsModal = create<DeleteRecordsModalStore>((set) => ({
  isOpen: false,
  ids: [],
  onOpen: (ids) => set({ isOpen: true, ids }),
  onClose: () => set({ isOpen: false, ids: [] }),
}));
