import { Colors } from "@/contants/Colors";
import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";

const ArrowLeftMdIcon = (props: SvgProps) => (
  <Svg width={16} height={14} fill="none" {...props}>
    <Path
      stroke={Colors.backgroundColor}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M15 7H1m0 0 6 6M1 7l6-6"
    />
  </Svg>
);
export default ArrowLeftMdIcon;
