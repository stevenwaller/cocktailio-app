import { useNavigation } from '@react-navigation/native'
import { StyleSheet, Pressable, Text, View } from 'react-native'

import PlusIcon from '@/components/_icons/Plus'
import AddInput from '@/components/_inputs/AddInput'
import ModalBody from '@/components/_overlays/ModalBody'
import { COLORS, FONTS } from '@/lib/constants'
import useBars from '@/lib/hooks/useBars'
import { TBar, TIngredient } from '@/lib/types/supabase'

interface IAddToBarHomeScreen {
  bar?: TBar | null
  ingredient?: TIngredient | null
  onComplete?: () => void
  onAdd?: (bar: TBar) => void
  onRemove?: (bar: TBar) => void
}

const AddToBarHomeScreen = ({
  bar,
  ingredient,
  onComplete = () => {},
  onAdd = () => {},
  onRemove = () => {},
}: IAddToBarHomeScreen) => {
  const { navigate } = useNavigation()
  const { bars } = useBars()

  return (
    <ModalBody>
      {bars.map((barItem) => (
        <View key={barItem.id} style={styles.item}>
          <AddInput
            onPress={(value, checked) => {
              if (checked) {
                onRemove(barItem)
              } else {
                onAdd(barItem)
              }
            }}
            checked={barItem.ingredientsById[ingredient?.id as string] !== undefined}
          />
          <Text style={styles.itemName}>{barItem.name}</Text>
        </View>
      ))}
      <Pressable style={styles.item} onPress={() => navigate('Create new bar' as never)}>
        <View style={styles.addIcon}>
          <PlusIcon color={COLORS.text.link} />
        </View>
        <Text style={[styles.itemName, { color: COLORS.text.link }]}>Create new Bar</Text>
      </Pressable>
    </ModalBody>
  )
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignContent: 'center',
    marginBottom: 15,
  },
  addIcon: {
    borderRadius: 50,
    width: 26,
    height: 26,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemName: {
    fontSize: 18,
    color: COLORS.text.body,
    fontFamily: FONTS.hells.sans.medium,
    marginLeft: 10,
    paddingTop: 2,
  },
})

AddToBarHomeScreen.displayName = 'AddToBarHomeScreen'

export default AddToBarHomeScreen
