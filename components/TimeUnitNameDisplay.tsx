import React from "react";
import {
  StyleProp,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import ChevronRight from "./icons/ChevronRight";
import ChevronLeft from "./icons/ChevronLeft";

interface MonthNameDisplayProps {
  monthName: string;
  onPressLeftArrow?: () => void;
  onPressRightArrow?: () => void;
  style?: StyleProp<ViewStyle>;
}

const TimeUnitNameDisplay: React.FC<MonthNameDisplayProps> = ({
  monthName,
  onPressLeftArrow,
  onPressRightArrow,
  style,
}) => {
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
      <TouchableOpacity onPress={onPressLeftArrow}>
        <ChevronRight />
      </TouchableOpacity>
      <Text
        style={{
          fontFamily: "Montserrat_400Regular",
          fontSize: 20,
        }}
      >
        {monthName}
      </Text>
      <TouchableOpacity onPress={onPressRightArrow}>
        <ChevronLeft />
      </TouchableOpacity>
    </View>
  );
};

export default TimeUnitNameDisplay;
