import { create } from "zustand";

interface EditCategoryModalStore {
  isOpen: boolean;
  id: number;
  onOpen: (id: number) => void;
  onClose: () => void;
}

export const useEditCategoryModal = create<EditCategoryModalStore>((set) => ({
  isOpen: false,
  id: 0,
  onOpen: (id) => set({ isOpen: true, id }),
  onClose: () => set({ isOpen: false, id: 0 }),
}));
