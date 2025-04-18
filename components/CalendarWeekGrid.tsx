import { Styles } from "@/contants/Styles";
import { CalendarEvent } from "@/types/CalendarEvent";
import dayjs from "dayjs";
import { useRouter } from "expo-router";
import React from "react";
import {
  View,
  Text,
  StyleProp,
  ViewStyle,
  ScrollView,
  TouchableOpacity,
} from "react-native";

interface Props {
  style?: StyleProp<ViewStyle>;
  weekDates: dayjs.Dayjs[];
  events: CalendarEvent[];
}

const CalendarWeekGrid: React.FC<Props> = ({ style, weekDates, events }) => {
  const weekDaysFirstLetters = ["", "П", "В", "С", "Ч", "П", "С", "Н"];
  const router = useRouter();

  const openEventDetails = (event: CalendarEvent) => {
    router.push({
      pathname: "/presentation/event_details",
      params: {
        event: JSON.stringify(event),
      },
    });
  };

  return (
    <View style={[{ width: "100%" }, style]}>
      <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
        {weekDaysFirstLetters.map((letter, index) => (
          <View style={{ width: 20, alignItems: "center" }} key={index}>
            <Text style={{ fontFamily: "Montserrat_400Regular", fontSize: 20 }}>
              {letter}
            </Text>
            <Text style={{ fontFamily: "Montserrat_400Regular", fontSize: 15 }}>
              {index == 0 ? "" : weekDates[index - 1].date()}
            </Text>
          </View>
        ))}
      </View>

      <ScrollView
        style={{ borderColor: "#40513B", borderWidth: 0.5 }}
        contentContainerStyle={{ height: 24 * 32 + 96 }}
      >
        {/* RELATIVE container allows absolute positioning inside */}
        <View style={{ position: "relative", width: "100%" }}>
          {/* Grid */}
          {Array(24)
            .fill(null)
            .map((_, hour) => (
              <View
                style={{
                  flexDirection: "row",
                  width: "100%",
                  height: 32,
                }}
                key={hour}
              >
                {weekDaysFirstLetters.map((_, col) => (
                  <View
                    key={col}
                    style={{
                      borderColor: "#40513B",
                      borderWidth: 0.5,
                      flex: 1,
                      justifyContent: "center",
                    }}
                  >
                    <Text
                      style={{
                        textAlign: "center",
                        fontFamily: "Montserrat_400Regular",
                        fontSize: 12,
                      }}
                    >
                      {col === 0 ? `${hour}:00` : ""}
                    </Text>
                  </View>
                ))}
              </View>
            ))}

          {/* EVENTS */}
          {events.map((event, i) => {
            const start = dayjs(event.start_time);
            const end = dayjs(event.end_time);
            const durationInMinutes = end.diff(start, "minute");

            const column = start.isoWeekday(); // 1 = Monday, 7 = Sunday
            const hourOffset = start.hour() * 32 + (start.minute() / 60) * 32;

            return (
              <TouchableOpacity
                key={i}
                style={{
                  position: "absolute",
                  top: hourOffset,
                  left: `${(column / 8) * 100}%`, // spread evenly across 7 days (and 1 column for hours)
                  width: `${100 / 8}%`,
                  height: (durationInMinutes / 60) * 32,
                  backgroundColor: event.color || "#ffa",
                  borderRadius: 6,
                  padding: 4,
                  zIndex: 5,
                }}
                onPress={() => openEventDetails(event)}
              >
                <Text
                  style={[
                    Styles.textInputText,
                    { fontSize: 10, fontFamily: "Montserrat_400Bold" },
                  ]}
                >
                  {event.event_name}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
};

export default CalendarWeekGrid;
