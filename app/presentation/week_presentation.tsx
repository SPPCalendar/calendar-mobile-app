import CalendarWeekGrid from "@/components/CalendarWeekGrid";
import TimeUnitNameDisplay from "@/components/TimeUnitNameDisplay";
import { Colors } from "@/contants/Colors";
import { useEffect, useState } from "react";
import { View } from "react-native";
import dayjs from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek";
import { fetchEvents } from "@/utils/eventApi";
import { useCalendarStore } from "@/stores/calendar_store";
import { CalendarEvent } from "@/types/CalendarEvent";

dayjs.extend(isoWeek);

const getWeekDates = (weekNumber: number) => {
  const startOfWeek = dayjs().isoWeek(weekNumber).startOf("isoWeek");

  // Generate all 7 days (Mon–Sun)
  const days: dayjs.Dayjs[] = [];
  for (let i = 0; i < 7; i++) {
    days.push(startOfWeek.add(i, "day"));
  }

  return days;
}

export default function WeekPresentation() {
  const initialWeek = dayjs().isoWeek();

  const [weekNumber, setWeekNumber] = useState(initialWeek);
  const [weekDates, setWeekDates] = useState(() => getWeekDates(initialWeek));

  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const calendarId = useCalendarStore((state) => state.calendarId); // pull the calendarId
  
  useEffect(() => {
    const fetchWeekEvents = async () => {
      if (!calendarId) {
        setEvents([]);
        return;
      }
  
      const startOfWeek = dayjs().isoWeek(weekNumber).startOf("isoWeek");
      const endOfWeek = dayjs().isoWeek(weekNumber).endOf("isoWeek");
  
      setWeekDates(getWeekDates(weekNumber));
  
      try {
        const events = await fetchEvents(calendarId, startOfWeek.toDate(), endOfWeek.toDate());
        setEvents(events);
      } catch (err) {
        console.error("Failed to fetch weekly events:", err);
        setEvents([]);
      }
    };
  
    fetchWeekEvents();
  }, [weekNumber, calendarId]);

  const moveMinusOneWeek = () => setWeekNumber((prev) => prev - 1);
  const movePlusOneWeek = () => setWeekNumber((prev) => prev + 1);

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        height: 20,
        backgroundColor: Colors.backgroundColor,
      }}
    >
      <TimeUnitNameDisplay
        style={{ marginTop: 20 }}
        monthName={`Травень (${weekNumber} тиждень)`}
        onPressLeftArrow={moveMinusOneWeek}
        onPressRightArrow={movePlusOneWeek}
      />

      <CalendarWeekGrid style={{ marginTop: 30 }} weekDates={weekDates} events={events} />
    </View>
  );
}
