import React from "react";
import { StyleProp, Text, View, ViewStyle } from "react-native";
import ChevronRight from "./icons/ChevronRight";
import ChevronLeft from "./icons/ChevronLeft";

interface MonthNameDisplayProps {
  monthName: string;
  style?: StyleProp<ViewStyle>;
}

const TimeUnitNameDisplay: React.FC<MonthNameDisplayProps> = ({
  monthName,
  style,
}) => {
  return (
    <View
      style={[
        {
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
        },
        style,
      ]}
    >
      <ChevronRight />
      <Text
        style={{
          fontFamily: "Montserrat_400Regular",
          fontSize: 20,
        }}
      >
        {monthName}
      </Text>
      <ChevronLeft />
    </View>
  );
};

export default TimeUnitNameDisplay;
