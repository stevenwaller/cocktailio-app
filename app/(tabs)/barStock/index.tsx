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
          title: 'BAR STOCK',
          headerTitleAlign: 'center',
        }}
      />
      <PageContainer>
        {user ? (
          <BarList />
        ) : (
          <>
            <BodyText>Create and account or sign in to manage your bar stock</BodyText>
            <Button label="Sign In / Create Account" onPress={() => openAuthModal()} />
          </>
        )}
      </PageContainer>
    </ScrollView>
  )
}

const styles = StyleSheet.create({})
