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
  isWholeDay: boolean;
}

const EventStartEndDatePickers: React.FC<Props> = ({
  style,
  startDate,
  endDate,
  onChangeStart,
  onChangeEnd,
  isWholeDay,
}) => {
  return (
    <View style={[{ gap: 21 }, style]}>
      <DatePickerRow
        date={startDate}
        onChange={onChangeStart}
        showTimeChoise={!isWholeDay}
        isStart
      />
      <DatePickerRow
        date={endDate}
        onChange={onChangeEnd}
        showTimeChoise={!isWholeDay}
        isStart={false}
      />
    </View>
  );
};

export default EventStartEndDatePickers;
