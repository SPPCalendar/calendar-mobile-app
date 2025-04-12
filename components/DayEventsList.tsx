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
    <ScrollView style={[{ width: "100%" }, style]}>
      {events.map((event) => (
        <EventRow key={event.id} event={event} />
      ))}
    </ScrollView>
  );
};

export default DayEventsList;
