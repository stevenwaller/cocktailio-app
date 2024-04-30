import * as React from 'react'
import Svg, { SvgProps, G, Path } from 'react-native-svg'

const SvgComponent = ({ color, ...props }: SvgProps) => (
  <Svg viewBox="0 0 22 12" width={22} height={12} {...props}>
    <G fill={color} fillRule="evenodd">
      <Path fillRule="nonzero" d="M0 12h8v-2H0v2Zm11-7H0v2h9l2-2Zm2-5H0v2h13V0Z" />
      <Path d="M10 12V9.53l6.88-6.88c.2-.2.51-.2.71 0l1.77 1.77c.2.2.2.51 0 .71L12.47 12H10ZM21.802 2.69a.66.66 0 0 0 0-.942L20.245.19a.66.66 0 0 0-.943 0L18 1.5l2.492 2.492 1.31-1.302Z" />
    </G>
  </Svg>
)
export default SvgComponent
