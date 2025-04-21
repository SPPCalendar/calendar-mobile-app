import api from "@/utils/api";
import { CalendarEvent } from "@/types/CalendarEvent";
import dayjs from "dayjs";
import { getMonthStartEndWeeks, Month } from "./utils";

import isoWeeksInYear from "dayjs/plugin/isoWeeksInYear"
import isLeapYear from "dayjs/plugin/isLeapYear"

dayjs.extend(isoWeeksInYear)
dayjs.extend(isLeapYear)

/**
 * Fetches calendar events for a given calendar and date range
 */
export const fetchEvents = async (
  calendarId: number | null,
  startDate: Date,
  endDate: Date,
  eventName: string | null = null,
): Promise<CalendarEvent[]> => {
  if (!calendarId) {
    console.warn("No calendar specified when fetching events")
    return [];
  }

  try {
    const response = await api.get("/events", {
      params: {
        calendar_id: calendarId,
        start_time: startDate.toISOString(),
        end_time: endDate.toISOString(),
        event_name: eventName,
      },
    });

    return response.data.data;
  } catch (error: any) {
    console.error("Failed to fetch events:", error?.response?.data || error.message);
    return [];
  }
};

export const fetchWeekEvents = async (
  weekNumber: number, 
  year: number, 
  calendarId: number | null
) => {
  const startOfWeek = dayjs().year(year).isoWeek(weekNumber).startOf("isoWeek");
  const endOfWeek = dayjs().year(year).isoWeek(weekNumber).endOf("isoWeek");

  const fetched = await fetchEvents(calendarId, startOfWeek.toDate(), endOfWeek.toDate());
  return fetched;
};


export const fetchMonthEvents = async (
  month: Month,  // 1-indexed
  year: number,
  calendarId: number | null,
) => {
  const { startWeekNumber, endWeekNumber } = getMonthStartEndWeeks(month, year);  // we want it still 1-indexed

  const fetched: CalendarEvent[][] = [];

  // Get total ISO weeks in this year (e.g. 52 or 53)
  const totalWeeksThisYear = dayjs().year(year).isoWeeksInYear();

  // Case: endWeekNumber === 1 AND month is December → wrap around to next year
  const crossingToNextYear = endWeekNumber === 1 && month === Month.December;

  const finalWeek = crossingToNextYear ? totalWeeksThisYear : endWeekNumber;

  for (let week = startWeekNumber; week <= finalWeek; week++) {
    const weekEvents = await fetchWeekEvents(week, year, calendarId);
    fetched.push(weekEvents);
  }

  // Fetch week 1 of next year if needed
  if (crossingToNextYear) {
    const week1Events = await fetchWeekEvents(1, year + 1, calendarId);
    fetched.push(week1Events);
  }

  return fetched;
}