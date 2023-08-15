import { create } from "zustand";
import { Color } from "../types";

interface EditColorModalStore {
  isOpen: boolean;
  currentColor: Color | null;
  onOpen: (size: Color) => void;
  onClose: () => void;
}

export const useEditColorModal = create<EditColorModalStore>((set) => ({
  isOpen: false,
  currentColor: null,
  onOpen: (size) => set({ isOpen: true, currentColor: size }),
  onClose: () => set({ isOpen: false, currentColor: null }),
}));
