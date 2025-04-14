import React, { useEffect, useState } from "react";
import { View, TouchableOpacity, TextInput } from "react-native";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";

import SearchIcon from "../icons/SearchIcon";
import FilterIcon from "../icons/FilterIcon";
import CalendarDaysIcon from "../icons/CalendarDaysIcon";
import MoreGridBigIcon from "../icons/MoreGridBigIcon";
import MoreVerticalIcon from "../icons/MoreVerticalIcon";
import { Colors } from "@/contants/Colors";
import { useOpacityStore } from "@/stores/opacity_store";
import { useModalStore } from "@/stores/modal_store";
import { useAuthStore } from "@/stores/auth_store";
import { Href, usePathname, useRouter } from "expo-router";
import dayjs from "dayjs";
import { Feather } from "@expo/vector-icons";
import { useSearchedEventsStore } from "@/stores/searched_events_store";
import { useCalendarStore } from "@/stores/calendar_store";

export default function TopBar() {
  const router = useRouter();
  const pathname = usePathname();
  const makeDimmed = useOpacityStore((state) => state.makeDimmed);
  const changeModalShown = useModalStore((state) => state.changeModalShown);
  const accessToken = useAuthStore((state) => state.accessToken);
  const [searchActive, setSearchActive] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [debouncedText, setDebouncedText] = useState("");
  const setEvents = useSearchedEventsStore((state) => state.setEvents);
  const clearEvents = useSearchedEventsStore((state) => state.clearEvents);
  const { calendarId } = useCalendarStore();
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
    setShowDatePicker(!showDatePicker);
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

  useEffect(() => {
    if (searchActive && pathname !== "/presentation/search_result_events") {
      router.push("/presentation/search_result_events");
    } else if (!searchActive && pathname !== "/presentation/day_presentation") {
      router.push("/presentation/day_presentation");
    }
  }, [searchActive]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedText(searchText);
    }, 500);

    return () => clearTimeout(timeout);
  }, [searchText]);

  useEffect(() => {
    if (debouncedText) {
      console.log("Debounced search:", debouncedText);
      setEvents(calendarId, debouncedText);
    } else {
      clearEvents();
    }
  }, [debouncedText]);

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
      {searchActive ? (
        <>
          <TextInput
            placeholder="Пошук..."
            value={searchText}
            onChangeText={setSearchText}
            style={{
              flex: 1,
              color: "black",
              paddingVertical: 8,
              paddingHorizontal: 12,
              backgroundColor: "white",
              borderRadius: 20,
            }}
          />
          <TouchableOpacity
            onPress={() => setSearchActive(false)}
            style={{ marginLeft: 10 }}
          >
            <Feather name="x" size={24} color="black" />
          </TouchableOpacity>
        </>
      ) : (
        <>
          <TouchableOpacity onPress={() => setSearchActive(true)}>
            <SearchIcon />
          </TouchableOpacity>

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
        </>
      )}

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
