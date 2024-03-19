import * as React from 'react'
import Svg, { SvgProps, G, Path } from 'react-native-svg'
const SvgComponent = ({ color, ...props }: SvgProps) => (
  <Svg width={26} height={24} {...props}>
    <G fill="none" fillRule="evenodd">
      <Path d="M1 0h24v24H1z" />
      <Path
        fill={color}
        fillRule="nonzero"
        d="M19 2H7c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2ZM7 4h5v8l-2.5-1.5L7 12V4Z"
      />
    </G>
  </Svg>
)
export default SvgComponent
