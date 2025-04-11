import { Colors } from "@/contants/Colors";
import { Styles } from "@/contants/Styles";
import React, { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import EventStartEndDatePickers from "@/components/EventStartEndDatePickers";
import CheckboxWithText from "@/components/CheckboxWithText";
import CategoryEventPicker from "@/components/CategoryEventPicker";
import { useCalendarStore } from "@/stores/calendar_store";
import { CalendarEvent } from "@/types/CalendarEvent";
import api from "@/utils/api";
import { router } from "expo-router";


const NewEventForm = () => {
  const [text, onChangeText] = useState("");
  const [isChecked, setChecked] = useState(false);
  const [notify, enableNotifications] = useState(false);

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const calendarId = useCalendarStore((state) => state.calendarId);
  
  const handleCreateEvent = async () => {
    if (!calendarId) {
      console.warn("No calendar selected");
      return;
    }
  
    try {
      const requestBody = {
        event_name: text,
        start_time: startDate.toISOString(),
        end_time: endDate.toISOString(),
        color: "#007AFF", // Static for now; could come from category later
        calendar_id: calendarId,
      };

      console.log("Creating event with data:", requestBody);
  
      const response = await api.post("/events", requestBody);
  
      console.log("Event successfully created:", response.data);

      // Navigate to another screen after creating the event
      router.push("/presentation/day_presentation");
    } catch (error: any) {
      console.error("Failed to create event:", error?.response?.data || error.message);
      alert("Не вдалося створити подію. Спробуйте ще раз.");
    }
  };

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
        {/* <CheckboxWithText
          label="Цілий день"
          isChecked={isChecked}
          setChecked={setChecked}
        /> */}

        <EventStartEndDatePickers 
          startDate={startDate}
          endDate={endDate}
          onChangeStart={setStartDate}
          onChangeEnd={setEndDate}
        />
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
