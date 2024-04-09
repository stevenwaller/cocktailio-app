import * as React from 'react'
import Svg, { SvgProps, Path } from 'react-native-svg'

const SvgComponent = ({ color, ...props }: SvgProps) => (
  <Svg width={19} height={19} {...props}>
    <Path
      fill={color}
      fillRule="nonzero"
      d="M8.688 8.46 4.148 13 3 11.852l6.5-6.5 6.5 6.5L14.852 13l-4.54-4.54-.812-.77z"
    />
  </Svg>
)
export default SvgComponent
