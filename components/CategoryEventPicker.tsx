import { Colors } from "@/contants/Colors";
import { Styles } from "@/contants/Styles";
import React from "react";
import { StyleProp, Text, View, ViewStyle } from "react-native";

interface Props {
  style?: StyleProp<ViewStyle>;
}

const CategoryEventPicker: React.FC<Props> = ({ style }) => {
  return (
    <View
      style={[
        Styles.textInput,
        {
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        },
        style,
      ]}
    >
      <Text style={Styles.textInputText}>Тип події</Text>
      <View
        style={{
          width: 24,
          height: 24,
          borderRadius: "50%",
          backgroundColor: Colors.formTopBarBg,
        }}
      ></View>
    </View>
  );
};

export default CategoryEventPicker;
