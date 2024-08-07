import type { NativeStackScreenProps } from '@react-navigation/native-stack'
import { ScrollView } from 'react-native'

import PageContainer from '@/components/PageContainer'
import BaseSpiritList from '@/content/BaseSpiritList'
import EraList from '@/content/EraList'
import FeaturedCocktail from '@/content/FeaturedCocktail'
import GlassList from '@/content/GlassList'
import MethodList from '@/content/MethodList'
import RecentCocktails from '@/content/RecentCocktails'
import { HomeStackParamList } from '@/lib/types'

type Props = NativeStackScreenProps<HomeStackParamList, 'Home'>

export default function HomeScreen({ navigation }: Props) {
  return (
    <ScrollView>
      <PageContainer>
        <FeaturedCocktail />
        <RecentCocktails />
        <BaseSpiritList style={{ marginBottom: 20 }} />
        <MethodList style={{ marginBottom: 20 }} />
        <EraList style={{ marginBottom: 20 }} />
        <GlassList style={{ marginBottom: 20 }} />
      </PageContainer>
    </ScrollView>
  )
}
