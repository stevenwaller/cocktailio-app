import { BottomSheetScrollView, BottomSheetView } from '@gorhom/bottom-sheet'
import { Text, StyleSheet, View } from 'react-native'

import { BodyText } from '@/components/_elements/Text'
import AddInput from '@/components/_inputs/AddInput'
import { COLORS, FONTS } from '@/lib/constants'
import useMethods from '@/lib/hooks/useMethods'
import { IFilter } from '@/lib/types'
import { TMethod } from '@/lib/types/supabase'

interface MethodScreenProps {
  filter?: IFilter
  onChange: (filter: IFilter) => void
}

const MethodScreen = ({ filter, onChange }: MethodScreenProps) => {
  const { isFetching, error, methods } = useMethods()

  const handleMethodPress = (method: TMethod) => {
    if (!filter) return

    const newFilter = { ...filter, value: [...filter.value] }

    if (newFilter.value.some((item) => item.id === method.id)) {
      newFilter.value = newFilter.value.filter((item) => item.id !== method.id)
    } else {
      newFilter.value.push({ id: method.id, name: method.name })
    }

    onChange(newFilter)
  }

  if (isFetching) return <BodyText>Loading...</BodyText>

  if (error) return <BodyText>Error: {error.message}</BodyText>

  if (!methods) return <BodyText>No data</BodyText>

  return (
    <BottomSheetScrollView style={styles.container} enableFooterMarginAdjustment>
      <BottomSheetView style={styles.scrollContent}>
        {methods.map((method) => (
          <View key={method.id} style={styles.method}>
            <AddInput
              checked={filter?.value.some((item) => item.id === method.id)}
              onPress={() => handleMethodPress(method)}
            />
            <Text style={styles.methodText}>{method.name}</Text>
          </View>
        ))}
      </BottomSheetView>
    </BottomSheetScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.bg.level3,
  },
  scrollContent: {
    paddingTop: 20,
    paddingRight: 15,
    paddingBottom: 20,
    paddingLeft: 20,
  },
  method: {
    flexDirection: 'row',
    alignContent: 'center',
    marginBottom: 15,
  },
  methodText: {
    fontSize: 18,
    color: COLORS.text.body,
    fontFamily: FONTS.hells.sans.medium,
    marginLeft: 10,
    paddingTop: 2,
  },
})

MethodScreen.displayName = 'MethodScreen'

export default MethodScreen