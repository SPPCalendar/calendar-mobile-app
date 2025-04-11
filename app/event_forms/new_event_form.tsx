import { Colors } from "@/contants/Colors";
import { Styles } from "@/contants/Styles";
import React, { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import EventStartEndDatePickers from "@/components/EventStartEndDatePickers";
import CheckboxWithText from "@/components/CheckboxWithText";
import CategoryEventPicker from "@/components/CategoryEventPicker";

const handleCreateEvent = () => {
  // Handle event creation logic here
  console.log("Event created!");
}

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

      <TouchableOpacity
        style={{
          backgroundColor: Colors.formTopBarBg,
          paddingVertical: 16,
          borderRadius: 30,
          alignItems: "center",
        }}
        onPress={handleCreateEvent}
      >
        <Text style={[Styles.textInputText, {color: "#fff"}]}>Створити подію</Text>
      </TouchableOpacity>
    </View>
  );
};

export default NewEventForm;
