import { Styles } from "@/contants/Styles";
import * as React from "react";
import { View } from "react-native";
import Svg, { SvgProps, Path } from "react-native-svg";

const SearchIcon = (props: SvgProps) => (
  <View style={Styles.icon}>
    <Svg width={20} height={20} fill="none" {...props}>
      <Path
        stroke="#000"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="m13 13 6 6M8 15A7.002 7.002 0 0 1 3.05 3.05 7 7 0 1 1 8 15Z"
      />
    </Svg>
  </View>
);
export default SearchIcon;
