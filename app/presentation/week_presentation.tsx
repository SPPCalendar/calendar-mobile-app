import CalendarWeekGrid from "@/components/CalendarWeekGrid";
import TimeUnitNameDisplay from "@/components/TimeUnitNameDisplay";
import { Colors } from "@/contants/Colors";
import { useEffect, useState } from "react";
import { View } from "react-native";
import dayjs from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek";
import { fetchEvents, fetchWeekEvents } from "@/utils/eventApi";
import { useCalendarStore } from "@/stores/calendar_store";
import { CalendarEvent } from "@/types/CalendarEvent";
import { getWeekDates } from "@/utils/utils";

dayjs.extend(isoWeek);



export default function WeekPresentation() {
  const initialWeek = dayjs().isoWeek();

  const [weekNumber, setWeekNumber] = useState(initialWeek);
  const [weekDates, setWeekDates] = useState(() => getWeekDates(initialWeek, 2025));

  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const calendarId = useCalendarStore((state) => state.calendarId); // pull the calendarId
  
  const moveMinusOneWeek = () => setWeekNumber((prev) => prev - 1);
  const movePlusOneWeek = () => setWeekNumber((prev) => prev + 1);

  useEffect(() => {
    const fetchData = async () => {
      const fetched = await fetchWeekEvents(weekNumber, 2025, calendarId);   // TODO: calculate year based on weekNumber
      setWeekDates(getWeekDates(weekNumber, 2025));
      setEvents(fetched);
    }

    fetchData();
  }, [weekNumber, calendarId]);

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
        monthName={`${weekNumber} тиждень`}
        onPressLeftArrow={moveMinusOneWeek}
        onPressRightArrow={movePlusOneWeek}
      />

      <CalendarWeekGrid style={{ marginTop: 30 }} weekDates={weekDates} events={events} />
    </View>
  );
}
