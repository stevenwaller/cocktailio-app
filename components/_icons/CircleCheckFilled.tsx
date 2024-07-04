import * as React from 'react'
import Svg, { SvgProps, Path } from 'react-native-svg'

const SvgComponent = ({ color, ...props }: SvgProps) => (
  <Svg width={27} height={26} viewBox="0 0 27 26" {...props}>
    <Path
      fill={color}
      fillRule="nonzero"
      d="M13.025 0c3.467 0 6.717 1.3 9.208 3.792a13.012 13.012 0 0 1 0 18.416C19.742 24.7 16.492 26 13.025 26c-3.467 0-6.717-1.3-9.208-3.792a13.012 13.012 0 0 1 0-18.416C6.308 1.3 9.558 0 13.025 0Zm3.84 8-5.387 5.577-2.342-2.425L7 13.363 11.478 18 19 10.211 16.864 8Z"
    />
  </Svg>
)
export default SvgComponent
