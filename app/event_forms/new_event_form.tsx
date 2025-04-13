import { Colors } from "@/contants/Colors";
import { Styles } from "@/contants/Styles";
import React, { useEffect, useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import EventStartEndDatePickers from "@/components/EventStartEndDatePickers";
import CheckboxWithText from "@/components/CheckboxWithText";
import CategoryEventPicker from "@/components/CategoryEventPicker";
import { useCalendarStore } from "@/stores/calendar_store";
import { CalendarEvent } from "@/types/CalendarEvent";
import api from "@/utils/api";
import { router, useLocalSearchParams } from "expo-router";
import dayjs from "dayjs";


const NewEventForm = () => {
  const { event } = useLocalSearchParams();
  const parsedEvent: CalendarEvent | null = event ? JSON.parse(event as string) : null;
  
  const [text, onChangeText] = useState("");
  const [isChecked, setChecked] = useState(false);
  const [notify, enableNotifications] = useState(false);
  
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const calendarId = useCalendarStore((state) => state.calendarId);

  useEffect(() => {
    if (parsedEvent) {
      onChangeText(parsedEvent.event_name);
      setStartDate(new Date(parsedEvent.start_time));
      setEndDate(new Date(parsedEvent.end_time));
    }
  }, []);

  useEffect(() => {
    if (!dayjs(startDate).isSame(endDate, "day")) {
      // Update endDate's date to match startDate, keep its time
      const updated = new Date(startDate);
      updated.setHours(endDate.getHours(), endDate.getMinutes(), endDate.getSeconds(), endDate.getMilliseconds());
      setEndDate(updated);
    }
  }, [startDate]);
  
  useEffect(() => {
    if (!dayjs(startDate).isSame(endDate, "day")) {
      // Update startDate's date to match endDate, keep its time
      const updated = new Date(endDate);
      updated.setHours(startDate.getHours(), startDate.getMinutes(), startDate.getSeconds(), startDate.getMilliseconds());
      setStartDate(updated);
    }
  }, [endDate]);
  
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

      console.log("Submitting event with data:", requestBody);

      const response = parsedEvent
        ? await api.put(`/events/${parsedEvent.id}`, requestBody)
        : await api.post("/events", requestBody);

      console.log(
        parsedEvent
          ? "Event successfully updated:"
          : "Event successfully created:",
        response.data
      );
  
      // Navigate to another screen after creating the event
      router.back();
    } catch (error: any) {
      console.error("Failed to create event:", error?.response?.data || error.message);
      alert("Не вдалося створити подію. Спробуйте ще раз.");
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: Colors.backgroundColor, gap: 24 }}>
      <TextInput
        style={[Styles.textInput, Styles.textInputText, { marginTop: 38, paddingLeft: 30 }]}
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
        <Text style={[Styles.textInputText, { color: "#fff" }]}>
          {parsedEvent ? "Зберегти зміни" : "Створити подію"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default NewEventForm;
