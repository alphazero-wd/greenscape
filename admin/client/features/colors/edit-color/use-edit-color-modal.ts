import { create } from "zustand";

interface EditColorModalStore {
  isOpen: boolean;
  id: number;
  onOpen: (id: number) => void;
  onClose: () => void;
}

export const useEditColorModal = create<EditColorModalStore>((set) => ({
  isOpen: false,
  id: 0,
  onOpen: (id) => set({ isOpen: true, id }),
  onClose: () => set({ isOpen: false, id: 0 }),
}));
