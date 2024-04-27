import { StyleSheet, Pressable, View, ViewProps } from 'react-native'

import RadioSelected from '@/components/_icons/RadioSelected'
import RadioUnselected from '@/components/_icons/RadioUnselected'
import { COLORS } from '@/lib/constants'

interface RadioInputProps extends ViewProps {
  value?: string
  checked?: boolean
  onPress?: (value: string | undefined, checked?: boolean) => void
}

const RadioInput = ({ style, value, checked, onPress = () => {} }: RadioInputProps) => {
  return (
    <View style={[styles.container, style]}>
      <Pressable onPressOut={() => onPress(value, checked)}>
        {checked ? (
          <RadioSelected color={COLORS.text.link} />
        ) : (
          <RadioUnselected color={COLORS.text.link} />
        )}
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {},
})

RadioInput.displayName = 'RadioInput'

export default RadioInput
