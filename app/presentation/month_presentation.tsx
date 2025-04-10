import AddEventButton from "@/components/AddEventButton";
import CalendarMonthGrid from "@/components/CalendarMonthGrid";
import TimeUnitNameDisplay from "@/components/TimeUnitNameDisplay";
import WeekDaysDisplay from "@/components/WeekDaysDisplay";
import { Colors } from "@/contants/Colors";
import { getUkrainianMonthName, Month } from "@/utils/utils";
import { useState } from "react";
import { View } from "react-native";

export default function MonthPresentation() {
  const [month, setMonth] = useState(Month.May);

  const moveMinusOneMonth = () => {
    if (month == 1) {
      setMonth(Month.December);
    } else {
      setMonth(month - 1);
    }
  };

  const movePlusOneMonth = () => {
    if (month == 12) {
      setMonth(Month.January);
    } else {
      setMonth(month + 1);
    }
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
        monthName={getUkrainianMonthName(month)}
        onPressLeftArrow={moveMinusOneMonth}
        onPressRightArrow={movePlusOneMonth}
      />
      <WeekDaysDisplay style={{ marginTop: 20 }} />
      <CalendarMonthGrid style={{ marginTop: 26 }} />
      <AddEventButton />
    </View>
  );
}
