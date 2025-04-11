import React from "react";
import { View, Text, StyleProp, ViewStyle } from "react-native";
import DatePickerRow from "./DatePickerRow";
import { Styles } from "@/contants/Styles";

interface Props {
  style?: StyleProp<ViewStyle>;
  startDate: Date;
  endDate: Date;
  onChangeStart: (date: Date) => void;
  onChangeEnd: (date: Date) => void;
}

const EventStartEndDatePickers: React.FC<Props> = ({ 
  style,
  startDate,
  endDate,
  onChangeStart,
  onChangeEnd, 
}) => {
  return (
    <View style={[{ gap: 21 }, style]}>
      <Text style={Styles.textInputText}>
        Початок та кінець
      </Text>
      <DatePickerRow
        date={startDate}
        onChange={onChangeStart}
      />
      <DatePickerRow
        date={endDate}
        onChange={onChangeEnd}
      />
    </View>
  );
};

export default EventStartEndDatePickers;
