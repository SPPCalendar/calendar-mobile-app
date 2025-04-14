import DayEventsList from "@/components/DayEventsList";
import { Colors } from "@/contants/Colors";
import { useSearchedEventsStore } from "@/stores/searched_events_store";
import React from "react";
import { View } from "react-native";

const search_result_events = () => {
  const events = useSearchedEventsStore((state) => state.events);

  return (
    <View
      style={{
        paddingTop: 20,
        flex: 1,
        backgroundColor: Colors.backgroundColor,
      }}
    >
      <DayEventsList events={events} />
    </View>
  );
};

export default search_result_events;
