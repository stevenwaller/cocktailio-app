import type { NativeStackScreenProps } from '@react-navigation/native-stack'
import { Text, View } from 'react-native'

import { HomeStackParamList } from '@/lib/types'

type Props = NativeStackScreenProps<HomeStackParamList, 'Home'>

const HomeScreen = ({ navigation }: Props) => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
    </View>
  )
}

HomeScreen.displayName = 'HomeScreen'

export default HomeScreen
