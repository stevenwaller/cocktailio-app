import { useState, useEffect } from 'react'

import SelectableAccordion from '@/components/SelectableAccordion'
import { BodyText } from '@/components/_elements/Text'
import { FONTS } from '@/lib/constants'
import { useIngredients } from '@/lib/contexts/IngredientsContext'
import { TIngredient } from '@/lib/types/supabase'

interface Props {
  checkIfSelected: (item: TIngredient) => boolean
  onSelect: (item: TIngredient) => void
  searchValue?: string
}

const IngredientList = ({ checkIfSelected, onSelect, searchValue = '' }: Props) => {
  const [openAccordions, setOpenAccordions] = useState<{ [key: string]: boolean }>({})
  const { ingredientsById, ingredientCategoryIds, error, isFetching } = useIngredients()

  const lowerCaseSearchValue = searchValue.toLowerCase()
  const foundIngredients: { [key: string]: string } = {}

  useEffect(() => {
    if (searchValue === '') {
      setOpenAccordions({})
    }
  }, [searchValue])

  const findIngredients = (parentIngredientIds: string[]) => {
    parentIngredientIds.forEach((id) => {
      const ingredient = ingredientsById[id]

      if (ingredient.name.toLowerCase().includes(lowerCaseSearchValue)) {
        foundIngredients[ingredient.name] = ingredient.id

        if (ingredient.hierarchy) {
          ingredient.hierarchy.forEach((parentIngredient) => {
            foundIngredients[parentIngredient?.name] = parentIngredient?.id
          })
        }
      }

      if (ingredient.childIngredientIds) {
        findIngredients(ingredient.childIngredientIds)
      }
    })
  }

  // don't search the top level categories
  ingredientCategoryIds?.forEach((id) => {
    const ingredient = ingredientsById[id]

    if (ingredient.childIngredientIds) {
      findIngredients(ingredient.childIngredientIds)
    }
  })

  const getSelectedCount = (ingredient: TIngredient) => {
    let count = 0

    const getChildCount = (childIngredientIds: string[]) => {
      childIngredientIds.forEach((childId) => {
        const child = ingredientsById[childId]

        if (checkIfSelected(child)) {
          count++
        }
        if (child.childIngredientIds) {
          getChildCount(child.childIngredientIds)
        }
      })
    }

    if (ingredient.childIngredientIds) {
      getChildCount(ingredient.childIngredientIds)
    }

    return count
  }

  const handleToggle = (ingredient: TIngredient) => {
    const newOpenAccordions = { ...openAccordions }

    if (openAccordions[ingredient.id]) {
      delete newOpenAccordions[ingredient.id]

      const closeChildren = (parentIngredient: TIngredient) => {
        parentIngredient.childIngredientIds?.forEach((childId) => {
          delete newOpenAccordions[childId]
          closeChildren(ingredientsById[childId])
        })
      }

      closeChildren(ingredient)
    } else {
      newOpenAccordions[ingredient.id] = true
    }

    setOpenAccordions(newOpenAccordions)
  }

  const renderIngredients = (parentIngredientIds: string[] | undefined, depth: number) => {
    if (!parentIngredientIds || parentIngredientIds.length === 0) return null

    return parentIngredientIds.map((ingredientId, index) => {
      const ingredient = ingredientsById[ingredientId]

      if (searchValue && !foundIngredients[ingredient.name]) return null

      return (
        <SelectableAccordion
          key={ingredient.id}
          label={ingredient.name}
          style={[depth > 1 && { paddingLeft: 34 }, { marginTop: 12 }]}
          isSelected={checkIfSelected(ingredient)}
          isOpen={openAccordions[ingredient.id] || searchValue !== ''}
          onToggle={() => handleToggle(ingredient)}
          onSelect={() => onSelect(ingredient)}
          headerLabelStyle={[
            ingredient.is_brand && { fontFamily: FONTS.hells.sans.mediumItalic },
            depth === 0 && { fontFamily: FONTS.hells.sans.bold },
          ]}
          count={getSelectedCount(ingredient)}
          noSelect={depth === 0}
          noExpand={searchValue !== ''}
        >
          {renderIngredients(ingredient.childIngredientIds, depth + 1)}
        </SelectableAccordion>
      )
    })
  }

  if (isFetching) {
    return <BodyText>Loading...</BodyText>
  }

  if (error) {
    return <BodyText>Error: {error.message}</BodyText>
  }

  if (!ingredientCategoryIds) {
    return <BodyText>No data</BodyText>
  }

  if (searchValue !== '' && Object.keys(foundIngredients).length === 0) {
    return <BodyText>No results found</BodyText>
  }

  return renderIngredients(ingredientCategoryIds, 0)
}

IngredientList.displayName = 'IngredientList'

export default IngredientList
