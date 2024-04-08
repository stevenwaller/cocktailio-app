import { BottomSheetView } from '@gorhom/bottom-sheet'
import { useNavigation } from '@react-navigation/native'
import { StyleSheet, Pressable, Text } from 'react-native'

import { COLORS } from '@/lib/constants'

interface FiltersScreenProps {}

const FiltersScreen = (props: FiltersScreenProps) => {
  const { navigate } = useNavigation()

  return (
    <BottomSheetView style={styles.container}>
      <Pressable onPress={() => navigate('IN STOCK' as never)}>
        <Text>In Stoooock</Text>
      </Pressable>
    </BottomSheetView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.bg.level3
  }
})

FiltersScreen.displayName = 'FiltersScreen'

export default FiltersScreen
