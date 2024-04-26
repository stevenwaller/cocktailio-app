import { View, Text, StyleSheet, ViewProps } from 'react-native'

import { COLORS, FONTS } from '@/lib/constants'

interface IBadgeProps extends ViewProps {
  isLink?: boolean
}

const Badge = ({ isLink, children }: IBadgeProps) => {
  return (
    <View
      style={[
        styles.badge,
        isLink ? { backgroundColor: '#F0CFBA' } : { backgroundColor: '#7FA4B2' },
      ]}
    >
      <Text style={styles.badgeText}>{children}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  badge: {
    borderRadius: 50,
    padding: 0.5,
    height: 15,
    minWidth: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 3,
    marginRight: 2,
  },
  badgeText: {
    fontSize: 10,
    color: COLORS.text.dark,
    fontFamily: FONTS.hells.sans.bold,
  },
})

Badge.displayName = 'Badge'

export default Badge
