import React from "react";
import { View } from "react-native";
import AddPlusIcon from "./icons/AddPlusIcon";

const AddEventButton = () => {
  return (
    <View
      style={{
        position: "absolute",
        bottom: 64,
        right: 31,
        backgroundColor: "#40513B",
        borderRadius: 15,
      }}
    >
      <AddPlusIcon />
    </View>
  );
};

export default AddEventButton;
