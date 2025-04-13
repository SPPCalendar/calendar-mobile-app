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
import { useAuthStore } from "@/stores/auth_store";
import { Href, useRouter } from "expo-router";

export default function TopBar() {
  const router = useRouter();
  const makeDimmed = useOpacityStore((state) => state.makeDimmed);
  const changeModalShown = useModalStore((state) => state.changeModalShown);

  const openCalendarPresentationPicker = () => {
    makeDimmed();
    changeModalShown(true);
  };

  const accessToken = useAuthStore((state) => state.accessToken);
  const openUserProfileOrLogin = () => {
    if (accessToken) {
      // User is logged in
      router.push("/profile");
    } else {
      // User not logged in
      router.push("/login");
    }
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

        <TouchableOpacity onPress={() => router.push("/choose_calendar_modal" as Href)}>
          <CalendarDaysIcon />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => openCalendarPresentationPicker()}>
          <MoreGridBigIcon />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => openUserProfileOrLogin()}>
          <MoreVerticalIcon />
        </TouchableOpacity>
      </View>
    </View>
  );
}
