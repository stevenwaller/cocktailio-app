import { View, StyleSheet } from 'react-native'

import SelectableAccordion from '@/components/SelectableAccordion'
import { BodyText } from '@/components/_elements/Text'
import { FONTS } from '@/lib/constants'
import { useIngredients } from '@/lib/contexts/IngredientsContext'
import { TIngredient } from '@/lib/types/supabase'

const commonIngredientIds: Record<string, string> = {
  'a6b76c7a-c2ca-4f02-b67a-b0ec495b1286': 'Vodka',
  '873af25c-128d-4366-9982-5ba196ec1892': 'Rum',
  'efa8589e-e922-4747-8c63-d1cceb7e4925': 'Gin',
  '5be3db7b-ef13-4539-994a-6fd091eaaac8': 'Tequila',
  '0f4227c3-3ca0-444c-b8c0-96298b157a2d': 'Whiskey',
  '18582582-9d55-4b41-84f0-bd82e2581a66': 'Simple Syrup',
  'd36a91ef-f06e-4ba3-b401-4b6b1615d10a': '2:1 Simple Syrup',
  // FORTIFIED & AROMATIZED WINES
  'e8e9461b-4dc8-498b-8b4f-170f042958ab': 'Dry Vermouth',
  '9f727462-4b7f-4200-8395-7fa5c5e80760': 'Sweet Vermouth',
  // Mixers
  '10699e91-cd64-4054-913f-fdb9ed242da4': 'Lemon Juice',
  'b69e4377-c80b-47f9-ae73-3729a77a5ffe': 'Lime Juice',
  'c770af9e-d8f2-406c-a153-636a84e71d55': 'Orange Juice',
  'eaa07be3-b305-4b8e-9508-0f6fcd60abfd': 'Grapefruit Juice',
  '5f13ede2-65b9-47d7-b178-8046a8993361': 'Pineapple Juice',
  'd7ccb836-6b95-4b7c-86c9-2cdf261d8d9e': 'Ginger Ale',
  'df38895e-e873-49c6-a800-ad56b6e4c46c': 'Tonic Water',
  'b7e8bef5-27ad-4536-ada0-ecb626b0919e': 'Soda Water',
  '6f8fabb2-bf6d-4ecb-bfd9-a817aae80917': 'Club Soda',
  'c3d8e5d2-9dab-4782-8284-5f92327ba7ae': 'Water',
  // Bitters
  'b807f174-4e32-4f67-bc41-8799e54876af': 'Aromatic Bitters',
  '9bce5246-cbc6-4844-9882-6bae17354faa': 'Angostura Bitters',
  '9d024f5c-0641-4858-9d28-3c7e9a2c00c0': 'Orange Bitters',
  '6bc9be28-64d6-4891-bc3e-c4ce9b6e6ce2': 'Peychaud’s Bitters',
  // Syrups
  '77ed6598-6a85-4c2e-9828-b9d6023eb187': 'Grenadine',
  '4bc0742f-cef6-4c46-860c-a2d2dd1ddb29': 'Honey',
  '60f1c5cb-4c0c-4cb4-90bd-053d75ae8402': 'Maple Syrup',
  // Eggs and Dairy
  '63e8913a-a654-412e-b862-c23a795ef171': 'Egg',
  '85b293d8-b729-4110-ba63-18876e50a34a': 'Milk',
  // Fresh produce
  '666e9d76-b255-4bdd-826e-f214a79c9f8d': 'Lemon',
  '45895c1e-43b9-4f79-bd42-3f93a8e60b24': 'Lime',
  '366f8ab5-9d1c-492c-9b14-41fb7f2119a1': 'Orange',
  '83c6150d-490d-425b-b7d0-393d71ab89c8': 'Fresh Mint',
  // Canned and jarred
  '5d0dd876-b946-48d8-a4bf-9f5ac531decf': 'Cocktail Cherry',
  // Sugars spices and seasoning
  '42bb9c0a-e4fe-431a-bf71-918d5174f1d3': 'Brown Sugar',
  '68b73ffa-dd08-4d46-9cf0-e42e83e6a995': 'Cinnamon',
  'f3d9ccf4-b6d4-41a9-9def-b9c1f8640a85': 'Pepper',
  '958d76ae-3623-467d-a68e-8f19fd4f6834': 'Salt',
  '6c7a9872-41e5-4fd8-aacb-f53f2de76a41': 'Coarse Salt',
  '3c5b6bf6-c4f1-4632-8682-47f9ad0eb96c': 'Kosher Salt',
  'bb229cfc-40c6-49ec-9162-2272e8911fe4': 'Sugar',
  '8de8da9f-51ae-43d2-a5b5-7936103e83ff': 'Sugar Cube',
  // Condiments
  'b6f204f6-ea8a-406d-92b1-029a22b07339': 'Hot Sauce',
  '7c482b00-5106-4cd7-9a30-863086747f3b': 'Tabasco Sauce',
  // Ice
  '845E7FD0-97A6-40C4-A1C5-6F159C539E81': 'Ice',
}

interface Props {
  checkIfSelected: (item: TIngredient) => boolean
  onSelect: (item: TIngredient) => void
}

const CommonIngredients = ({ checkIfSelected, onSelect }: Props) => {
  const { ingredientsById, ingredientCategoryIds, error, isFetching } = useIngredients()

  const foundIngredients: { [key: string]: string } = {}

  const findIngredients = (parentIngredientIds: string[]) => {
    parentIngredientIds.forEach((id) => {
      const ingredient = ingredientsById[id]

      if (commonIngredientIds[ingredient.id]) {
        foundIngredients[ingredient.id] = ingredient.name

        if (ingredient.hierarchy) {
          ingredient.hierarchy.forEach((parentIngredient) => {
            foundIngredients[parentIngredient?.id] = parentIngredient?.name
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

  const renderIngredients = (parentIngredientIds: string[] | undefined, depth: number) => {
    if (!parentIngredientIds || parentIngredientIds.length === 0) return null

    return parentIngredientIds.map((ingredientId, index) => {
      const ingredient = ingredientsById[ingredientId]

      if (!foundIngredients[ingredient.id]) return null

      return (
        <SelectableAccordion
          key={ingredient.id}
          label={ingredient.name}
          style={[depth > 1 && { paddingLeft: 34 }, { marginTop: 12 }]}
          isSelected={checkIfSelected(ingredient)}
          isOpen
          onSelect={() => onSelect(ingredient)}
          headerLabelStyle={[
            ingredient.is_brand && { fontFamily: FONTS.hells.sans.mediumItalic },
            depth === 0 && { fontFamily: FONTS.hells.sans.bold },
          ]}
          count={getSelectedCount(ingredient)}
          noSelect={depth === 0}
          noExpand
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

  return (
    <View style={styles.ingredientsContainer}>{renderIngredients(ingredientCategoryIds, 0)}</View>
  )
}

const styles = StyleSheet.create({
  ingredientsContainer: {
    paddingTop: 5,
  },
})

CommonIngredients.displayName = 'CommonIngredients'

export default CommonIngredients
