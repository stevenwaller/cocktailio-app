import * as React from 'react'
import Svg, { SvgProps, G, Path } from 'react-native-svg'

const SvgComponent = ({ color, ...props }: SvgProps) => (
  <Svg width={17} height={17} viewBox="0 0 17 17" {...props}>
    <G fill="none" fillRule="evenodd" stroke={color} strokeWidth={2}>
      <Path d="M8.5 15.969c-1.996 0-3.867-.749-5.301-2.183a7.491 7.491 0 0 1 0-10.603C4.633 1.748 6.504 1 8.5 1s3.867.748 5.301 2.183a7.491 7.491 0 0 1 0 10.603c-1.434 1.434-3.305 2.183-5.301 2.183Z" />
      <Path strokeLinecap="square" d="m3.742 2.783 9.044 10.379" />
    </G>
  </Svg>
)
export default SvgComponent
