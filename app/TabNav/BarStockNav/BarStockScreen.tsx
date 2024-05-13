import { ScrollView } from 'react-native'

import PageContainer from '@/components/PageContainer'
import { BodyText } from '@/components/_elements/Text'
import Button from '@/components/_inputs/Button'
import BarList from '@/content/BarList'
import { useAuth } from '@/lib/contexts/AuthContextProvider'
import useUserStore from '@/lib/stores/useUserStore'

export default function BarStockScreen() {
  const { openAuthModal } = useAuth()
  const { user } = useUserStore()

  return (
    <ScrollView>
      <PageContainer>
        {user ? (
          <BarList />
        ) : (
          <>
            <BodyText>Create a free account or sign in to manage your bar stock</BodyText>
            <Button label="Create a free account / Sign in" onPress={() => openAuthModal()} />
          </>
        )}
      </PageContainer>
    </ScrollView>
  )
}
