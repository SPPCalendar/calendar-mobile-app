import { Styles } from "@/contants/Styles";
import * as React from "react";
import { View } from "react-native";
import Svg, { SvgProps, Path } from "react-native-svg";

const ChevronLeft = (props: SvgProps) => (
  <View style={Styles.icon}>
    <Svg width={10} height={17} fill="none" {...props}>
      <Path
        stroke="#000"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="m1.947 1.103 7.025 7.025-7.025 7.025"
      />
    </Svg>
  </View>
);
export default ChevronLeft;
