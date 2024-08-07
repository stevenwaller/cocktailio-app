import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import { ActivityIndicator, TextInput, View, ViewStyle, StyleSheet, Pressable } from 'react-native'

import SearchIcon from '@/components/_icons/Search'
import { COLORS, FONTS, SEARCH_HEIGHT } from '@/lib/constants'

interface Props {
  value: string
  isFetching?: boolean
  onChange?: (value: string) => void
  onClear?: () => void
  autoFocus?: boolean
  placeholder?: string
  style?: ViewStyle
  inputStyle?: ViewStyle
  noIcon?: boolean
}

const SearchInput = ({
  style,
  value,
  isFetching,
  onChange = () => {},
  onClear = () => {},
  autoFocus = false,
  placeholder,
  inputStyle,
  noIcon,
}: Props) => {
  return (
    <View style={style}>
      <TextInput
        style={[styles.input, noIcon && { paddingStart: 15 }, inputStyle]}
        value={value}
        onChangeText={onChange}
        placeholder={placeholder}
        placeholderTextColor="#AAAEB0"
        autoFocus={autoFocus}
      />
      {isFetching ? (
        <ActivityIndicator style={styles.spinner} color={COLORS.text.body} />
      ) : (
        !noIcon && (
          <SearchIcon style={styles.searchIcon} color={COLORS.text.body} pointerEvents="box-none" />
        )
      )}
      {value && (
        <Pressable style={styles.clearBtn} onPress={onClear}>
          <MaterialCommunityIcons name="close" size={20} color={COLORS.text.link} />
        </Pressable>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: COLORS.bg.level1,
    color: COLORS.text.body,
    height: SEARCH_HEIGHT,
    fontFamily: FONTS.hells.sans.medium,
    fontSize: 16,
    paddingStart: 40,
    paddingEnd: 40,
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
  clearBtn: {
    position: 'absolute',
    top: 14,
    right: 10,
  },
})

SearchInput.displayName = 'SearchInput'

export default SearchInput
