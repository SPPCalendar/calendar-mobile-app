import React from "react";
import { StyleProp, Text, View, ViewStyle } from "react-native";
import ChevronRight from "./icons/ChevronRight";
import ChevronLeft from "./icons/ChevronLeft";
import { useFonts, Montserrat_400Regular } from "@expo-google-fonts/montserrat";
import AppLoading from "./AppLoading";

interface MonthNameDisplayProps {
  monthName: string;
  style?: StyleProp<ViewStyle>;
}

const MonthNameDisplay: React.FC<MonthNameDisplayProps> = ({
  monthName,
  style,
}) => {
  let [fontsLoaded] = useFonts({
    Montserrat_400Regular,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <View
      style={[
        {
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
        },
        style,
      ]}
    >
      <ChevronRight />
      <Text
        style={{
          fontFamily: "Montserrat_400Regular",
          fontSize: 20,
        }}
      >
        {monthName}
      </Text>
      <ChevronLeft />
    </View>
  );
};

export default MonthNameDisplay;
