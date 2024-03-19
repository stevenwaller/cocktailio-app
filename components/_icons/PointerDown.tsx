import * as React from 'react'
import Svg, { SvgProps, Path } from 'react-native-svg'
const SvgComponent = ({ color, ...props }: SvgProps) => (
  <Svg width={11} height={6} {...props}>
    <Path fill={color} fillRule="evenodd" d="M.55.5h9.9L5.5 5.45z" />
  </Svg>
)
export default SvgComponent
