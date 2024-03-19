import { useLocalSearchParams, Stack } from 'expo-router'

import { BodyText } from '@/components/_elements/Text'

export default function Page() {
  const { slug } = useLocalSearchParams()

  return (
    <>
      <Stack.Screen
        options={{
          title: ''
        }}
      />
      <BodyText>Cocktail: {slug}</BodyText>
    </>
  )
}
