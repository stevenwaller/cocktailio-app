import { Stack } from 'expo-router'
import { StyleSheet, ScrollView } from 'react-native'

import PageContainer from '@/components/PageContainer'
import { BodyText } from '@/components/_elements/Text'
import Button from '@/components/_inputs/Button'
import BarList from '@/content/BarList'
import { useAuth } from '@/lib/contexts/AuthContextProvider'

export default function BarStockScreen() {
  const { user, openAuthModal } = useAuth()

  return (
    <ScrollView>
      <Stack.Screen
        options={{
          title: 'Bar Stock',
          headerTitleAlign: 'center',
        }}
      />
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

const styles = StyleSheet.create({})
