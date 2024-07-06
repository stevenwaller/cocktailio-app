import { ScrollView } from 'react-native'

import PageContainer from '@/components/PageContainer'
import { BodyText } from '@/components/_elements/Text'
import Button from '@/components/_inputs/Button'
import CollectionList from '@/content/CollectionList'
import { useAuthModal } from '@/lib/contexts/AuthModalContext'
import { useUser } from '@/lib/contexts/UserContext'

export default function CollectionsScreen() {
  const { openAuthModal } = useAuthModal()
  const { user } = useUser()

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
