import { useLocalSearchParams, Stack } from 'expo-router'
import { StyleSheet, View, ScrollView } from 'react-native'

import PageContainer from '@/components/PageContainer'
import { BodyText, PageTitleText } from '@/components/_elements/Text'
import { FONTS, COLORS, SIZE } from '@/lib/constants'
import useSupabase from '@/lib/hooks/useSupabase'
import useBarStore from '@/lib/stores/useBarStore'
import { TIngredient } from '@/lib/types/supabase'

export default function Ingredients() {
  const { barId, name } = useLocalSearchParams()
  const bar = useBarStore((state) => state.barsById[barId as string])

  const {
    data: ingredients,
    error,
    isFetching,
  } = useSupabase<TIngredient>({
    tableName: 'ingredients',
    select: `
      *,
      ingredients (
        *,
        ingredients (
          *,
          ingredients (
            *
          )
        )
      )
    `,
    filters: [
      {
        operator: 'is',
        key: 'hierarchy',
        value: null,
      },
    ],
  })

  const renderContent = () => {
    if (isFetching) {
      return <BodyText>Loading...</BodyText>
    }

    if (error) {
      return <BodyText>Error: {error.message}</BodyText>
    }

    if (!ingredients) {
      return <BodyText>No data</BodyText>
    }

    return (
      <>
        <BodyText>{barId}</BodyText>
        <BodyText>{name}</BodyText>
        <BodyText>{bar.name}</BodyText>
        <BodyText>{bar.ingredients.length}</BodyText>
        {ingredients.map((ingredient) => (
          <BodyText key={ingredient.id}>{ingredient.name}</BodyText>
        ))}
      </>
    )
  }

  return (
    <ScrollView>
      <Stack.Screen
        options={{
          title: 'Ingredients',
        }}
      />
      <PageContainer>
        <View style={styles.header}>
          <PageTitleText>{name}</PageTitleText>
        </View>
        {renderContent()}
      </PageContainer>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  header: {},
  description: {
    marginTop: 10,
  },
  descriptionText: {
    fontFamily: FONTS.hells.sans.medium,
    fontSize: 16,
    color: COLORS.text.body,
  },
  recipeCard: {
    marginTop: SIZE.app.paddingY,
  },
})
