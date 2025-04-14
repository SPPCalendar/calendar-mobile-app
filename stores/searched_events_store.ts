import { CalendarEvent } from "@/types/CalendarEvent";
import { create } from "zustand";
import { fetchEvents } from "@/utils/eventApi";

interface SearchedEventsState {
  events: CalendarEvent[];
  setEvents: (calendarId: number | null, searchText: string) => void;
  clearEvents: () => void;
}

export const useSearchedEventsStore = create<SearchedEventsState>((set) => ({
  events: [],
  setEvents: async (calendarId, eventName) => {
    try {
      const startDate = new Date("2000-01-01T00:00:00Z");
      startDate.setHours(0, 0, 0, 0);

      const endDate = new Date();
      endDate.setHours(23, 59, 59, 999);

      const fetched = await fetchEvents(
        calendarId,
        startDate,
        endDate,
        eventName
      );
      set({ events: fetched });
    } catch (error) {
      console.error("Failed to fetch events:", error);
      set({ events: [] });
    }
  },
  clearEvents: () => set({ events: [] }),
}));
