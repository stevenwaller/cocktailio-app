import * as React from 'react'
import Svg, { SvgProps, Path } from 'react-native-svg'

const SvgComponent = ({ color, ...props }: SvgProps) => (
  <Svg viewBox="0 0 27 26" width={27} height={26} {...props}>
    <Path
      fill={color}
      fillRule="nonzero"
      d="M13.025 0c3.467 0 6.717 1.3 9.208 3.792a13.012 13.012 0 0 1 0 18.416C19.742 24.7 16.492 26 13.025 26c-3.467 0-6.717-1.3-9.208-3.792a13.012 13.012 0 0 1 0-18.416C6.308 1.3 9.558 0 13.025 0Zm0 8c-1.33 0-2.578.5-3.534 1.458a5.012 5.012 0 0 0 0 7.084A4.93 4.93 0 0 0 13.025 18c1.33 0 2.578-.5 3.534-1.458a5.012 5.012 0 0 0 0-7.084A4.93 4.93 0 0 0 13.025 8Z"
    />
  </Svg>
)
export default SvgComponent
