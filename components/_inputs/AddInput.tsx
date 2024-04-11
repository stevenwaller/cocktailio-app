import { StyleSheet, Pressable, View, StyleProp, ViewStyle } from 'react-native'

import CircleCheckFilled from '@/components/_icons/CircleCheckFilled'
import CirclePlus from '@/components/_icons/CirclePlus'
import { COLORS } from '@/lib/constants'

interface AddInputProps {
  style?: StyleProp<ViewStyle>
  value?: string
  checked?: boolean
  onPress?: (value: string | undefined, checked?: boolean) => void
}

const AddInput = ({ style, value, checked, onPress = () => {} }: AddInputProps) => {
  return (
    <View style={[styles.container, style]}>
      <Pressable onPressOut={() => onPress(value, checked)}>
        {checked ? (
          <CircleCheckFilled color={COLORS.text.link} />
        ) : (
          <CirclePlus color={COLORS.text.link} />
        )}
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {},
})

AddInput.displayName = 'AddInput'

export default AddInput
