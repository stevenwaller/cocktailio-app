import { Stack } from 'expo-router'
import { ScrollView } from 'react-native'

import PageContainer from '@/components/PageContainer'
import { BodyText } from '@/components/_elements/Text'
import Button from '@/components/_inputs/Button'
import CollectionList from '@/content/CollectionList'
import { useAuth } from '@/lib/contexts/AuthContextProvider'

export default function CollectionsScreen() {
  const { user, openAuthModal } = useAuth()

  return (
    <ScrollView>
      <Stack.Screen
        options={{
          title: 'Collections',
          headerTitleAlign: 'center',
        }}
      />
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
