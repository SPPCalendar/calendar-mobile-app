import { View } from "react-native";
import SearchIcon from "../icons/SearchIcon";
import FilterIcon from "../icons/FilterIcon";
import CalendarDaysIcon from "../icons/CalendarDaysIcon";
import MoreGridBigIcon from "../icons/MoreGridBigIcon";
import MoreVerticalIcon from "../icons/MoreVerticalIcon";
import { Colors } from "@/contants/Colors";
import React from "react";
import { TouchableOpacity } from "react-native";
import { useOpacityStore } from "@/stores/opacity_store";
import { useModalStore } from "@/stores/modal_store";
import { useRouter } from "expo-router";

export default function TopBar() {
  const router = useRouter();
  const makeDimmed = useOpacityStore((state) => state.makeDimmed);
  const changeModalShown = useModalStore((state) => state.changeModalShown);

  const openCalendarPresentationPicker = () => {
    makeDimmed();
    changeModalShown(true);
  };

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

        <TouchableOpacity onPress={() => openCalendarPresentationPicker()}>
          <MoreGridBigIcon />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push("/auth/login")}>
          <MoreVerticalIcon />
        </TouchableOpacity>
      </View>
    </View>
  );
}
