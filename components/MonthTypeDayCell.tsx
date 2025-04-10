import React from "react";
import { Text, View } from "react-native";
import MoreHorizontalIcon from "./icons/MoreHorizontalIcon";

const MonthTypeDayCell = () => {
  const x: string[] = ["1s", "2s", "3s", "4s", "5s"];

  return (
    <View style={{}}>
      <Text
        style={{
          height: 13,
          fontFamily: "Montserrat_400Regular",
          fontSize: 12,
          textAlign: "center",
        }}
      >
        5
      </Text>

      <View style={{ marginTop: 2, gap: 1 }}>
        {x.map((y, index) => (
          <View
            style={{
              paddingBlock: 3,
              paddingInline: 2,
              // backgroundColor: "#FFFFFF",
            }}
            key={index}
          >
            <Text style={{ fontFamily: "Montserrat_400Regular", fontSize: 12 }}>
              {/* Зустріч */}
            </Text>
          </View>
        ))}
      </View>

      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          paddingTop: 2,
          paddingBottom: 1,
        }}
      >
        {/* <MoreHorizontalIcon /> */}
      </View>
    </View>
  );
};

export default MonthTypeDayCell;
