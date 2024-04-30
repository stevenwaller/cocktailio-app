import { useNavigation } from '@react-navigation/native'
import { useState } from 'react'
import { StyleSheet, Pressable, Text, Alert } from 'react-native'

import EditIcon from '@/components/_icons/Edit'
import TrashIcon from '@/components/_icons/Trash'
import ModalBody from '@/components/_overlays/ModalBody'
import { COLORS, FONTS } from '@/lib/constants'
import useBars from '@/lib/hooks/useBars'
import { TBar } from '@/lib/types/supabase'
import supabaseClient from '@/lib/utils/supabaseClient'

interface IBarHomeScreen {
  bar?: TBar | null
  onComplete?: () => void
}

const BarHomeScreen = ({ bar, onComplete = () => {} }: IBarHomeScreen) => {
  const { navigate } = useNavigation()
  const { bars, setBars } = useBars()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleDelete = () => {
    Alert.alert(`Are you sure you want to delete ${bar?.name}?`, '', [
      {
        text: 'No, cancel',
      },
      {
        text: 'Yes, delete it',
        onPress: deleteBar,
      },
    ])
  }

  const deleteBar = async () => {
    setIsSubmitting(true)

    const response = await supabaseClient.from('bars').delete().eq('id', bar?.id).single<TBar>()

    if (response.error) {
      Alert.alert(response.error.message)
      return
    }

    const newBars = bars.filter((existingBar) => existingBar.id !== bar?.id)

    setBars(newBars)
    setIsSubmitting(false)
    onComplete()
  }

  return (
    <ModalBody>
      <Pressable
        style={styles.item}
        onPress={() => {
          navigate('Edit Bar' as never)
        }}
      >
        <EditIcon style={styles.icon} color={COLORS.text.link} />
        <Text style={styles.itemName}>Edit Bar</Text>
      </Pressable>
      <Pressable style={styles.item} onPress={handleDelete}>
        <TrashIcon style={styles.icon} width="20" height="20" color={COLORS.text.link} />
        <Text style={styles.itemName}>{isSubmitting ? 'Deleting...' : 'Delete Bar'}</Text>
      </Pressable>
    </ModalBody>
  )
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  icon: {
    marginRight: 10,
  },
  itemName: {
    fontSize: 18,
    color: COLORS.text.body,
    fontFamily: FONTS.hells.sans.medium,
  },
})

BarHomeScreen.displayName = 'BarHomeScreen'

export default BarHomeScreen
