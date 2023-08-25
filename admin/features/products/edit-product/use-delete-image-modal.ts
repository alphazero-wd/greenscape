import { create } from "zustand";

interface DeleteImageModalStore {
  isOpen: boolean;
  imageId: number | null;
  onOpen: (id: number) => void;
  onClose: () => void;
}

export const useDeleteImageModal = create<DeleteImageModalStore>((set) => ({
  isOpen: false,
  imageId: null,
  onOpen: (id) => set({ imageId: id, isOpen: true }),
  onClose: () => set({ imageId: null, isOpen: false }),
}));
