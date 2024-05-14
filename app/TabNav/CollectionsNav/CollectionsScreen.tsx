import { ScrollView } from 'react-native'

import PageContainer from '@/components/PageContainer'
import { BodyText } from '@/components/_elements/Text'
import Button from '@/components/_inputs/Button'
import CollectionList from '@/content/CollectionList'
import { useAuth } from '@/lib/contexts/AuthContextProvider'
import useUserStore from '@/lib/stores/useUserStore'

export default function CollectionsScreen() {
  const { openAuthModal } = useAuth()
  const { user } = useUserStore()

  return (
    <ScrollView>
      <PageContainer>
        {user ? (
          <CollectionList />
        ) : (
          <>
            <BodyText>Create a free account or sign in to collection cocktails</BodyText>
            <Button label="Create a free account / Sign in" onPress={() => openAuthModal()} />
          </>
        )}
      </PageContainer>
    </ScrollView>
  )
}
