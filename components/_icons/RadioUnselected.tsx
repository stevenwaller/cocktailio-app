import * as React from 'react'
import Svg, { SvgProps, Path } from 'react-native-svg'

const SvgComponent = ({ color, ...props }: SvgProps) => (
  <Svg viewBox="0 0 27 26" width={27} height={26} {...props}>
    <Path
      fill="none"
      fillRule="nonzero"
      stroke={color}
      strokeWidth={2}
      d="M13.025 25c-3.2 0-6.2-1.2-8.5-3.5-4.7-4.7-4.7-12.3 0-17 2.3-2.3 5.3-3.5 8.5-3.5s6.2 1.2 8.5 3.5c4.7 4.7 4.7 12.3 0 17-2.3 2.3-5.3 3.5-8.5 3.5Z"
    />
  </Svg>
)
export default SvgComponent
