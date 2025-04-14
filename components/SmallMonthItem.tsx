import { Month } from "@/types/Month";
import { getMonthDates, getUkrainianMonthName } from "@/utils/utils";
import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

interface Props {
  month: Month;
  year: number;
}

const SmallMonthItem: React.FC<Props> = ({ month, year }) => {
  const monthDatesSplitByWeeks = getMonthDates(month, year);
  const needsEmptyRow = monthDatesSplitByWeeks.length < 6;
  const router = useRouter();

  const openMonthPresentation = () => {
    router.push({
      pathname: "/presentation/month_presentation",
      params: { monthParam: month, yearParam: year },
    });
  };

  return (
    <TouchableOpacity style={{ flex: 1 }} onPress={openMonthPresentation}>
      <Text
        style={{
          fontFamily: "Montserrat_400Regular",
          fontSize: 16,
          textAlign: "center",
        }}
      >
        {getUkrainianMonthName(month).toUpperCase()}
      </Text>
      <View
        style={{
          borderWidth: 1,
          marginTop: 7,
          gap: 6,
          borderColor: "#40513B57",
        }}
      >
        {Array(monthDatesSplitByWeeks.length)
          .fill(null)
          .map((_, index) => (
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              {monthDatesSplitByWeeks[index].map((date, index) => (
                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    minWidth: 13,
                    minHeight: 18,
                  }}
                  key={index}
                >
                  <Text
                    style={{
                      fontFamily: "Montserrat_400Regular",
                      fontSize: 10,
                      width: 12,
                      height: 12,
                      textAlign: "center",
                    }}
                  >
                    {date.date()}
                  </Text>
                </View>
              ))}
            </View>
          ))}
        {needsEmptyRow && <View style={{ height: 12, width: "100%" }} />}
      </View>
    </TouchableOpacity>
  );
};

export default SmallMonthItem;
