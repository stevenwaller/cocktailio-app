import * as React from 'react'
import Svg, { SvgProps, Path } from 'react-native-svg'

const SvgComponent = ({ color, ...props }: SvgProps) => (
  <Svg viewBox="0 0 25 25" {...props}>
    <Path
      fill={color}
      d="M22.5 4h-4.75l-.466-1.864A1.5 1.5 0 0 0 15.83 1H9.17a1.5 1.5 0 0 0-1.455 1.136L7.25 4H2.5a.5.5 0 0 0 0 1h1.55l.928 18.576A1.5 1.5 0 0 0 6.477 25h12.097a1.5 1.5 0 0 0 1.498-1.425L21.001 5H22.5a.5.5 0 0 0 0-1ZM8.686 2.379A.5.5 0 0 1 9.171 2h6.658a.5.5 0 0 1 .485.379L16.719 4H8.281Zm10.388 21.145a.5.5 0 0 1-.5.476H6.477a.5.5 0 0 1-.5-.475L5.05 5H20Z"
    />
    <Path
      fill={color}
      d="M9.5 10a.5.5 0 0 0-.5.5v8a.5.5 0 0 0 1 0v-8a.5.5 0 0 0-.5-.5ZM15.5 10a.5.5 0 0 0-.5.5v8a.5.5 0 0 0 1 0v-8a.5.5 0 0 0-.5-.5ZM12.5 9a.5.5 0 0 0-.5.5v10a.5.5 0 0 0 1 0v-10a.5.5 0 0 0-.5-.5Z"
    />
  </Svg>
)
export default SvgComponent
