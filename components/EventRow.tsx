import { CalendarEvent } from "@/types/CalendarEvent";
import { useRouter } from "expo-router";
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

interface MonthNameDisplayProps {
  event: CalendarEvent;
}

const EventRow: React.FC<MonthNameDisplayProps> = ({ event }) => {
  const router = useRouter();

  const openEventDetails = () => {
    router.push({
      pathname: "/presentation/event_details",
      params: {
        event: JSON.stringify(event),
      },
    });
  };

  return (
    <TouchableOpacity
      style={{
        flexDirection: "row",
        width: "100%",
        borderColor: "#BE38EE",
        borderWidth: 1,
        borderRadius: 30,
        gap: 17,
        height: 62,
        marginBottom: 8,
      }}
      onPress={openEventDetails}
    >
      <View
        style={{
          width: 30,
          height: "100%",
          backgroundColor: "#BE38EE",
          borderTopLeftRadius: 30,
          borderBottomLeftRadius: 30,
        }}
      ></View>

      <View
        style={{ flexDirection: "column", gap: 8, justifyContent: "center" }}
      >
        <Text style={{ fontFamily: "Montserrat_400Regular", fontSize: 18 }}>
          {event.event_name}
        </Text>
        <Text style={{ fontFamily: "Montserrat_400Regular", fontSize: 16 }}>
          {"Цілий день"}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default EventRow;
