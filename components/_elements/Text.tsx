import { Text, TextProps } from 'react-native'

import { COLORS, FONTS } from '@/lib/constants'

export function BodyText({ style, ...restProps }: TextProps) {
  return (
    <Text
      style={[
        style,
        {
          fontSize: 16,
          fontFamily: FONTS.hells.sans.medium,
          color: COLORS.text.body,
          lineHeight: 21,
        },
      ]}
      {...restProps}
    />
  )
}

export function BodyLinkText({ style, ...restProps }: TextProps) {
  return (
    <Text
      style={[
        style,
        {
          fontSize: 16,
          fontFamily: FONTS.hells.sans.medium,
          color: COLORS.text.link,
          lineHeight: 21,
        },
      ]}
      {...restProps}
    />
  )
}

export function PageTitleText({ style, ...restProps }: TextProps) {
  return (
    <Text
      style={[
        style,
        {
          fontFamily: FONTS.schotis.bold,
          fontSize: 32,
          color: COLORS.text.body,
          lineHeight: 35,
        },
      ]}
      {...restProps}
    />
  )
}

export function SubTitleText({ style, ...restProps }: TextProps) {
  return (
    <Text
      style={[
        style,
        {
          fontFamily: FONTS.schotis.bold,
          fontSize: 20,
          color: COLORS.text.body,
          lineHeight: 21,
        },
      ]}
      {...restProps}
    />
  )
}
