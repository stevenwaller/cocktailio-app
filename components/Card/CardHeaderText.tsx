import { forwardRef } from 'react'
import { StyleSheet, Text, TextProps } from 'react-native'

import { COLORS, FONTS } from '@/lib/constants'

interface CardHeaderTextProps extends TextProps {
  isLink?: boolean
}

const CardHeaderText = forwardRef<Text, CardHeaderTextProps>(
  ({ isLink, children, style, ...restProps }, ref) => {
    return (
      <Text style={[styles.text, isLink && styles.isLink, style]} {...restProps} ref={ref}>
        {children}
      </Text>
    )
  },
)

const styles = StyleSheet.create({
  text: {
    width: '100%',
    fontSize: 20,
    color: COLORS.text.body,
    fontFamily: FONTS.schotis.bold,
  },
  isLink: {
    color: COLORS.text.link,
  },
})

CardHeaderText.displayName = 'CardHeaderText'

export default CardHeaderText
