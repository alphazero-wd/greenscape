import { create } from "zustand";

interface EditSizeModalStore {
  isOpen: boolean;
  id: number;
  onOpen: (id: number) => void;
  onClose: () => void;
}

export const useEditSizeModal = create<EditSizeModalStore>((set) => ({
  isOpen: false,
  id: 0,
  onOpen: (id) => set({ isOpen: true, id }),
  onClose: () => set({ isOpen: false, id: 0 }),
}));
