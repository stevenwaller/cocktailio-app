import { useState } from 'react'
import { ScrollView, KeyboardAvoidingView } from 'react-native'

import PageContainer from '@/components/PageContainer'
import SearchInput from '@/components/SearchInput'
import SelectableAccordion from '@/components/SelectableAccordion'
import { BodyText } from '@/components/_elements/Text'
import { FONTS } from '@/lib/constants'
import useIngredients from '@/lib/hooks/useIngredients'
import { TIngredient } from '@/lib/types/supabase'

interface Props {
  checkIfSelected: (item: TIngredient) => boolean
  onSelect: (item: TIngredient) => void
}

const BarIngredients = ({ checkIfSelected, onSelect }: Props) => {
  const [searchValue, setSearchValue] = useState('')
  const [openAccordions, setOpenAccordions] = useState<{ [key: string]: boolean }>({})
  const [foundIngredients, setFoundIngredients] = useState<{ [key: string]: boolean }>({})
  const { ingredients, error, isFetching } = useIngredients()

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

  const handleSearchChange = (value: string) => {
    const lowerCaseSearchValue = value.toLowerCase()
    const newFoundIngredients: { [key: string]: boolean } = {}

    if (value === '') {
      setFoundIngredients(newFoundIngredients)
      setSearchValue(value)
      setOpenAccordions({})
      return
    }

    const findIngredients = (parentIngredients: TIngredient[]) => {
      parentIngredients.forEach((ingredient) => {
        if (ingredient.name.toLowerCase().includes(lowerCaseSearchValue)) {
          newFoundIngredients[ingredient.name] = true

          if (ingredient.hierarchy) {
            ingredient.hierarchy.forEach((parentIngredient) => {
              newFoundIngredients[parentIngredient] = true
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

    setSearchValue(value)
    setFoundIngredients(newFoundIngredients)
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

    if (searchValue !== '' && Object.keys(foundIngredients).length === 0) {
      return <BodyText>No results found</BodyText>
    }

    return renderIngredients(ingredients, 0)
  }

  return (
    <>
      <SearchInput
        value={searchValue}
        onChange={handleSearchChange}
        placeholder="Search by ingredient name"
      />
      <KeyboardAvoidingView
        behavior="padding"
        style={{ flex: 1 }}
        enabled
        keyboardVerticalOffset={100}
      >
        <ScrollView>
          <PageContainer style={{ paddingTop: 5 }}>{renderContent()}</PageContainer>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  )
}

BarIngredients.displayName = 'BarIngredients'

export default BarIngredients