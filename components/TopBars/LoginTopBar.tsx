import { Colors } from "@/contants/Colors";
import React from "react";
import { Text, View } from "react-native";
import ArrowLeftMdIcon from "../icons/ArrowLeftMdIcon";
import CheckBigIcon from "../icons/CheckBigIcon";

const LoginTopBar = () => {
  return (
    <View
      style={{
        justifyContent: "space-between",
        backgroundColor: Colors.formTopBarBg,
        borderRadius: 30,
        flexDirection: "row",
        paddingInline: 30,
        paddingBlock: 18,
      }}
    >
      <View
        style={{
          width: 24,
          height: 24,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ArrowLeftMdIcon />
      </View>
      <Text
        style={{
          fontFamily: "Montserrat_400Regular",
          fontSize: 20,
          color: Colors.backgroundColor,
        }}
      >
        Логін
      </Text>

      <View
        style={{
          width: 24,
          height: 24,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CheckBigIcon />
      </View>
    </View>
  );
};

export default LoginTopBar;
