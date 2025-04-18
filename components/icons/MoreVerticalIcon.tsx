import { Styles } from "@/contants/Styles";
import * as React from "react";
import { View } from "react-native";
import Svg, { SvgProps, Path } from "react-native-svg";

const MoreVerticalIcon = (props: SvgProps) => (
  <View style={Styles.icon}>
    <Svg width={4} height={16} fill="none" {...props}>
      <Path
        stroke="#000"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M1 14a1 1 0 1 0 2 0 1 1 0 0 0-2 0Zm0-6a1 1 0 1 0 2 0 1 1 0 0 0-2 0Zm0-6a1 1 0 1 0 2 0 1 1 0 0 0-2 0Z"
      />
    </Svg>
  </View>
);
export default MoreVerticalIcon;
