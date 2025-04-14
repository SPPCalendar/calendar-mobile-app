import CalendarYearGrid from "@/components/CalendarYearGrid";
import TimeUnitNameDisplay from "@/components/TimeUnitNameDisplay";
import { Colors } from "@/contants/Colors";
import { useState } from "react";
import { View } from "react-native";

export default function YearRespresentation() {
  const [year, setYear] = useState(2025);

  const moveMinusOneYear = () => {
    setYear(year - 1);
  };

  const movePlusOneYear = () => {
    setYear(year + 1);
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
        monthName={year.toString()}
        onPressLeftArrow={moveMinusOneYear}
        onPressRightArrow={movePlusOneYear}
      />
      <CalendarYearGrid style={{ marginTop: 35 }} year={year} />
    </View>
  );
}
