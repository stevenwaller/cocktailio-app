import * as React from 'react'
import Svg, { SvgProps, Path } from 'react-native-svg'

const SvgComponent = ({ color, ...props }: SvgProps) => (
  <Svg viewBox="0 0 18 18" width={18} height={18} {...props}>
    <Path
      fill="#123742"
      fillRule="nonzero"
      d="M10 1.514H8v6.487H1.515v1.998h6.487v6.487h1.998V9.999h6.487V8.001H9.999z"
    />
  </Svg>
)
export default SvgComponent
