import React from "react";
import { ScrollView, StyleProp, View, ViewStyle } from "react-native";
import EventRow from "./EventRow";

interface MonthNameDisplayProps {
  style?: StyleProp<ViewStyle>;
}

const DayEventsList: React.FC<MonthNameDisplayProps> = ({ style }) => {
  return (
    <ScrollView style={[{ width: "100%" }, style]}>
      <EventRow eventName="Дн мами" eventDuration="Цілий день" />
      <EventRow eventName="Дн мами" eventDuration="Цілий день" />
      <EventRow eventName="Дн мами" eventDuration="Цілий день" />
    </ScrollView>
  );
};

export default DayEventsList;
