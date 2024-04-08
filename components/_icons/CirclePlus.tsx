import * as React from 'react'
import Svg, { SvgProps, G, Path } from 'react-native-svg'

const SvgComponent = ({ color, ...props }: SvgProps) => (
  <Svg width={27} height={26} {...props}>
    <G fill="none" fillRule="nonzero">
      <Path
        stroke={color}
        strokeWidth={2}
        d="M13.025 25c-3.2 0-6.2-1.2-8.5-3.5-4.7-4.7-4.7-12.3 0-17 2.3-2.3 5.3-3.5 8.5-3.5s6.2 1.2 8.5 3.5c4.7 4.7 4.7 12.3 0 17-2.3 2.3-5.3 3.5-8.5 3.5Z"
      />
      <Path
        fill={color}
        d="M14 7.514h-2v4.487H7.515v1.998h4.487v4.487h1.998v-4.487h4.487v-1.998h-4.487z"
      />
    </G>
  </Svg>
)
export default SvgComponent
