import * as React from 'react'
import Svg, { SvgProps, Path } from 'react-native-svg'
const SvgComponent = ({ color, ...props }: SvgProps) => (
  <Svg width={9} height={13} {...props}>
    <Path fill={color} d="M0 5.062h6.847L3.705 8.205 4.5 9 9 4.5 4.5 0l-.795.795 3.142 3.142H0z" />
  </Svg>
)
export default SvgComponent
