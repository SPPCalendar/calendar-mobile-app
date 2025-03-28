import React from "react";
import { View, Text } from "react-native";

const SmallMonthItem = () => {
  return (
    <View style={{ flex: 1 }}>
      <Text
        style={{
          fontFamily: "Montserrat_400Regular",
          fontSize: 16,
          textAlign: "center",
        }}
      >
        ЛИПЕНЬ
      </Text>
      <View
        style={{
          borderWidth: 1,
          marginTop: 7,
          gap: 6,
          borderColor: "#40513B57",
        }}
      >
        {Array(5) // 5 weeks per month
          .fill(null)
          .map((_, index) => (
            <View style={{ flexDirection: "row" }} key={index}>
              {Array(7) // 7 days per week
                .fill(null)
                .map((_, index1) => (
                  <View
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                      minWidth: 18,
                      minHeight: 18,
                    }}
                    key={index1}
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
                      {index1}
                    </Text>
                  </View>
                ))}
            </View>
          ))}
      </View>
    </View>
  );
};

export default SmallMonthItem;
