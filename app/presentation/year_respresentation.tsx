import CalendarYearGrid from "@/components/CalendarYearGrid";
import TimeUnitNameDisplay from "@/components/TimeUnitNameDisplay";
import { Colors } from "@/contants/Colors";
import { View } from "react-native";

export default function YearRespresentation() {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        height: 20,
        backgroundColor: Colors.backgroundColor,
      }}
    >
      <TimeUnitNameDisplay style={{ marginTop: 20 }} monthName="2025" />
      <CalendarYearGrid style={{ marginTop: 35 }} />
    </View>
  );
}
