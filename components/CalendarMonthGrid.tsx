import React from "react";
import { ScrollView, StyleProp, View, ViewStyle } from "react-native";
import SevenDaysRow from "./SevenDaysRow";
import dayjs from "dayjs";
import { CalendarEvent } from "@/types/CalendarEvent";

interface MonthNameDisplayProps {
  style?: StyleProp<ViewStyle>;
  monthDatesSplitByWeeks: dayjs.Dayjs[][];
  eventsSplitByWeeks: CalendarEvent[][];
}

const CalendarMonthGrid: React.FC<MonthNameDisplayProps> = ({
  style,
  monthDatesSplitByWeeks,
  eventsSplitByWeeks,
}) => {
  return (
    <ScrollView style={[{ width: "100%" }, style]}>
      {Array(monthDatesSplitByWeeks.length)
        .fill(null)
        .map((num, index) => (
          <SevenDaysRow
            key={index}
            weekDates={monthDatesSplitByWeeks[index] ?? []}
            events={eventsSplitByWeeks[index] ?? []}
          />
        ))}
    </ScrollView>
  );
};

export default CalendarMonthGrid;
