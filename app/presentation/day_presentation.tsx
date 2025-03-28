import DayEventsList from "@/components/DayEventsList";
import TimeUnitNameDisplay from "@/components/TimeUnitNameDisplay";
import { Colors } from "@/contants/Colors";
import React from "react";
import { View } from "react-native";

const day_presentation = () => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        height: 20,
        backgroundColor: Colors.backgroundColor,
        paddingInline: 13,
      }}
    >
      <TimeUnitNameDisplay
        style={{ marginTop: 20 }}
        monthName="Травень 7(вт)"
      />
      <DayEventsList style={{ marginTop: 20 }} />
    </View>
  );
};

export default day_presentation;
