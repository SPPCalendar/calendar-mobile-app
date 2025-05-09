import CalendarMonthGrid from "@/components/CalendarMonthGrid";
import TimeUnitNameDisplay from "@/components/TimeUnitNameDisplay";
import WeekDaysDisplay from "@/components/WeekDaysDisplay";
import { Colors } from "@/contants/Colors";
import { getUkrainianMonthName, Month } from "@/utils/utils";
import dayjs from "dayjs";
import { useCallback, useEffect, useState } from "react";
import { View } from "react-native";
import { getMonthDates } from "@/utils/utils";
import { useCalendarStore } from "@/stores/calendar_store";
import { fetchMonthEvents } from "@/utils/eventApi";
import { CalendarEvent } from "@/types/CalendarEvent";
import { useFocusEffect, useLocalSearchParams } from "expo-router";

export default function MonthPresentation() {
  const { monthParam, yearParam } = useLocalSearchParams();
  const parsedMonth =
    typeof monthParam === "string"
      ? parseInt(monthParam, 10)
      : dayjs().month() + 1;
  const parsedYear =
    typeof yearParam === "string" ? parseInt(yearParam, 10) : dayjs().year();

  const [month, setMonth] = useState<Month>(parsedMonth as Month); // dayjs months are 0-indexed, so we add 1 to keep in line with enums
  const [year, setYear] = useState(parsedYear);

  const [monthDates, setMonthDates] = useState(() =>
    getMonthDates(month, year)
  );
  const [events, setEvents] = useState<CalendarEvent[][]>([]);
  const calendarId = useCalendarStore((state) => state.calendarId);

  const fetchData = async () => {
    const fetched = await fetchMonthEvents(month, year, calendarId);
    setMonthDates(getMonthDates(month, year));
    setEvents(fetched);
  };

  const moveMinusOneMonth = () => {
    let newMonth = null;
    let newYear = null;
    if (month == Month.January) {
      newMonth = Month.December;
      newYear = year - 1;
    } else {
      newMonth = month - 1;
      newYear = year;
    }
    setYear(newYear);
    setMonth(newMonth);
  };

  const movePlusOneMonth = () => {
    let newMonth = null;
    let newYear = null;
    if (month == Month.December) {
      newMonth = Month.January;
      newYear = year + 1;
    } else {
      newMonth = month + 1;
      newYear = year;
    }

    setYear(newYear);
    setMonth(newMonth);
  };

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [month, calendarId])
  );
  
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
        monthName={`${getUkrainianMonthName(month)} ${year}`}
        onPressLeftArrow={moveMinusOneMonth}
        onPressRightArrow={movePlusOneMonth}
      />
      <WeekDaysDisplay style={{ marginTop: 20 }} />
      <CalendarMonthGrid
        style={{ marginTop: 26 }}
        eventsSplitByWeeks={events}
        monthDatesSplitByWeeks={monthDates}
      />
    </View>
  );
}
