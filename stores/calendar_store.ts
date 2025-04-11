import { create } from "zustand";

interface CalendarState {
  calendarId: number | null;
  setCalendarId: (id: number) => void;
  clearCalendarId: () => void;
}

export const useCalendarStore = create<CalendarState>((set) => ({
  calendarId: null,
  setCalendarId: (id) => set({ calendarId: id }),
  clearCalendarId: () => set({ calendarId: null }),
}));
