import * as React from 'react'
import Svg, { SvgProps, G, Circle } from 'react-native-svg'

const SvgComponent = ({ color, ...props }: SvgProps) => (
  <Svg viewBox="0 0 20 4" width={20} height={4} {...props}>
    <G fill={color} fillRule="evenodd">
      <Circle cx={18} cy={2} r={2} />
      <Circle cx={10} cy={2} r={2} />
      <Circle cx={2} cy={2} r={2} />
    </G>
  </Svg>
)
export default SvgComponent
