import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";
const SvgComponent = (props: SvgProps) => (
  <Svg width={16} height={16} {...props}>
    <Path
      fillRule="evenodd"
      d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0ZM4.275 4.275a.935.935 0 0 0 0 1.325l2.4 2.4-2.4 2.4a.935.935 0 0 0 0 1.325.935.935 0 0 0 1.325 0l2.4-2.4 2.4 2.4a.935.935 0 0 0 1.325 0 .94.94 0 0 0 0-1.325L9.325 8l2.4-2.4a.935.935 0 0 0 0-1.325.935.935 0 0 0-1.325 0L8 6.675l-2.4-2.4a.935.935 0 0 0-1.325 0Z"
    />
  </Svg>
);
export default SvgComponent;
