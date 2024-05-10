import type { NativeStackScreenProps } from '@react-navigation/native-stack'
import { Text, View, Button } from 'react-native'

import { HomeStackParamList } from '@/lib/types'

type Props = NativeStackScreenProps<HomeStackParamList, 'Home'>

const HomeScreen = ({ navigation }: Props) => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <Button title="Go to Details" onPress={() => navigation.navigate('Details')} />
    </View>
  )
}

HomeScreen.displayName = 'HomeScreen'

export default HomeScreen
