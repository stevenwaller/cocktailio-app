import { useCallback, useEffect, useRef } from 'react'
import { Animated, DimensionValue, StyleProp, ViewStyle } from 'react-native'

import { COLORS, SIZE } from '@/lib/constants'

type SkeletonProps = {
  width?: DimensionValue
  height: DimensionValue
  borderRadius?: number
  bgColor?: string
  style?: StyleProp<ViewStyle>
}

const Skeleton = ({
  width,
  height,
  bgColor = COLORS.bg.level3,
  borderRadius = SIZE.border.radius,
  style,
}: SkeletonProps) => {
  const animation = useRef(new Animated.Value(0.5)).current

  const startAnimation = useCallback(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animation, {
          toValue: 1,
          duration: 1000, // You can adjust the time as you want
          useNativeDriver: true,
        }),
        Animated.timing(animation, {
          toValue: 0.5,
          duration: 1000, // You can adjust the time as you want
          useNativeDriver: true,
        }),
      ]),
    ).start()
  }, [animation])

  useEffect(() => {
    startAnimation()
  }, [startAnimation])

  const animatedStyle = {
    opacity: animation,
    width,
    height,
    backgroundColor: bgColor,
    borderRadius,
  }

  return <Animated.View style={[style, animatedStyle]} />
}

Skeleton.displayName = 'Skeleton'

export default Skeleton
