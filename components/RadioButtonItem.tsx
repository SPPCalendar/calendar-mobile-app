import { Colors } from "@/contants/Colors";
import { Styles } from "@/contants/Styles";
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

interface Props {
  label: string;
  selected: boolean;
  onPress: () => void;
}

const RadioButtonItem: React.FC<Props> = ({ label, selected, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 24 }}>
        <View
          style={{
            width: 32,
            height: 32,
            backgroundColor: selected ? Colors.filledCheckboxBg : "transparent",
            borderRadius: "50%",
            borderWidth: 1,
            borderColor: Colors.filledCheckboxBg,
          }}
        ></View>
        <Text style={Styles.chooseCalendarPresentationText}>{label}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default RadioButtonItem;
