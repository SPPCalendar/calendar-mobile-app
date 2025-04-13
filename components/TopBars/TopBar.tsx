import React, { useState } from "react";
import { View, TouchableOpacity } from "react-native";
import DateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker";

import SearchIcon from "../icons/SearchIcon";
import FilterIcon from "../icons/FilterIcon";
import CalendarDaysIcon from "../icons/CalendarDaysIcon";
import MoreGridBigIcon from "../icons/MoreGridBigIcon";
import MoreVerticalIcon from "../icons/MoreVerticalIcon";
import { Colors } from "@/contants/Colors";
import { useOpacityStore } from "@/stores/opacity_store";
import { useModalStore } from "@/stores/modal_store";
import { useAuthStore } from "@/stores/auth_store";
import { Href, useRouter } from "expo-router";
import dayjs from "dayjs";

export default function TopBar() {
  const router = useRouter();
  const makeDimmed = useOpacityStore((state) => state.makeDimmed);
  const changeModalShown = useModalStore((state) => state.changeModalShown);
  const accessToken = useAuthStore((state) => state.accessToken);

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const openCalendarPresentationPicker = () => {
    makeDimmed();
    changeModalShown(true);
  };

  const openUserProfileOrLogin = () => {
    if (accessToken) {
      router.push("/profile");
    } else {
      router.push("/login");
    }
  };

  const openCalendarPicker = () => {
    router.push("/choose_calendar_modal" as Href);
  };

  const openDatePicker = () => {
    setShowDatePicker(true);
  };

  const handleDateChange = (event: DateTimePickerEvent, date?: Date) => {
    setShowDatePicker(false);

    if (!date) return;

    const newDateStr = dayjs(date).format("YYYY-MM-DD");
    const currentDateStr = dayjs(selectedDate).format("YYYY-MM-DD");

    if (newDateStr === currentDateStr) {
      console.log("Date already selected:", newDateStr);
      return;
    }

    setSelectedDate(date);
    console.log("Picked new date:", newDateStr);
    // You can do something like navigate to the day view:
    router.push({
      pathname: "/presentation/day_presentation",
      params: { dateParam: date.toISOString() },
    });
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
        <TouchableOpacity onPress={openCalendarPicker}>
          <FilterIcon />
        </TouchableOpacity>

        <TouchableOpacity onPress={openDatePicker}>
          <CalendarDaysIcon />
        </TouchableOpacity>

        <TouchableOpacity onPress={openCalendarPresentationPicker}>
          <MoreGridBigIcon />
        </TouchableOpacity>

        <TouchableOpacity onPress={openUserProfileOrLogin}>
          <MoreVerticalIcon />
        </TouchableOpacity>
      </View>

      {showDatePicker && (
        <DateTimePicker
          value={selectedDate}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}
    </View>
  );
}
