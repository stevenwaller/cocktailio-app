import { useNavigation } from '@react-navigation/native'
import { Stack } from 'expo-router'
import { useContext } from 'react'
import { StyleSheet, ScrollView } from 'react-native'

import PageContainer from '@/components/PageContainer'
import { BodyText } from '@/components/_elements/Text'
import Button from '@/components/_inputs/Button'
import { SessionContext } from '@/lib/contexts/AuthContextProvider'

export default function BarStockScreen() {
  const { user } = useContext(SessionContext)
  const { navigate } = useNavigation()

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
          <BodyText>Welcome, {user.email}</BodyText>
        ) : (
          <Button label="Sign In / Create Account" onPress={() => navigate('authModal' as never)} />
        )}
      </PageContainer>
    </ScrollView>
  )
}

const styles = StyleSheet.create({})
