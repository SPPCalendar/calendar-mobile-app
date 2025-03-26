import React from "react";
import { View, Text, StyleProp, ViewStyle } from "react-native";

interface MonthNameDisplayProps {
  style?: StyleProp<ViewStyle>;
}

const WeekDaysDisplay: React.FC<MonthNameDisplayProps> = ({ style }) => {
  const weekDaysFirstLetters = ["П", "В", "С", "Ч", "П", "С", "Н"];

  return (
    <View
      style={[
        {
          flexDirection: "row",
          width: "100%",
          justifyContent: "space-around",
        },
        style,
      ]}
    >
      {weekDaysFirstLetters.map((letter) => (
        <Text>{letter}</Text>
      ))}
    </View>
  );
};

export default WeekDaysDisplay;
