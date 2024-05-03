import { StackNavigationOptions, TransitionPresets } from '@react-navigation/stack'
import { View, Platform } from 'react-native'

import BackIcon from '@/components/_icons/Back'
import { COLORS, FONTS } from '@/lib/constants'

export const modalScreenOptions: StackNavigationOptions = {
  ...TransitionPresets.SlideFromRightIOS,
  headerMode: 'screen',
  headerShown: true,
  headerTintColor: COLORS.text.body,
  headerTitleAlign: 'center',
  headerStyle: {
    backgroundColor: COLORS.bg.level2,
    height: 35,
  },
  headerTitleStyle: {
    fontFamily: FONTS.schotis.bold,
    fontSize: 20,
    padding: 0,
    top: -8,
  },
  headerShadowVisible: false,
  headerStatusBarHeight: 0,
  headerBackImage: () => (
    <View
      style={{
        paddingTop: 8,
        paddingRight: 8,
        paddingBottom: 20,
        paddingLeft: Platform.OS === 'ios' ? 8 : 0,
      }}
    >
      <BackIcon color={COLORS.text.link} />
    </View>
  ),
  headerBackTitleVisible: false,
  cardStyle: {
    backgroundColor: COLORS.bg.level3,
    overflow: 'visible',
  },
}

export const tabScreenOptions = {
  headerStyle: {
    backgroundColor: COLORS.nav.bg,
  },
  headerTintColor: COLORS.nav.text,
  headerTitleStyle: {
    fontFamily: FONTS.schotis.black,
  },
  contentStyle: { backgroundColor: COLORS.bg.level1 },
  headerBackTitleVisible: false,
}
