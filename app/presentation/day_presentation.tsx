import DayEventsList from "@/components/DayEventsList";
import TimeUnitNameDisplay from "@/components/TimeUnitNameDisplay";
import { Colors } from "@/contants/Colors";
import { CalendarEvent } from "@/types/CalendarEvent";
import { formatUkrainianDate } from "@/utils/utils";
import React, { useEffect, useState } from "react";
import { View } from "react-native";

const day_presentation = () => {
  const [date, setDate] = useState(new Date());
  const [dateTitle, setDateTitle] = useState("");
  const [events, setEvents] = useState<CalendarEvent[]>([]);

  useEffect(() => {
    setDateTitle(formatUkrainianDate(date));
  }, [date]);

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
