import { Colors } from "@/contants/Colors";
import { Styles } from "@/contants/Styles";
import React, { useState } from "react";
import { TextInput, View } from "react-native";
import EventStartEndDatePickers from "@/components/EventStartEndDatePickers";
import CheckboxWithText from "@/components/CheckboxWithText";
import CategoryEventPicker from "@/components/CategoryEventPicker";

const NewEventForm = () => {
  const [text, onChangeText] = useState("");
  const [isChecked, setChecked] = useState(false);
  const [notify, enableNotifications] = useState(false);

  return (
    <View style={{ flex: 1, backgroundColor: Colors.backgroundColor, gap: 24 }}>
      <TextInput
        style={[Styles.textInput, Styles.textInputText, { marginTop: 38 }]}
        placeholderTextColor={Colors.textInputPlaceholder}
        onChangeText={onChangeText}
        value={text}
        placeholder="Назва"
      />

      <View style={[Styles.textInput]}>
        <CheckboxWithText
          label="Цілий день"
          isChecked={isChecked}
          setChecked={setChecked}
        />

        <EventStartEndDatePickers style={{ marginTop: 38 }} />
      </View>

      <CategoryEventPicker />

      <CheckboxWithText
        label="Оповістка"
        style={[Styles.textInput]}
        isChecked={notify}
        setChecked={enableNotifications}
      />
    </View>
  );
};

export default NewEventForm;
