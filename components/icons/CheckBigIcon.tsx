import { Colors } from "@/contants/Colors";
import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";

const CheckBigIcon = (props: SvgProps) => (
  <Svg width={18} height={13} fill="none" {...props}>
    <Path
      stroke={props.stroke ?? Colors.backgroundColor}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="m1 7 4.95 4.95L16.557 1.343"
    />
  </Svg>
);
export default CheckBigIcon;
