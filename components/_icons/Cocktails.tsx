import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";
const SvgComponent = (props: SvgProps) => (
  <Svg width={26} height={24} {...props}>
    <Path d="M22 6V4H4v2l8 9v5H7v2h12v-2h-5v-5l8-9ZM8.43 8 6.66 6h12.69l-1.78 2H8.43Z" />
  </Svg>
);
export default SvgComponent;
