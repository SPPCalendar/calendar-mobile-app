import DayEventsList from "@/components/DayEventsList";
import TimeUnitNameDisplay from "@/components/TimeUnitNameDisplay";
import { Colors } from "@/contants/Colors";
import { CalendarEvent } from "@/types/CalendarEvent";
import { formatUkrainianDate } from "@/utils/utils";
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { useCalendarStore } from "@/stores/calendar_store";
import api from "@/utils/api";
import { fetchEvents } from "@/utils/eventApi";

const day_presentation = () => {
  const [date, setDate] = useState(new Date());
  const [dateTitle, setDateTitle] = useState("");
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const calendarId = useCalendarStore((state) => state.calendarId);

  useEffect(() => {
    // Set date title
    setDateTitle(formatUkrainianDate(date));
    // Fetch events for the current date
    loadEvents();
  }, [date, calendarId]);

  const moveMinusOneDay = () => {
    const previousDate = new Date(date);
    previousDate.setDate(date.getDate() - 1);
    setDate(previousDate);
  };

  const movePlusOneDay = () => {
    const nextDate = new Date(date);
    nextDate.setDate(date.getDate() + 1);
    setDate(nextDate);
  };
  
  const loadEvents = async () => {
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    const fetched = await fetchEvents(calendarId, startOfDay, endOfDay);
    setEvents(fetched);
  };

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        height: 20,
        backgroundColor: Colors.backgroundColor,
        paddingInline: 13,
      }}
    >
      <TimeUnitNameDisplay
        style={{ marginTop: 20 }}
        monthName={dateTitle}
        onPressLeftArrow={moveMinusOneDay}
        onPressRightArrow={movePlusOneDay}
      />
      <DayEventsList style={{ marginTop: 20 }} events={events} />
    </View>
  );
};

export default day_presentation;
