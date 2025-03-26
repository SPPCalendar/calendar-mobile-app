import React from "react";
import { View, Text } from "react-native";

interface MonthNameDisplayProps {
  eventName: string;
  eventDuration: string;
}

const EventRow: React.FC<MonthNameDisplayProps> = ({
  eventName,
  eventDuration,
}) => {
  return (
    <View
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
          {eventName}
        </Text>
        <Text style={{ fontFamily: "Montserrat_400Regular", fontSize: 16 }}>
          {eventDuration}
        </Text>
      </View>
    </View>
  );
};

export default EventRow;
