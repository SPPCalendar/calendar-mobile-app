import { Styles } from "@/contants/Styles";
import React from "react";
import { View, Text, StyleProp, ViewStyle } from "react-native";
import Checkbox from "expo-checkbox";
import { Colors } from "@/contants/Colors";

interface Props {
  label: string;
  isChecked: boolean;
  setChecked: (check: boolean) => void;
  style?: StyleProp<ViewStyle>;
}

const CheckboxWithText: React.FC<Props> = ({
  label,
  isChecked,
  setChecked,
  style,
}) => {
  return (
    <View
      style={[
        {
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        },
        style,
      ]}
    >
      <Text style={Styles.textInputText}>{label}</Text>
      <Checkbox
        value={isChecked}
        onValueChange={setChecked}
        color={isChecked ? Colors.filledCheckboxBg : undefined}
      />
    </View>
  );
};

export default CheckboxWithText;
