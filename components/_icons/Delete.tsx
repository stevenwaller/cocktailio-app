import * as React from 'react'
import Svg, { SvgProps, Path } from 'react-native-svg'
const SvgComponent = ({ color, ...props }: SvgProps) => (
  <Svg width={8} height={8} {...props}>
    <Path
      fill={color}
      d="M7.472 6.509 5 4.037l2.47-2.47a.68.68 0 0 0 0-.964.68.68 0 0 0-.962 0L4.037 3.074 1.567.604a.68.68 0 0 0-.964 0 .68.68 0 0 0 0 .962l2.471 2.471L.604 6.51a.68.68 0 0 0 0 .963.68.68 0 0 0 .962 0L4.037 5 6.51 7.47a.68.68 0 0 0 .963 0 .683.683 0 0 0 0-.962Z"
    />
  </Svg>
)
export default SvgComponent
