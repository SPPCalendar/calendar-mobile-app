import { Colors } from "@/contants/Colors";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import ArrowLeftMdIcon from "../icons/ArrowLeftMdIcon";
import CheckBigIcon from "../icons/CheckBigIcon";
import { useRouter } from "expo-router";

interface FormTopBarProps {
  title: string;
}

const FormTopBar: React.FC<FormTopBarProps> = ({ title }) => {
  const router = useRouter();

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
      <TouchableOpacity
        style={{
          width: 24,
          height: 24,
          justifyContent: "center",
          alignItems: "center",
        }}
        onPress={() => router.back()}
      >
        <TouchableOpacity onPress={() => router.back()}>
          {<ArrowLeftMdIcon />}
        </TouchableOpacity>
      </TouchableOpacity>
      <Text
        style={{
          fontFamily: "Montserrat_400Regular",
          fontSize: 20,
          color: Colors.backgroundColor,
        }}
      >
        {title}
      </Text>

      <View
        style={{
          width: 24,
          height: 24,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/* <CheckBigIcon /> */}
      </View>
    </View>
  );
};

export default FormTopBar;
