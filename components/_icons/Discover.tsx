import * as React from 'react'
import Svg, { SvgProps, Path } from 'react-native-svg'
const SvgComponent = ({ color, ...props }: SvgProps) => (
  <Svg width={25} height={24} {...props}>
    <Path
      fill={color}
      d="M12 10.9c-.61 0-1.1.49-1.1 1.1 0 .61.49 1.1 1.1 1.1.61 0 1.1-.49 1.1-1.1 0-.61-.49-1.1-1.1-1.1ZM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2Zm2.19 12.19L6 18l3.81-8.19L18 6l-3.81 8.19Z"
    />
  </Svg>
)
export default SvgComponent
