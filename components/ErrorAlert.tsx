import { StyleSheet, Text, View } from 'react-native'

interface Props {
  message?: string | null
  className?: string
}

const ErrorAlert = ({ className, message, ...restProps }: Props) => {
  if (!message) return null

  return (
    <View style={styles.error} {...restProps}>
      <Text style={styles.title}>Error</Text>
      <Text style={styles.message}>{message}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  error: {
    marginBottom: 20,
    padding: 10,
    // border: '1px solid red',
    backgroundColor: 'red',
  },
  title: {
    color: 'red',
    fontWeight: 'bold',
    fontSize: 20,
  },
  message: {
    color: 'red',
    fontSize: 15,
    fontWeight: 'bold',
    fontStyle: 'italic',
  },
})

ErrorAlert.displayName = 'ErrorAlert'

export default ErrorAlert
