import React from "react";
import { View } from "react-native";
import MonthTypeDayCell from "./MonthTypeDayCell";

const SevenDaysRow = () => {
  return (
    <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
      {Array(7)
        .fill(null)
        .map((num, index) => (
          <MonthTypeDayCell key={index} />
        ))}
    </View>
  );
};

export default SevenDaysRow;
