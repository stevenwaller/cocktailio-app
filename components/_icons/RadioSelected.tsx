import * as React from 'react'
import Svg, { SvgProps, G, Path } from 'react-native-svg'

const SvgComponent = ({ color, ...props }: SvgProps) => (
  <Svg viewBox="0 0 27 26" width={27} height={26} {...props}>
    <G fill="none" fillRule="nonzero">
      <Path
        stroke={color}
        strokeWidth={2}
        d="M13.025 25c-3.2 0-6.2-1.2-8.5-3.5-4.7-4.7-4.7-12.3 0-17 2.3-2.3 5.3-3.5 8.5-3.5s6.2 1.2 8.5 3.5c4.7 4.7 4.7 12.3 0 17-2.3 2.3-5.3 3.5-8.5 3.5Z"
      />
      <Path
        fill={color}
        d="M13.025 21c-2.133 0-4.133-.8-5.667-2.333a8.007 8.007 0 0 1 0-11.334C8.892 5.8 10.892 5 13.025 5s4.133.8 5.667 2.333a8.007 8.007 0 0 1 0 11.334C17.158 20.2 15.158 21 13.025 21Z"
      />
    </G>
  </Svg>
)
export default SvgComponent
