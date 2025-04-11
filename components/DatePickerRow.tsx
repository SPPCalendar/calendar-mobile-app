import { Styles } from "@/contants/Styles";
import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import DateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker";

interface Props {
  date: Date;
  onChange: (updated: Date) => void;
}

const DatePickerRow: React.FC<Props> = ({ date, onChange }) => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const handleDateChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      const updated = new Date(date);
      updated.setFullYear(selectedDate.getFullYear());
      updated.setMonth(selectedDate.getMonth());
      updated.setDate(selectedDate.getDate());
      onChange(updated);
    }
  };

  const handleTimeChange = (event: DateTimePickerEvent, selectedTime?: Date) => {
    setShowTimePicker(false);
    if (selectedTime) {
      const updated = new Date(date);
      updated.setHours(selectedTime.getHours());
      updated.setMinutes(selectedTime.getMinutes());
      updated.setSeconds(0);
      updated.setMilliseconds(0);
      onChange(updated);
    }
  };

  return (
    <View style={{ flexDirection: "row", justifyContent: "space-between", gap: 12 }}>
      <TouchableOpacity onPress={() => setShowDatePicker(true)}>
        <Text style={Styles.textInputText}>
          {date.toLocaleDateString()}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setShowTimePicker(true)}>
        <Text style={Styles.textInputText}>
          {date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false })}
        </Text>
      </TouchableOpacity>

      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}

      {showTimePicker && (
        <DateTimePicker
          value={date}
          mode="time"
          display="default"
          is24Hour
          onChange={handleTimeChange}
        />
      )}
    </View>
  );
};

export default DatePickerRow;
