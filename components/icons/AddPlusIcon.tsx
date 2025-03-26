import * as React from "react";
import { View } from "react-native";
import Svg, { SvgProps, Path } from "react-native-svg";

const AddPlusIcon = (props: SvgProps) => (
  <View
    style={{ padding: 17.33, justifyContent: "center", alignItems: "center" }}
  >
    <Svg width={22} height={22} fill="none" {...props}>
      <Path
        stroke="#EDF1D6"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={3}
        d="M2.333 11H11m0 0h8.667M11 11v8.667M11 11V2.334"
      />
    </Svg>
  </View>
);
export default AddPlusIcon;
