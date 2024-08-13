import { View } from 'react-native'

import CocktailCard from '@/components/CocktailCard'
import { SubTitleText } from '@/components/_elements/Text'
import Skeleton from '@/components/_loaders/Skeleton'
import { useBars } from '@/lib/contexts/BarsContext'
import { TCocktail } from '@/lib/types/supabase'

interface IProps {
  isLoading: boolean
  cocktail: TCocktail | null
}

export default function FeaturedCocktail({ isLoading, cocktail }: IProps) {
  const { defaultBar } = useBars()

  const renderContent = () => {
    if (isLoading || !cocktail) {
      return <Skeleton height={95} />
    }

    return <CocktailCard cocktail={cocktail} bar={defaultBar} hideBookmark />
  }

  return (
    <View style={{ marginBottom: 30 }}>
      <SubTitleText style={{ marginBottom: 12 }}>Featured Cocktail</SubTitleText>
      {renderContent()}
    </View>
  )
}
