import { create } from "zustand";

interface ModalShownStore {
  shown: boolean;
  changeModalShown: (shown: boolean) => void;
}

export const useModalStore = create<ModalShownStore>((set) => ({
  shown: false,
  changeModalShown: (shown) => set({ shown: shown }),
}));
