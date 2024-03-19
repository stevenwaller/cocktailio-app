import { Text, TextProps } from 'react-native'

import { COLORS, FONTS } from '@/lib/constants'

export function BodyText({ style, ...restProps }: TextProps) {
  return (
    <Text
      style={[
        style,
        { fontSize: 16, fontFamily: FONTS.hells.serif.medium, color: COLORS.text.body }
      ]}
      {...restProps}
    />
  )
}
