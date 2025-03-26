import AddEventButton from "@/components/AddEventButton";
import CalendarMonthGrid from "@/components/CalendarMonthGrid";
import TimeUnitNameDisplay from "@/components/TimeUnitNameDisplay";
import WeekDaysDisplay from "@/components/WeekDaysDisplay";
import { Colors } from "@/contants/Colors";
import { View } from "react-native";

export default function MonthPresentation() {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        height: 20,
        backgroundColor: Colors.backgroundColor,
      }}
    >
      <TimeUnitNameDisplay style={{ marginTop: 20 }} monthName="Травень" />
      <WeekDaysDisplay style={{ marginTop: 20 }} />
      <CalendarMonthGrid style={{ marginTop: 26 }} />
      <AddEventButton />
    </View>
  );
}
