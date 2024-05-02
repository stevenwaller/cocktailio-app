import * as React from 'react'
import Svg, { SvgProps, G, Path } from 'react-native-svg'

const SvgComponent = ({ color, ...props }: SvgProps) => (
  <Svg viewBox="0 0 24 24" width={24} height={24} {...props}>
    <G fill="none" fillRule="evenodd">
      <Path d="M0 0h24v24H0z" />
      <Path
        fill={color}
        fillRule="nonzero"
        d="M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2Zm0 15-5-2.18L7 18V5h10v13Z"
      />
    </G>
  </Svg>
)
export default SvgComponent
