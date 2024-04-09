import * as React from 'react'
import Svg, { SvgProps, Path } from 'react-native-svg'

const SvgComponent = ({ color, ...props }: SvgProps) => (
  <Svg width={19} height={19} {...props}>
    <Path
      fill={color}
      fillRule="nonzero"
      d="m8.688 9.89-4.54-4.538L3 6.5 9.5 13 16 6.5l-1.148-1.148-4.54 4.539-.812.77z"
    />
  </Svg>
)
export default SvgComponent
