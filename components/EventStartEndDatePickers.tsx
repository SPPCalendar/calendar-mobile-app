import React from "react";
import { View, Text, StyleProp, ViewStyle } from "react-native";
import DatePickerRow from "./DatePickerRow";

interface Props {
  style?: StyleProp<ViewStyle>;
}

const EventStartEndDatePickers: React.FC<Props> = ({ style }) => {
  return (
    <View style={[{ gap: 21 }, style]}>
      <DatePickerRow />
      <DatePickerRow />
    </View>
  );
};

export default EventStartEndDatePickers;
