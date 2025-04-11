import api from "@/utils/api";
import { CalendarEvent } from "@/types/CalendarEvent";

/**
 * Fetches calendar events for a given calendar and date range
 */
export const fetchEvents = async (
  calendarId: number | null,
  startDate: Date,
  endDate: Date
): Promise<CalendarEvent[]> => {
  if (!calendarId) {
    console.warn("No calendar specified when fetching events")
    return [];
  }

  try {
    const response = await api.get<CalendarEvent[]>("/events", {
      params: {
        calendar_id: calendarId,
        start_time: startDate.toISOString(),
        end_time: endDate.toISOString(),
      },
    });

    return response.data;
  } catch (error: any) {
    console.error("Failed to fetch events:", error?.response?.data || error.message);
    return [];
  }
};
