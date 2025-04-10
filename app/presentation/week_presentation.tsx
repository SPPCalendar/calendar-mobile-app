import CalendarWeekGrid from "@/components/CalendarWeekGrid";
import TimeUnitNameDisplay from "@/components/TimeUnitNameDisplay";
import { Colors } from "@/contants/Colors";
import { useState } from "react";
import { View } from "react-native";

export default function WeekPresentation() {
  const [weekNumber, setWeekNumber] = useState(20);

  const moveMinusOneWeek = () => {
    setWeekNumber(weekNumber - 1);
  };

  const movePlusOneWeek = () => {
    setWeekNumber(weekNumber + 1);
  };

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        height: 20,
        backgroundColor: Colors.backgroundColor,
      }}
    >
      <TimeUnitNameDisplay
        style={{ marginTop: 20 }}
        monthName={`Травень (${weekNumber} тиждень)`}
        onPressLeftArrow={moveMinusOneWeek}
        onPressRightArrow={movePlusOneWeek}
      />

      <CalendarWeekGrid style={{ marginTop: 30 }} />
    </View>
  );
}
