import { calendarColors, Colors } from "@/contants/Colors";
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
import { Picker } from "@react-native-picker/picker";

const NewEventForm = () => {
  const { event } = useLocalSearchParams();
  const parsedEvent: CalendarEvent | null = event
    ? JSON.parse(event as string)
    : null;
  const currentDate = new Date();
  const calendarId = useCalendarStore((state) => state.calendarId);

  const [text, onChangeText] = useState("");
  const [description, setDescription] = useState("");
  const [isWholeDay, setIsWholeDay] = useState(false);
  const [color, setColor] = useState(calendarColors[0]);
  const [startDate, setStartDate] = useState(
    new Date(currentDate.setMinutes(0, 0, 0))
  );
  const [endDate, setEndDate] = useState(
    new Date(currentDate.setHours(currentDate.getHours() + 1, 0, 0, 0))
  );

  const [descriptionHeight, setDescriptionHeight] = useState(100);

  useEffect(() => {
    if (parsedEvent) {
      onChangeText(parsedEvent.event_name);
      setStartDate(new Date(parsedEvent.start_time));
      setEndDate(new Date(parsedEvent.end_time));

      if (parsedEvent.description) {
        setDescription(parsedEvent.description);
      }
    }
  }, []);

  useEffect(() => {
    if (!dayjs(startDate).isSame(endDate, "day")) {
      // Update endDate's date to match startDate, keep its time
      const updated = new Date(startDate);
      updated.setHours(
        endDate.getHours(),
        endDate.getMinutes(),
        endDate.getSeconds(),
        endDate.getMilliseconds()
      );
      setEndDate(updated);
    }
  }, [startDate]);

  useEffect(() => {
    if (!dayjs(startDate).isSame(endDate, "day")) {
      // Update startDate's date to match endDate, keep its time
      const updated = new Date(endDate);
      updated.setHours(
        startDate.getHours(),
        startDate.getMinutes(),
        startDate.getSeconds(),
        startDate.getMilliseconds()
      );
      setStartDate(updated);
    }
  }, [endDate]);

  const handleCreateOrEditEvent = async () => {
    if (!calendarId) {
      console.warn("No calendar selected");
      return;
    }

    try {
      const requestBody = {
        event_name: text,
        description: description,
        start_time: startDate.toISOString(),
        end_time: endDate.toISOString(),
        color: color, // Static for now; could come from category later
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
      if (parsedEvent) {
        router.navigate({
          pathname: "/presentation/event_details",
          params: { event: JSON.stringify(response.data) },
        });
      } else {
        router.back();
      }
    } catch (error: any) {
      console.error(
        "Failed to create event:",
        error?.response?.data || error.message
      );
      alert("Не вдалося створити подію. Спробуйте ще раз.");
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: Colors.backgroundColor, gap: 24 }}>
      <TextInput
        style={[
          Styles.textInput,
          Styles.textInputText,
          { marginTop: 38, 
            paddingLeft: 30, 
            paddingRight: 30,
          },
        ]}
        multiline
        placeholderTextColor={Colors.textInputPlaceholder}
        onChangeText={onChangeText}
        value={text}
        placeholder="Назва"
      />

      <TextInput
        style={[
          Styles.textInput,
          Styles.textInputText,
          {
            minHeight: 100,
            paddingLeft: 30,
            paddingRight: 30,
            textAlignVertical: "top", // Ensures multiline text starts from the top
          },
        ]}
        multiline
        placeholderTextColor={Colors.textInputPlaceholder}
        onChangeText={setDescription}
        value={description}
        placeholder="Опис"
      />

      <View style={[Styles.textInput]}>
        <CheckboxWithText
          label="Цілий день"
          isChecked={isWholeDay}
          setChecked={setIsWholeDay}
          style={{ marginBottom: 16 }}
        />

        <EventStartEndDatePickers
          startDate={startDate}
          endDate={endDate}
          onChangeStart={setStartDate}
          onChangeEnd={setEndDate}
          isWholeDay={isWholeDay}
        />
      </View>

      {/* <CategoryEventPicker /> */}
      <Picker
          style={{
            backgroundColor: color,
            width: "50%",
            marginInline: "auto",
          }}
          selectedValue={color}
          onValueChange={(itemValue) => setColor(itemValue)}
        >
          {calendarColors.map((color) => (
            <Picker.Item
              key={color}
              style={{ backgroundColor: color }}
              label={color}
              value={color}
            />
          ))}
        </Picker>

      <TouchableOpacity
        style={{
          backgroundColor: Colors.formTopBarBg,
          paddingVertical: 16,
          borderRadius: 30,
          alignItems: "center",
        }}
        onPress={handleCreateOrEditEvent}
      >
        <Text style={[Styles.textInputText, { color: "#fff" }]}>
          {parsedEvent ? "Зберегти зміни" : "Створити подію"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default NewEventForm;
