import dayjs from "dayjs";
import React from "react";
import { View, Text, StyleProp, ViewStyle, ScrollView } from "react-native";

interface MonthNameDisplayProps {
  style?: StyleProp<ViewStyle>;
  weekDates: dayjs.Dayjs[];
}

const CalendarWeekGrid: React.FC<MonthNameDisplayProps> = ({ style, weekDates }) => {
  const weekDaysFirstLetters = ["", "П", "В", "С", "Ч", "П", "С", "Н"];

  return (
    <View style={[{ width: "100%" }, style]}>
      <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
        {weekDaysFirstLetters.map((letter, index) => (
          <View style={{ width: 20, alignItems: "center" }} key={index}>
            <Text style={{ fontFamily: "Montserrat_400Regular", fontSize: 20 }}>
              {letter}
            </Text>
            <Text style={{ fontFamily: "Montserrat_400Regular", fontSize: 15 }}>
              {index == 0 ? "" : weekDates[index-1].date()}
            </Text>
          </View>
        ))}
      </View>

      <ScrollView
        style={{ borderColor: "#40513B", borderWidth: 0.5, marginTop: 10 }}
      >
        {Array(24)
          .fill(null)
          .map((_, index) => (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-around",
                width: "100%",
              }}
              key={index}
            >
              {weekDaysFirstLetters.map((_, index2) => (
                <View
                  style={{
                    borderColor: "#40513B",
                    borderWidth: 0.5,
                    height: 64,
                    flex: 1,
                    justifyContent: "center",
                  }}
                  key={index2}
                >
                  <Text
                    style={{
                      textAlign: "center",
                      fontFamily: "Montserrat_400Regular",
                      fontSize: 12,
                    }}
                  >
                    {index2 == 0 ? `${index}:00` : ""}
                  </Text>
                </View>
              ))}
            </View>
          ))}
      </ScrollView>
    </View>
  );
};

export default CalendarWeekGrid;
