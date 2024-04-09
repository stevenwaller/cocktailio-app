import * as React from 'react'
import Svg, { SvgProps, Path } from 'react-native-svg'

const SvgComponent = ({ color, ...props }: SvgProps) => (
  <Svg width={19} height={19} viewBox="0 0 19 19" {...props}>
    <Path
      fill={color}
      fillRule="nonzero"
      d="m8.785 9.988 4.54 4.54-1.15 1.148-6.5-6.5 6.5-6.5 1.15 1.148-4.54 4.54-.77.812z"
    />
  </Svg>
)
export default SvgComponent
