import { create } from "zustand";

interface OpacityState {
  opacity: number;
  makeOpaque: () => void;
  makeDimmed: () => void;
}

export const useOpacityStore = create<OpacityState>((set) => ({
  opacity: 1,
  makeOpaque: () => set({ opacity: 1 }),
  makeDimmed: () => set({ opacity: 0.5 }),
}));
