import React from "react";
import { ScrollView, StyleProp, View, ViewStyle } from "react-native";
import SevenDaysRow from "./SevenDaysRow";

interface MonthNameDisplayProps {
  style?: StyleProp<ViewStyle>;
}

const CalendarMonthGrid: React.FC<MonthNameDisplayProps> = ({ style }) => {
  return (
    <ScrollView style={[{ width: "100%" }, style]}>
      {Array(6)
        .fill(null)
        .map((num, index) => (
          <SevenDaysRow key={index} />
        ))}
    </ScrollView>
  );
};

export default CalendarMonthGrid;
