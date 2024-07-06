import { Text, StyleSheet, View } from 'react-native'

import { BodyText } from '@/components/_elements/Text'
import AddInput from '@/components/_inputs/AddInput'
import ModalBody from '@/components/_overlays/ModalBody'
import { COLORS, FONTS } from '@/lib/constants'
import { useGlasses } from '@/lib/contexts/GlassesContext'
import { IFilter } from '@/lib/types'
import { TGlass } from '@/lib/types/supabase'

interface GlasswareScreenProps {
  filter?: IFilter
  onChange: (filter: IFilter) => void
}

const GlasswareScreen = ({ filter, onChange }: GlasswareScreenProps) => {
  const { isFetching, error, glasses } = useGlasses()

  const handleGlassPress = (glass: TGlass) => {
    if (!filter) return

    const newFilter = { ...filter, value: [...filter.value] }

    if (newFilter.value.some((item) => item.id === glass.id)) {
      newFilter.value = newFilter.value.filter((item) => item.id !== glass.id)
    } else {
      newFilter.value.push({ id: glass.id, name: glass.name })
    }

    onChange(newFilter)
  }

  if (isFetching) return <BodyText>Loading...</BodyText>

  if (error) return <BodyText>Error: {error.message}</BodyText>

  if (!glasses) return <BodyText>No data</BodyText>

  return (
    <ModalBody>
      {glasses.map((glass) => (
        <View key={glass.id} style={styles.glass}>
          <AddInput
            checked={filter?.value.some((item) => item.id === glass.id)}
            onPress={() => handleGlassPress(glass)}
          />
          <Text style={styles.glassText}>{glass.name}</Text>
        </View>
      ))}
    </ModalBody>
  )
}

const styles = StyleSheet.create({
  glass: {
    flexDirection: 'row',
    alignContent: 'center',
    marginBottom: 15,
  },
  glassText: {
    fontSize: 18,
    color: COLORS.text.body,
    fontFamily: FONTS.hells.sans.medium,
    marginLeft: 10,
    paddingTop: 2,
  },
})

GlasswareScreen.displayName = 'GlasswareScreen'

export default GlasswareScreen
