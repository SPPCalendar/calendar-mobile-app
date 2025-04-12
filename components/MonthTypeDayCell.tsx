import React from "react";
import { Text, View } from "react-native";
import { CalendarEvent } from "@/types/CalendarEvent";
import dayjs from "dayjs";

interface Props {
  date: dayjs.Dayjs;
  events: CalendarEvent[];
}

const MonthTypeDayCell: React.FC<Props> = ({ date, events }) => {
  const MIN_ROWS = 4;
  const placeholderCount = Math.max(0, MIN_ROWS - events.length);

  return (
    <View style={{ padding: 2 }}>
      <Text
        style={{
          height: 13,
          fontFamily: "Montserrat_400Regular",
          fontSize: 12,
          textAlign: "center",
          color: "#000000",
        }}
      >
        {date.date()}
      </Text>

      <View style={{ marginTop: 2, gap: 1 }}>
        {events.map((event) => (
          <View
            key={event.id}
            style={{
              paddingVertical: 3,
              paddingHorizontal: 1,
              backgroundColor: event.color,
              borderRadius: 4,
            }}
          >
            <Text
              style={{
                fontFamily: "Montserrat_400Regular",
                fontSize: 12,
                color: "#fff",
              }}
            >
              {event.event_name}
            </Text>
          </View>
        ))}

        {/* Add invisible placeholders to preserve layout */}
        {Array(placeholderCount)
          .fill(null)
          .map((_, index) => (
            <View
              key={`placeholder-${index}`}
              style={{
                paddingVertical: 3,
                paddingHorizontal: 1,
                opacity: 0, // invisible, still takes up space
              }}
            >
              <Text style={{ fontSize: 12 }}>placeholder</Text>
            </View>
          ))}
      </View>
    </View>
  );
};

export default MonthTypeDayCell;
