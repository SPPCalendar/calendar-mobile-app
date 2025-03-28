import React from "react";
import { StyleProp, View, ViewStyle } from "react-native";
import SmallMonthItem from "./SmallMonthItem";

interface Props {
  style?: StyleProp<ViewStyle>;
}

const CalendarYearGrid: React.FC<Props> = ({ style }) => {
  return (
    <View style={[{ gap: 16, width: "100%" }, style]}>
      {Array(4)
        .fill(null)
        .map((_, index) => (
          <View style={{ flexDirection: "row", gap: 6 }} key={index}>
            {Array(3)
              .fill(null)
              .map((_, index1) => (
                <SmallMonthItem key={index1} />
              ))}
          </View>
        ))}
    </View>
  );
};

export default CalendarYearGrid;
