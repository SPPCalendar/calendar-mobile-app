import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";

const MoreHorizontalIcon = (props: SvgProps) => (
  <Svg width={8} height={3} fill="none" {...props}>
    <Path
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M6.5 1.283a.5.5 0 1 0 1 0 .5.5 0 0 0-1 0Zm-3 0a.5.5 0 1 0 1 0 .5.5 0 0 0-1 0Zm-3 0a.5.5 0 1 0 1 0 .5.5 0 0 0-1 0Z"
    />
  </Svg>
);
export default MoreHorizontalIcon;
