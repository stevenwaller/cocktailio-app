import * as React from 'react'
import Svg, { SvgProps, G, Path } from 'react-native-svg'

const SvgComponent = ({ color, ...props }: SvgProps) => (
  <Svg viewBox="0 0 19 19" width={19} height={19} {...props}>
    <G fill="none" fillRule="evenodd">
      <Path d="M0 0h19v19H0z" />
      <Path
        fill={color}
        fillRule="nonzero"
        d="m8.544 8.313 6.634-6.635L13.5 0 4 9.5l9.5 9.5 1.678-1.678-6.634-6.634L7.418 9.5z"
      />
    </G>
  </Svg>
)
export default SvgComponent
