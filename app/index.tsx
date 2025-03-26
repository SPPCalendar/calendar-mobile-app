import MonthNameDisplay from "@/components/MonthNameDisplay";
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
      <MonthNameDisplay style={{ marginTop: 20 }} monthName="Травень" />
    </View>
  );
}
