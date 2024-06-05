import { useNavigation } from '@react-navigation/native'
import { useState } from 'react'
import { StyleSheet, Pressable, Text, Alert, Switch, View } from 'react-native'

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
  onDelete?: () => void
}

const BarHomeScreen = ({ bar, onComplete = () => {}, onDelete = () => {} }: IBarHomeScreen) => {
  const { navigate } = useNavigation()
  const { bars, setBars, setBar } = useBars()
  const [isSubmitting, setIsSubmitting] = useState(false)

  if (!bar) {
    return null
  }

  const handleMakeBarDefault = async () => {
    if (bar.is_default) {
      setBar({ ...bar, is_default: false })

      const response = await supabaseClient
        .from('bars')
        .update({ is_default: !bar.is_default })
        .eq('id', bar?.id)

      if (response.error) {
        setBar({ ...bar, is_default: true })
        Alert.alert(response.error.message)
      }
    } else {
      const newBars = bars.map((existingBar) => {
        if (existingBar.id === bar.id) {
          return { ...existingBar, is_default: true }
        }
        return { ...existingBar, is_default: false }
      })

      setBars(newBars)

      for (const newBar of newBars) {
        const response = await supabaseClient
          .from('bars')
          .update({ is_default: newBar.is_default })
          .eq('id', newBar.id)

        if (response.error) {
          setBars(bars)
          Alert.alert(response.error.message)
        }
      }
    }
  }

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
    onDelete()
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
      <View style={styles.divider} />
      <View>
        <View style={styles.defaultContainer}>
          <Text style={styles.itemName}>Make this the default bar</Text>
          <Switch
            style={styles.icon}
            ios_backgroundColor={COLORS.bg.level1}
            trackColor={{ false: COLORS.bg.level1, true: COLORS.text.good }}
            onValueChange={handleMakeBarDefault}
            thumbColor={COLORS.text.body}
            value={!!bar.is_default}
          />
        </View>
        <Text style={styles.itemDescription}>
          This bar's stock of ingredients will be used to highlight which cocktails you can make
          when browsing recipes
        </Text>
      </View>
    </ModalBody>
  )
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.bg.level1,
    marginBottom: 15,
  },
  icon: {
    marginRight: 10,
  },
  switch: {
    marginLeft: 15,
    height: 30,
  },
  itemName: {
    fontSize: 18,
    color: COLORS.text.body,
    fontFamily: FONTS.hells.sans.medium,
  },
  itemDescription: {
    fontSize: 14,
    color: COLORS.text.body,
    fontFamily: FONTS.hells.sans.medium,
  },
  defaultContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 10,
  },
})

BarHomeScreen.displayName = 'BarHomeScreen'

export default BarHomeScreen
