import { Stack } from 'expo-router'
import { StyleSheet, ScrollView, Text, View } from 'react-native'

import { COLORS, FONTS } from '@/lib/constants'

export default function TabOneScreen() {
  return (
    <ScrollView>
      <Stack.Screen
        options={{
          title: 'Discover',
          headerTitleAlign: 'center',
        }}
      />
      <View style={styles.container}>
        <Text style={styles.title}>Discover</Text>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    color: COLORS.text.body,
    fontFamily: FONTS.hells.serif.medium,
  },
})
