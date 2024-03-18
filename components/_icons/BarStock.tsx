import * as React from "react";
import Svg, { SvgProps, G, Path } from "react-native-svg";
const SvgComponent = (props: SvgProps) => (
  <Svg width={25} height={24} {...props}>
    <G fill="none" fillRule="evenodd">
      <Path d="M.5 0h24v24H.5z" />
      <Path
        fillRule="nonzero"
        d="M15.5 8.327V3a1 1 0 0 0-1-1h-3a1 1 0 0 0-1 1v5.328c-1.081.495-3 1.658-3 3.672 0 2.048.969 8.852 1.01 9.142.07.493.492.858.99.858h7a1 1 0 0 0 .99-.858c.041-.289 1.01-7.094 1.01-9.142 0-2.014-1.919-3.177-3-3.673ZM13.5 4v1h-1V4h1Z"
      />
    </G>
  </Svg>
);
export default SvgComponent;
