import { Text, StyleSheet, View } from 'react-native'

import { BodyText } from '@/components/_elements/Text'
import RadioInput from '@/components/_inputs/RadioInput'
import ModalBody from '@/components/_overlays/ModalBody'
import { COLORS, FONTS } from '@/lib/constants'
import useBars from '@/lib/hooks/useBars'
import { IFilter } from '@/lib/types'
import { TBar } from '@/lib/types/supabase'

interface WithBarStockScreenProps {
  filter?: IFilter
  onChange: (filterName: IFilter) => void
}

const WithBarStockScreen = ({ filter, onChange }: WithBarStockScreenProps) => {
  const { isFetching, error, bars } = useBars()

  const handleItemPress = (bar: TBar) => {
    if (!filter) return

    const newFilter = { ...filter, value: [...filter.value] }

    if (newFilter.value.some((item) => item.id === bar.id)) {
      newFilter.value = newFilter.value.filter((item) => item.id !== bar.id)
    } else {
      newFilter.value.push({ id: bar.id, name: bar.name ? bar.name : '' })
    }

    onChange(newFilter)
  }

  if (isFetching) return <BodyText>Loading...</BodyText>

  if (error) return <BodyText>Error: {error.message}</BodyText>

  if (!bars) return <BodyText>No data</BodyText>

  return (
    <ModalBody>
      <BodyText style={{ marginBottom: 20 }}>
        {bars.length === 0
          ? 'You have not added a bar yet. Go to the "Bar Stock" tab to do so.'
          : 'Filter cocktails by ingredients you have stocked in your bar'}
      </BodyText>
      {bars.map((bar) => (
        <View key={bar.id} style={styles.item}>
          <RadioInput
            checked={filter?.value.some((item) => item.id === bar.id)}
            onPress={() => handleItemPress(bar)}
          />
          <Text style={styles.itemText}>{bar.name}</Text>
        </View>
      ))}
    </ModalBody>
  )
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignContent: 'center',
    marginBottom: 15,
  },
  itemText: {
    fontSize: 18,
    color: COLORS.text.body,
    fontFamily: FONTS.hells.sans.medium,
    marginLeft: 10,
    paddingTop: 2,
  },
})

WithBarStockScreen.displayName = 'WithBarStockScreen'

export default WithBarStockScreen
