import React from "react";
import { View } from "react-native";
import MonthTypeDayCell from "./MonthTypeDayCell";
import { CalendarEvent } from "@/types/CalendarEvent";
import dayjs from "dayjs";

interface Props {
  weekDates: dayjs.Dayjs[];
  events: CalendarEvent[];
}

const SevenDaysRow: React.FC<Props> = ({ weekDates, events }) => {
  const eventsPerDay: CalendarEvent[][] = weekDates.map((date) =>
    events.filter((event) => dayjs(event.start_time).isSame(date, "day"))
  );

  return (
    <View style={{ flexDirection: "row" }}>
      {weekDates.map((date, index) => (
        <View
          key={index}
          style={{
            width: `${100 / 7}%`, // ~14.285%
            borderWidth: 0.5,
            borderColor: "#eee", // optional: light border between cells
          }}
        >
          <MonthTypeDayCell date={date} events={eventsPerDay[index]} />
        </View>
      ))}
    </View>
  );
};

export default SevenDaysRow;
