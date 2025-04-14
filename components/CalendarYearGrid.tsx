import React from "react";
import { ScrollView, StyleProp, View, ViewStyle } from "react-native";
import SmallMonthItem from "./SmallMonthItem";

interface Props {
  year: number;
  style?: StyleProp<ViewStyle>;
}

const CalendarYearGrid: React.FC<Props> = ({ year, style }) => {
  return (
    <ScrollView style={[{ width: "100%" }, style]}>
      {Array(4)
        .fill(null)
        .map((_, index) => (
          <View
            style={{ flexDirection: "row", gap: 6, marginBottom: 16 }}
            key={index}
          >
            {Array(3)
              .fill(null)
              .map((_, index1) => (
                <SmallMonthItem
                  month={index * 3 + index1 + 1}
                  year={year}
                  key={index1}
                />
              ))}
          </View>
        ))}
      <View style={{ height: 200 }}></View>
    </ScrollView>
  );
};

export default CalendarYearGrid;
