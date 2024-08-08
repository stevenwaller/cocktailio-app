import type { NativeStackScreenProps } from '@react-navigation/native-stack'

import PageContainer from '@/components/PageContainer'
import BaseSpiritList from '@/content/BaseSpiritList'
import MethodList from '@/content/MethodList'
import { HomeStackParamList } from '@/lib/types'

type Props = NativeStackScreenProps<HomeStackParamList, 'Home'>

export default function HomeScreen({ navigation }: Props) {
  return (
    <PageContainer>
      <BaseSpiritList style={{ marginBottom: 20 }} />
      <MethodList />
    </PageContainer>
  )
}
