import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import { NavigationContainer } from '@react-navigation/native'
import { registerRootComponent } from 'expo'
import { useFonts } from 'expo-font'
import * as SplashScreen from 'expo-splash-screen'
import { useEffect } from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

import TabNav from './TabNav'

import { AuthModalContextProvider } from '@/lib/contexts/AuthModalContext'
import { BarsProvider } from '@/lib/contexts/BarsContext'
import { CollectionsProvider } from '@/lib/contexts/CollectionsContext'
import { ErasProvider } from '@/lib/contexts/ErasContext'
import { IngredientsProvider } from '@/lib/contexts/IngredientsContext'
import { UserContextProvider } from '@/lib/contexts/UserContext'

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

function App() {
  const [fontsLoaded, fontError] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    SchotisBlack: require('../assets/fonts/schotis/SchotisText-Black.otf'),
    SchotisBlackItalic: require('../assets/fonts/schotis/SchotisText-BlackItalic.otf'),
    SchotisBold: require('../assets/fonts/schotis/SchotisText-Bold.otf'),
    SchotisBoldItalic: require('../assets/fonts/schotis/SchotisText-BoldItalic.otf'),
    SchotisBook: require('../assets/fonts/schotis/SchotisText-Book.otf'),
    SchotisBookItalic: require('../assets/fonts/schotis/SchotisText-BookItalic.otf'),
    SchotisHeavy: require('../assets/fonts/schotis/SchotisText-Heavy.otf'),
    SchotisHeavyItalic: require('../assets/fonts/schotis/SchotisText-HeavyItalic.otf'),
    SchotisItalic: require('../assets/fonts/schotis/SchotisText-Italic.otf'),
    SchotisLight: require('../assets/fonts/schotis/SchotisText-Light.otf'),
    SchotisLightItalic: require('../assets/fonts/schotis/SchotisText-LightItalic.otf'),
    SchotisSemiBold: require('../assets/fonts/schotis/SchotisText-SemiBold.otf'),
    SchotisSemiBoldItalic: require('../assets/fonts/schotis/SchotisText-SemiBoldItalic.otf'),
    Schotis: require('../assets/fonts/schotis/SchotisText.otf'),
    HellsSansBold: require('../assets/fonts/hellschreiber-sans/HellschreiberSans-Bold.ttf'),
    HellsSansBoldItalic: require('../assets/fonts/hellschreiber-sans/HellschreiberSans-BoldItalic.ttf'),
    HellsSansLight: require('../assets/fonts/hellschreiber-sans/HellschreiberSans-Light.ttf'),
    HellsSansLightItalic: require('../assets/fonts/hellschreiber-sans/HellschreiberSans-LightItalic.ttf'),
    HellsSansMedium: require('../assets/fonts/hellschreiber-sans/HellschreiberSans-Medium.ttf'),
    HellsSansMediumItalic: require('../assets/fonts/hellschreiber-sans/HellschreiberSans-MediumItalic.ttf'),
    HellsSerifBold: require('../assets/fonts/hellschreiber-serif/HellschreiberSerif-Bold.ttf'),
    HellsSerifBoldItalic: require('../assets/fonts/hellschreiber-serif/HellschreiberSerif-BoldItalic.otf'),
    HellsSerifLight: require('../assets/fonts/hellschreiber-serif/HellschreiberSerif-Light.ttf'),
    HellsSerifLightItalic: require('../assets/fonts/hellschreiber-serif/HellschreiberSerif-LightItalic.otf'),
    HellsSerifMedium: require('../assets/fonts/hellschreiber-serif/HellschreiberSerif-Medium.ttf'),
    HellsSerifMediumItalic: require('../assets/fonts/hellschreiber-serif/HellschreiberSerif-MediumItalic.otf'),
  })

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (fontError) throw fontError
  }, [fontError])

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync()
    }
  }, [fontsLoaded])

  if (!fontsLoaded) {
    return null
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <UserContextProvider>
        <IngredientsProvider>
          <BarsProvider>
            <CollectionsProvider>
              <ErasProvider>
                <BottomSheetModalProvider>
                  <AuthModalContextProvider>
                    <NavigationContainer>
                      <TabNav />
                    </NavigationContainer>
                  </AuthModalContextProvider>
                </BottomSheetModalProvider>
              </ErasProvider>
            </CollectionsProvider>
          </BarsProvider>
        </IngredientsProvider>
      </UserContextProvider>
    </GestureHandlerRootView>
  )
}

registerRootComponent(App)
