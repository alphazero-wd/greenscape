import { create } from "zustand";

interface MobileNavStore {
  isOpen: boolean;
  onToggle: () => void;
}

export const useMobileNav = create<MobileNavStore>((set) => ({
  isOpen: false,
  onToggle: () => set(({ isOpen }) => ({ isOpen: !isOpen })),
}));
