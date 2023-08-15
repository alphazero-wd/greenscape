import { create } from "zustand";
import { Size } from "../types";

interface EditSizeModalStore {
  isOpen: boolean;
  currentSize: Size | null;
  onOpen: (size: Size) => void;
  onClose: () => void;
}

export const useEditSizeModal = create<EditSizeModalStore>((set) => ({
  isOpen: false,
  currentSize: null,
  onOpen: (size) => set({ isOpen: true, currentSize: size }),
  onClose: () => set({ isOpen: false, currentSize: null }),
}));
