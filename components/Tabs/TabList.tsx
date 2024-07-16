import { ScrollView, ScrollViewProps } from 'react-native'

import { COLORS } from '@/lib/constants'

export interface TabListProps extends ScrollViewProps {}

const TabList = ({ children, style, contentContainerStyle, ...restProps }: TabListProps) => {
  return (
    <ScrollView
      horizontal
      style={[
        {
          width: '100%',
          backgroundColor: COLORS.bg.level1,
        },
        style,
      ]}
      contentContainerStyle={[
        {
          flexDirection: 'row',
          justifyContent: 'flex-start',
          padding: 0,
          borderTopWidth: 2,
          borderTopColor: COLORS.bg.level1,
        },
        contentContainerStyle,
      ]}
      {...restProps}
    >
      {children}
    </ScrollView>
  )
}

TabList.displayName = 'TabList'

export default TabList
