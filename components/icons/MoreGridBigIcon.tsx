import { Styles } from "@/contants/Styles";
import * as React from "react";
import { View } from "react-native";
import Svg, { SvgProps, Path } from "react-native-svg";

const MoreGridBigIcon = (props: SvgProps) => (
  <View style={Styles.icon}>
    <Svg width={16} height={16} fill="none" {...props}>
      <Path
        stroke="#000"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M13 14a1 1 0 1 0 2 0 1 1 0 0 0-2 0Zm-6 0a1 1 0 1 0 2 0 1 1 0 0 0-2 0Zm-6 0a1 1 0 1 0 2 0 1 1 0 0 0-2 0Zm12-6a1 1 0 1 0 2 0 1 1 0 0 0-2 0ZM7 8a1 1 0 1 0 2 0 1 1 0 0 0-2 0ZM1 8a1 1 0 1 0 2 0 1 1 0 0 0-2 0Zm12-6a1 1 0 1 0 2 0 1 1 0 0 0-2 0ZM7 2a1 1 0 1 0 2 0 1 1 0 0 0-2 0ZM1 2a1 1 0 1 0 2 0 1 1 0 0 0-2 0Z"
      />
    </Svg>
  </View>
);
export default MoreGridBigIcon;
