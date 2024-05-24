import type { NativeStackScreenProps } from '@react-navigation/native-stack'
import { useState } from 'react'
import { StyleSheet, ScrollView } from 'react-native'

import AccordionCard from '@/components/AccordionCard'
import PageContainer from '@/components/PageContainer'
import SelectableAccordion from '@/components/SelectableAccordion'
import { BodyText } from '@/components/_elements/Text'
import { FONTS } from '@/lib/constants'
import useBars from '@/lib/hooks/useBars'
import useIngredients from '@/lib/hooks/useIngredients'
import { BarStockStackParamList } from '@/lib/types'
import { TIngredient } from '@/lib/types/supabase'
import supabaseClient from '@/lib/utils/supabaseClient'
import uuid from '@/lib/utils/uuid'

type Props = NativeStackScreenProps<BarStockStackParamList, 'Bar Ingredients'>

export default function BarIngredients({ route }: Props) {
  const barId = route.params.barId
  const [openAccordions, setOpenAccordions] = useState<any>({})
  const { bar, setBar } = useBars(barId as string)
  const { ingredients, error, isFetching } = useIngredients()

  if (!bar) return null

  const getSelectedCount = (ingredient: TIngredient) => {
    let count = 0

    const getSubCount = (subIngredients: TIngredient[]) => {
      subIngredients.forEach((subIngredient) => {
        if (bar.ingredientsById[subIngredient.id]) {
          count++
        }
        if (subIngredient.ingredients) {
          getSubCount(subIngredient.ingredients)
        }
      })
    }

    if (ingredient.ingredients) {
      getSubCount(ingredient.ingredients)
    }

    return count
  }

  const handleToggle = (ingredient: TIngredient) => {
    const newOpenAccordions = { ...openAccordions }

    if (openAccordions[ingredient.id]) {
      delete newOpenAccordions[ingredient.id]

      const closeChildren = (ingredient: TIngredient) => {
        ingredient.ingredients?.forEach((child) => {
          delete newOpenAccordions[child.id]
          closeChildren(child)
        })
      }

      closeChildren(ingredient)
    } else {
      newOpenAccordions[ingredient.id] = {}
    }

    setOpenAccordions(newOpenAccordions)
  }

  const handleSelect = async (ingredient: TIngredient) => {
    const alreadySelected = !!bar.ingredientsById[ingredient.id]

    const newBar = {
      ...bar,
      ingredientsById: { ...bar.ingredientsById },
      bar_ingredients: [...bar.bar_ingredients],
    }

    const newBarVariables = {
      id: uuid(),
      created_at: new Date().toISOString(),
      bar_id: bar.id,
      ingredient_id: ingredient.id,
    }

    if (alreadySelected) {
      delete newBar.ingredientsById[ingredient.id]
      newBar.bar_ingredients = newBar.bar_ingredients.filter(
        (bar_ingredient) => bar_ingredient.ingredient_id !== ingredient.id,
      )
    } else {
      newBar.ingredientsById[ingredient.id] = ingredient
      newBar.bar_ingredients.push({ ...newBarVariables, ingredient })
    }

    setBar(newBar)

    if (alreadySelected) {
      await supabaseClient.from('bar_ingredients').delete().eq('ingredient_id', ingredient.id)
    } else {
      await supabaseClient.from('bar_ingredients').insert(newBarVariables).select().single()
    }
  }

  const renderIngredients = (ingredients: TIngredient[] | undefined, depth: number) => {
    if (!ingredients || ingredients.length === 0) return

    return ingredients.map((ingredient, index) => {
      return (
        <SelectableAccordion
          key={ingredient.id}
          label={ingredient.name}
          style={[styles.accordion, depth > 0 && { paddingLeft: 34 }]}
          isSelected={!!bar.ingredientsById[ingredient.id]}
          isOpen={openAccordions[ingredient.id]}
          onToggle={() => handleToggle(ingredient)}
          onSelect={() => handleSelect(ingredient)}
          headerLabelStyle={
            ingredient.is_brand ? { fontFamily: FONTS.hells.sans.boldItalic } : null
          }
          count={getSelectedCount(ingredient)}
        >
          {renderIngredients(ingredient.ingredients, depth + 1)}
        </SelectableAccordion>
      )
    })
  }

  const renderCategories = () => {
    return ingredients?.map((ingredient) => (
      <AccordionCard
        style={{ marginBottom: 20 }}
        key={ingredient.id}
        title={ingredient.name}
        isOpen={openAccordions[ingredient.id]}
        onToggle={() => handleToggle(ingredient)}
        count={getSelectedCount(ingredient)}
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
      <PageContainer>{renderContent()}</PageContainer>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  accordion: {
    marginBottom: 12,
  },
})
