import { create } from "zustand";

interface DeleteRecordsModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useDeleteRecordsModal = create<DeleteRecordsModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
