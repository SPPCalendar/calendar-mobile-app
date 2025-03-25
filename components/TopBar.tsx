import { View } from "react-native";
import SearchIcon from "./icons/SearchIcon";
import FilterIcon from "./icons/FilterIcon";
import CalendarDaysIcon from "./icons/CalendarDaysIcon";
import MoreGridBigIcon from "./icons/MoreGridBigIcon";
import MoreVerticalIcon from "./icons/MoreVerticalIcon";
import { Colors } from "@/contants/Colors";

export default function TopBar() {
  return (
    <View
      style={{
        height: 48,
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: Colors.topBar,
        borderRadius: 30,
        marginInline: 13,
        flexDirection: "row",
        paddingInline: 41,
      }}
    >
      <SearchIcon />
      <View style={{ flexDirection: "row", gap: 12 }}>
        <FilterIcon />
        <CalendarDaysIcon />
        <MoreGridBigIcon />
        <MoreVerticalIcon />
      </View>
    </View>
  );
}
