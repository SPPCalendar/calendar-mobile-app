import CalendarWeekGrid from "@/components/CalendarWeekGrid";
import TimeUnitNameDisplay from "@/components/TimeUnitNameDisplay";
import { Colors } from "@/contants/Colors";
import { View } from "react-native";

export default function Index() {
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
        monthName="Травень (19 тиждень)"
      />

      <CalendarWeekGrid style={{ marginTop: 30 }} />
    </View>
  );
}
