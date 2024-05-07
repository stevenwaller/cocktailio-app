import * as React from 'react'
import Svg, { SvgProps, Path } from 'react-native-svg'

const SvgComponent = ({ color, ...props }: SvgProps) => (
  <Svg viewBox="0 0 25 24" width={25} height={24} {...props}>
    <Path
      fill={color}
      fillRule="nonzero"
      d="M13 6.514h-2v4.487H6.515v1.998h4.487v4.487h1.998v-4.487h4.487v-1.998h-4.487z"
    />
  </Svg>
)
export default SvgComponent
