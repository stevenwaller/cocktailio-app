import { Text, StyleSheet, View } from 'react-native'

import { BodyText } from '@/components/_elements/Text'
import AddInput from '@/components/_inputs/AddInput'
import ModalBody from '@/components/_overlays/ModalBody'
import { COLORS, FONTS } from '@/lib/constants'
import { useEras } from '@/lib/contexts/ErasContext'
import { IFilter } from '@/lib/types'
import { TEra } from '@/lib/types/supabase'

interface EraScreenProps {
  filter?: IFilter
  onChange: (filter: IFilter) => void
}

const EraScreen = ({ filter, onChange }: EraScreenProps) => {
  const { isFetching, error, eras } = useEras()

  const handleEraPress = (era: TEra) => {
    if (!filter) return

    const newFilter = { ...filter, value: [...filter.value] }

    if (newFilter.value.some((item) => item.id === era.id)) {
      newFilter.value = newFilter.value.filter((item) => item.id !== era.id)
    } else {
      newFilter.value.push({ id: era.id, name: era.name })
    }

    onChange(newFilter)
  }

  if (isFetching) return <BodyText>Loading...</BodyText>

  if (error) return <BodyText>Error: {error.message}</BodyText>

  if (!eras) return <BodyText>No data</BodyText>

  return (
    <ModalBody>
      {eras.map((era) => (
        <View key={era.id} style={styles.era}>
          <AddInput
            checked={filter?.value.some((item) => item.id === era.id)}
            onPress={() => handleEraPress(era)}
          />
          <Text style={styles.eraText}>{era.name}</Text>
        </View>
      ))}
    </ModalBody>
  )
}

const styles = StyleSheet.create({
  era: {
    flexDirection: 'row',
    alignContent: 'center',
    marginBottom: 15,
  },
  eraText: {
    fontSize: 18,
    color: COLORS.text.body,
    fontFamily: FONTS.hells.sans.medium,
    marginLeft: 10,
    paddingTop: 2,
  },
})

EraScreen.displayName = 'EraScreen'

export default EraScreen
