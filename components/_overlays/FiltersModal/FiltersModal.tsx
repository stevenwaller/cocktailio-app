import {
  BottomSheetModal,
  BottomSheetBackdrop,
  BottomSheetBackdropProps
} from '@gorhom/bottom-sheet'
import { NavigationContainer } from '@react-navigation/native'
import {
  createStackNavigator,
  StackNavigationOptions,
  TransitionPresets
} from '@react-navigation/stack'
import { forwardRef, useMemo, useCallback } from 'react'

import FiltersScreen from './FiltersScreen'
import InStockScreen from './InStockScreen'

import { COLORS, FONTS } from '@/lib/constants'

const Stack = createStackNavigator()

const screenOptions: StackNavigationOptions = {
  ...TransitionPresets.SlideFromRightIOS,
  headerMode: 'screen',
  headerShown: true,
  headerTintColor: COLORS.nav.text,
  headerTitleAlign: 'center',
  headerStyle: {
    backgroundColor: COLORS.nav.bg
  },
  headerTitleStyle: {
    fontFamily: FONTS.schotis.black
  },
  headerShadowVisible: false,
  headerStatusBarHeight: 0,
  headerBackTitleVisible: false,
  cardStyle: {
    backgroundColor: COLORS.bg.level3,
    overflow: 'visible'
  }
}

const filtersScreenOptions = { headerLeft: () => null }

interface FiltersModalProps {
  onChange?: (index: number) => void
}

const FiltersModal = forwardRef<BottomSheetModal, FiltersModalProps>(({ onChange }, ref) => {
  const snapPoints = useMemo(() => ['50%', '90%'], [])

  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop {...props} appearsOnIndex={0} disappearsOnIndex={-1} opacity={0.43} />
    ),
    []
  )

  const renderScreens = (screenName: string) => {
    if (screenName === 'FILTERS') {
      return (
        <>
          <Stack.Screen name="FILTERS" options={filtersScreenOptions} component={FiltersScreen} />
          <Stack.Screen name="IN STOCK" component={InStockScreen} />
        </>
      )
    }

    if (screenName === 'IN STOCK') {
      return <Stack.Screen name="IN STOCK" component={InStockScreen} />
    }
  }

  return (
    <BottomSheetModal
      ref={ref}
      onChange={onChange}
      snapPoints={snapPoints}
      backdropComponent={renderBackdrop}
      backgroundStyle={{ backgroundColor: COLORS.nav.bg }}
      handleIndicatorStyle={{ backgroundColor: COLORS.text.link }}
    >
      {(data) => {
        const screenName = data?.data

        return (
          <NavigationContainer independent>
            <Stack.Navigator screenOptions={screenOptions}>
              {renderScreens(screenName)}
            </Stack.Navigator>
          </NavigationContainer>
        )
      }}
    </BottomSheetModal>
  )
})

FiltersModal.displayName = 'FiltersModal'

export default FiltersModal
