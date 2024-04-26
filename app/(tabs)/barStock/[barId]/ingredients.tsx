import { useLocalSearchParams, Stack } from 'expo-router'
import { useState } from 'react'
import { StyleSheet, ScrollView } from 'react-native'

import AccordionCard from '@/components/AccordionCard'
import PageContainer from '@/components/PageContainer'
import SelectableAccordion from '@/components/SelectableAccordion'
import { BodyText } from '@/components/_elements/Text'
import { FONTS, COLORS, SIZE } from '@/lib/constants'
import useSupabase from '@/lib/hooks/useSupabase'
import useBarStore from '@/lib/stores/useBarStore'
import { TIngredient } from '@/lib/types/supabase'

export default function Ingredients() {
  const [openAccordions, setOpenAccordions] = useState<string[]>(['All Ingredients'])
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
    orders: [
      {
        column: 'order',
      },
      {
        column: 'name',
        args: { referencedTable: 'ingredients' },
      },
    ],
  })

  const handleToggle = (title: string) => {
    if (openAccordions.includes(title)) {
      setOpenAccordions(openAccordions.filter((accordion) => accordion !== title))
    } else {
      setOpenAccordions([...openAccordions, title])
    }
  }

  const renderIngredients = (ingredients: TIngredient[] | undefined, level: number) => {
    if (!ingredients || ingredients.length === 0) return

    return ingredients.map((ingredient) => (
      <SelectableAccordion
        key={ingredient.id}
        label={ingredient.name}
        level={level}
        isSelectable={!ingredient.is_category}
        isOpen
        headerLabelStyle={ingredient.is_brand ? { fontFamily: FONTS.hells.sans.boldItalic } : null}
      >
        {renderIngredients(ingredient.ingredients, level + 1)}
      </SelectableAccordion>
    ))
  }

  const renderCategories = () => {
    return ingredients?.map((ingredient) => (
      <AccordionCard
        key={ingredient.id}
        title={ingredient.name}
        isOpen={openAccordions.includes(ingredient.id)}
        onToggle={() => handleToggle(ingredient.id)}
      >
        {renderIngredients(ingredient.ingredients, 0)}
      </AccordionCard>
    ))
  }

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

    return renderCategories()
  }

  return (
    <ScrollView>
      <Stack.Screen
        options={{
          title: `${name} Ingredients`,
        }}
      />
      <PageContainer>{renderContent()}</PageContainer>
    </ScrollView>
  )
}

const styles = StyleSheet.create({})
