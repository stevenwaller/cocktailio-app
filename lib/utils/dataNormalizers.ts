import { TCollection, TCocktailIdsById } from '@/lib/types/supabase'

export const collectionNormalizer = (collection: TCollection): TCollection => {
  const newCollection = { ...collection }
  const cocktailsIdsById: TCocktailIdsById = {}
  const cocktailIds: string[] = []

  newCollection.collection_cocktails.forEach((collectionCocktail) => {
    if (collectionCocktail.cocktail_id) {
      cocktailsIdsById[collectionCocktail.cocktail_id] = collectionCocktail.id
      cocktailIds.push(collectionCocktail.cocktail_id)
    }
  })

  newCollection.cocktail_ids_by_id = cocktailsIdsById
  newCollection.cocktail_ids = cocktailIds

  return newCollection
}
