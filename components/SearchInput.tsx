import { ActivityIndicator, TextInput, View, ViewStyle, StyleSheet } from 'react-native'

import SearchIcon from '@/components/_icons/Search'
import { COLORS, FONTS } from '@/lib/constants'

interface Props {
  value: string
  isFetching?: boolean
  onChange?: (value: string) => void
  autoFocus?: boolean
  placeholder?: string
  inputStyle?: ViewStyle
}

const SearchInput = ({
  value,
  isFetching,
  onChange = () => {},
  autoFocus = false,
  placeholder,
  inputStyle,
}: Props) => {
  return (
    <View>
      <TextInput
        style={[styles.input, inputStyle]}
        value={value}
        onChangeText={onChange}
        placeholder={placeholder}
        placeholderTextColor="#AAAEB0"
        autoFocus={autoFocus}
      />
      {isFetching ? (
        <ActivityIndicator style={styles.spinner} color={COLORS.text.body} />
      ) : (
        <SearchIcon style={styles.searchIcon} color={COLORS.text.body} pointerEvents="box-none" />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: COLORS.bg.level2,
    color: COLORS.text.body,
    height: 48,
    fontFamily: FONTS.hells.sans.medium,
    fontSize: 16,
    paddingStart: 40,
    paddingEnd: 20,
  },
  spinner: {
    position: 'absolute',
    top: 15,
    left: 8,
  },
  searchIcon: {
    position: 'absolute',
    top: 13,
    left: 8,
  },
})

SearchInput.displayName = 'SearchInput'

export default SearchInput
