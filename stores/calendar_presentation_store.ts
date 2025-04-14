import { CalendarPresentation } from "@/types/CalendarPresentation";
import { create } from "zustand";

interface CalendarPresentationState {
  presentation: CalendarPresentation;
  changePresentation: (presentation: CalendarPresentation) => void;
}

export const useCalendarPresentationStore = create<CalendarPresentationState>(
  (set) => ({
    presentation: CalendarPresentation.Day,
    changePresentation: (presentation) => set({ presentation: presentation }),
  })
);
