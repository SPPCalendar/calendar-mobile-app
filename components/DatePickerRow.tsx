import { Styles } from "@/contants/Styles";
import React from "react";
import { View, Text } from "react-native";

const DatePickerRow = () => {
  return (
    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
      <Text style={Styles.textInputText}>Травень 17</Text>
      <Text style={Styles.textInputText}>19:00</Text>
    </View>
  );
};

export default DatePickerRow;
