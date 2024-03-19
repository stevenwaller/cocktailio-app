import { StyleSheet, ScrollView } from 'react-native'

import { Text, View } from '@/components/Themed'

export default function TabOneScreen() {
  return (
    <ScrollView>
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
    justifyContent: 'center'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold'
  }
})
