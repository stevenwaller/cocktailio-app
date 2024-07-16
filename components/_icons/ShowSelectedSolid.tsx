import * as React from 'react'
import Svg, { SvgProps, Path } from 'react-native-svg'

const SvgComponent = ({ color, ...props }: SvgProps) => (
  <Svg width={17} height={17} viewBox="0 0 17 17" {...props}>
    <Path
      fill={color}
      fillRule="nonzero"
      d="M8.5 0c2.262 0 4.383.85 6.008 2.48a8.52 8.52 0 0 1 0 12.04C12.883 16.15 10.762 17 8.5 17s-4.383-.85-6.008-2.48a8.52 8.52 0 0 1 0-12.04C4.117.85 6.238 0 8.5 0Zm2.395 5.366-3.36 3.478-1.46-1.512L4.741 8.71l2.793 2.892 4.692-4.858-1.332-1.38Z"
    />
  </Svg>
)
export default SvgComponent
