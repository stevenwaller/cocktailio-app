import { Text, View } from 'react-native'

const SharedScreen = () => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Shared Screen</Text>
    </View>
  )
}

SharedScreen.displayName = 'SharedScreen'

export default SharedScreen
