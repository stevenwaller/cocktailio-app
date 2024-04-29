import { BottomSheetScrollView, BottomSheetView } from '@gorhom/bottom-sheet'
import { Text, StyleSheet, View } from 'react-native'

import { BodyText } from '@/components/_elements/Text'
import AddInput from '@/components/_inputs/AddInput'
import { COLORS, FONTS } from '@/lib/constants'
import useSources from '@/lib/hooks/useSources'
import { IFilter } from '@/lib/types'
import { TSource } from '@/lib/types/supabase'

interface SourceScreenProps {
  filter?: IFilter
  onChange: (filter: IFilter) => void
}

const SourceScreen = ({ filter, onChange }: SourceScreenProps) => {
  const { isFetching, error, sources } = useSources()

  const handleSourcePress = (source: TSource) => {
    if (!filter) return

    const newFilter = { ...filter, value: [...filter.value] }

    if (newFilter.value.some((item) => item.id === source.id)) {
      newFilter.value = newFilter.value.filter((item) => item.id !== source.id)
    } else {
      newFilter.value.push({ id: source.id, name: source.name })
    }

    onChange(newFilter)
  }

  if (isFetching) return <BodyText>Loading...</BodyText>

  if (error) return <BodyText>Error: {error.message}</BodyText>

  if (!sources) return <BodyText>No data</BodyText>

  return (
    <BottomSheetScrollView style={styles.container} enableFooterMarginAdjustment>
      <BottomSheetView style={styles.scrollContent}>
        {sources.map((source) => (
          <View key={source.id} style={styles.source}>
            <AddInput
              checked={filter?.value.some((item) => item.id === source.id)}
              onPress={() => handleSourcePress(source)}
            />
            <Text style={styles.sourceText}>{source.name}</Text>
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
  source: {
    flexDirection: 'row',
    alignContent: 'center',
    marginBottom: 15,
  },
  sourceText: {
    fontSize: 18,
    color: COLORS.text.body,
    fontFamily: FONTS.hells.sans.medium,
    marginLeft: 10,
    paddingTop: 2,
  },
})

SourceScreen.displayName = 'SourceScreen'

export default SourceScreen
