import React from "react";
import { ScrollView, StyleProp, Text, ViewStyle } from "react-native";
import EventRow from "./EventRow";
import { CalendarEvent } from "@/types/CalendarEvent";

interface MonthNameDisplayProps {
  events: CalendarEvent[];
  style?: StyleProp<ViewStyle>;
}

const DayEventsList: React.FC<MonthNameDisplayProps> = ({ events, style }) => {
  return (
    <>
      {events.length == 0 ? (
        <Text
          style={{
            fontFamily: "Montserrat_400Regular",
            fontSize: 16,
            paddingTop: 20,
          }}
        >
          Немає подій
        </Text>
      ) : (
        <ScrollView style={[{ width: "100%" }, style]}>
          {events.map((event) => (
            <EventRow eventName="Дн мами" eventDuration="Цілий день" />
          ))}
        </ScrollView>
      )}
    </>
  );
};

export default DayEventsList;
