import { useState, useEffect } from 'react'

import SelectableAccordion from '@/components/SelectableAccordion'
import { BodyText } from '@/components/_elements/Text'
import { FONTS } from '@/lib/constants'
import useIngredients from '@/lib/hooks/useIngredients'
import { TIngredient } from '@/lib/types/supabase'

interface Props {
  checkIfSelected: (item: TIngredient) => boolean
  onSelect: (item: TIngredient) => void
  searchValue?: string
}

const IngredientList = ({ checkIfSelected, onSelect, searchValue = '' }: Props) => {
  const [openAccordions, setOpenAccordions] = useState<{ [key: string]: boolean }>({})
  const { ingredients, error, isFetching } = useIngredients()

  const lowerCaseSearchValue = searchValue.toLowerCase()
  const foundIngredients: { [key: string]: string } = {}

  useEffect(() => {
    if (searchValue === '') {
      setOpenAccordions({})
    }
  }, [searchValue])

  const findIngredients = (parentIngredients: TIngredient[]) => {
    parentIngredients.forEach((ingredient) => {
      if (ingredient.name.toLowerCase().includes(lowerCaseSearchValue)) {
        foundIngredients[ingredient.name] = ingredient.id

        if (ingredient.hierarchy) {
          ingredient.hierarchy.forEach((parentIngredient) => {
            foundIngredients[parentIngredient?.name] = parentIngredient?.id
          })
        }
      }

      if (ingredient.ingredients) {
        findIngredients(ingredient.ingredients)
      }
    })
  }

  // don't search the top level categories
  ingredients?.forEach((ingredient) => {
    if (ingredient.ingredients) {
      findIngredients(ingredient.ingredients)
    }
  })

  const getSelectedCount = (ingredient: TIngredient) => {
    let count = 0

    const getSubCount = (subIngredients: TIngredient[]) => {
      subIngredients.forEach((subIngredient) => {
        if (checkIfSelected(subIngredient)) {
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

      const closeChildren = (parentIngredient: TIngredient) => {
        parentIngredient.ingredients?.forEach((child) => {
          delete newOpenAccordions[child.id]
          closeChildren(child)
        })
      }

      closeChildren(ingredient)
    } else {
      newOpenAccordions[ingredient.id] = true
    }

    setOpenAccordions(newOpenAccordions)
  }

  const renderIngredients = (parentIngredients: TIngredient[] | undefined, depth: number) => {
    if (!parentIngredients || parentIngredients.length === 0) return null

    return parentIngredients.map((ingredient, index) => {
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
          {renderIngredients(ingredient.ingredients, depth + 1)}
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

  if (!ingredients) {
    return <BodyText>No data</BodyText>
  }

  if (searchValue !== '' && Object.keys(foundIngredients).length === 0) {
    return <BodyText>No results found</BodyText>
  }

  return renderIngredients(ingredients, 0)
}

IngredientList.displayName = 'IngredientList'

export default IngredientList
