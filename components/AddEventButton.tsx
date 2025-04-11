import React from "react";
import { TouchableOpacity, View } from "react-native";
import AddPlusIcon from "./icons/AddPlusIcon";

// props
interface AddEventButtonProps {
  onPress: () => void;
}

const AddEventButton: React.FC<AddEventButtonProps> = ({ onPress }) => {
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
      <TouchableOpacity onPress={onPress}>
        <AddPlusIcon />
      </TouchableOpacity>
    </View>
  );
};

export default AddEventButton;
