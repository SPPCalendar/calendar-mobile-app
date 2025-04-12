import React from "react";
import { ScrollView, StyleProp, View, ViewStyle } from "react-native";
import SevenDaysRow from "./SevenDaysRow";
import { Month } from "@/types/Month";
import { getMonthNumbers } from "@/utils/utils";

interface MonthNameDisplayProps {
  style?: StyleProp<ViewStyle>;
}

const CalendarMonthGrid: React.FC<MonthNameDisplayProps> = ({ style }) => {
  const numbers = getMonthNumbers(Month.March, 2025);

  return (
    <ScrollView style={[{ width: "100%" }, style]}>
      <SevenDaysRow
        dates={numbers.thisMonth[0]}
        anotherMonthDates={numbers.lastMonth}
        anotherMonthIsNext={false}
      />
      {numbers.thisMonth.slice(1, -1).map((dates, index) => (
        <SevenDaysRow dates={dates} key={index} />
      ))}
      <SevenDaysRow
        dates={numbers.thisMonth[numbers.thisMonth.length - 1]}
        anotherMonthDates={numbers.nextMonth}
        anotherMonthIsNext={true}
      />
    </ScrollView>
  );
};

export default CalendarMonthGrid;
