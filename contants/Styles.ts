import { StyleSheet } from "react-native";
import { Colors } from "./Colors";

export const Styles = StyleSheet.create({
  icon: {
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  textInput: {
    backgroundColor: Colors.textInputBg,
    paddingBlock: 18,
    paddingInline: 33,
    borderRadius: 30,
  },
  textInputText: {
    fontFamily: "Montserrat_400Regular",
    fontSize: 18,
  },
});
