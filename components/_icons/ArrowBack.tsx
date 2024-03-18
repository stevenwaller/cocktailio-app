import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";
const SvgComponent = (props: SvgProps) => (
  <Svg width={24} height={24} {...props}>
    <Path d="M22 10.313H7.544l6.634-6.635L12.5 2 3 11.5l9.5 9.5 1.678-1.678-6.634-6.634H22z" />
  </Svg>
);
export default SvgComponent;
